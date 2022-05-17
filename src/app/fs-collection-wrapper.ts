import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { Logger } from './logger'
import { FsCollectionName } from './oshiro-data-type'

export const FsCollectionStatus = {
  Undefined: 'Undefined',
  Initialized: 'Initialized',
  Registered: 'Registered',
  Loaded: 'Loaded'
} as const
export type FsCollectionStatus = typeof FsCollectionStatus[ keyof typeof FsCollectionStatus]

export class FsCollectionWrapper<T1> {
  private name: FsCollectionName
  private status: FsCollectionStatus
  private timestamp: Date
  private observable: Observable<T1[]>
  private documents: {[id:string]: any}
  private keys: string[]

  constructor (name: FsCollectionName) {
    Logger.trace(name)
    this.name = name
    this.status = FsCollectionStatus.Initialized
    this.timestamp = new Date()
    this.observable = new Observable<T1[]>()
    this.documents = {}
    this.keys = []
  }

  loadData (afs:AngularFirestore):void {
    this.getObservable(afs)
    this.startSubscribe()
  }

  getStatus (): FsCollectionStatus {
    return this.status
  }

  getTimestamp (): Date {
    return this.timestamp
  }

  getDocument (): {[id:string]: any} {
    return this.documents
  }

  getKeys (): string[] {
    return this.keys
  }

  private updateStatus (status: FsCollectionStatus):void {
    this.status = status
    this.timestamp = new Date()
    Logger.info(`Update FsCollectionStatus: ${this.name}, ${this.status}`)
  }

  private getObservable (afs: AngularFirestore):void {
    const tmp = afs.collection<T1>(this.name)
    this.observable = tmp.valueChanges({ idField: 'id' })
    this.updateStatus(FsCollectionStatus.Registered)
  }

  private startSubscribe (): void {
    this.observable.subscribe((afsData) => {
      this.updateFsDocumentFromAfsData(afsData)
      this.updateKeys(Object.keys(this.documents))
      this.updateStatus(FsCollectionStatus.Loaded)
    })
  }

  private updateKeys (keys: string[]) {
    const length = this.keys.length
    for (let i = 0; i < length; i++) {
      this.keys.pop()
    }
    for (let i = 0; i < keys.length; i++) {
      this.keys.push(keys[i])
    }
  }

  /**
   * It converts input ***DocAfs data into ***DocFs type.
   * It extracts ***Base data by removind the key 'id' and make new data object.
   * @pacram afsDoc The input data object of Angular Firestore document format.
   * @returns The converted data object. The user shall cast it as Firesotre document format.
   */
  private updateFsDocumentFromAfsData (afsData: T1[]) {
    for (let i = 0; i < afsData.length; i++) {
      const { id, base } = this.extractIdAndBaseDataFromAfsData(afsData[i])
      if (id !== 'dummy') {
        this.documents[id] = base
      }
    }
  }

  private extractIdAndBaseDataFromAfsData (afsData: T1): {id:string, base: any} {
    Logger.trace()

    // Get keys and values.
    const keys = Object.keys(afsData)
    const values = Object.values(afsData)

    // Check if 'id' is included.
    if (!keys.includes('id')) {
      Logger.error('Essential key is not found.')
      return { id: 'dummy', base: undefined }
    }

    // Find 'id' and remove it.
    const idIndex = keys.indexOf('id')
    const idValue = Object.values(afsData)[idIndex] as string
    keys.splice(idIndex, 1)
    values.splice(idIndex, 1)

    // Make base data object.
    const baseObj: { [key: string]: any } = {}
    for (let i = 0; i < keys.length; i++) {
      baseObj[keys[i]] = values[i]
    }

    return { id: idValue, base: baseObj }
  }
}
