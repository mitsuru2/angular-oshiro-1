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

export class FsCollectionWrapper<T1, T2> {
  private name: FsCollectionName
  private status: FsCollectionStatus
  private timestamp: Date
  private observable: Observable<T1[]>
  private documents: T2[]

  constructor (name: FsCollectionName) {
    Logger.trace()
    this.name = name
    this.status = FsCollectionStatus.Initialized
    this.timestamp = new Date()
    this.observable = new Observable<T1[]>()
    this.documents = []
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
    this.observable.subscribe((afsDocs) => {
      for (const afsDoc of afsDocs) {
        this.documents.push(this.convDocAfsToFs(afsDoc))
      }
      this.updateStatus(FsCollectionStatus.Loaded)
    })
  }

  /**
   * It converts input ***DocAfs data into ***DocFs type.
   * It extracts ***Base data by removind the key 'id' and make new data object.
   * @pacram afsDoc The input data object of Angular Firestore document format.
   * @returns The converted data object. The user shall cast it as Firesotre document format.
   */
  private convDocAfsToFs (afsDoc: T1): any {
    Logger.trace()

    // Get keys and values.
    const keys = Object.keys(afsDoc)
    const values = Object.values(afsDoc)

    // Check if 'id' is included.
    if (!keys.includes('id')) {
      Logger.error('Essential key is not found.')
      return undefined
    }

    // Find 'id' and remove it.
    const idIndex = keys.indexOf('id')
    const idValue = Object.values(afsDoc)[idIndex]
    keys.splice(idIndex, 1)
    values.splice(idIndex, 1)

    // Make base data object.
    const baseObj: { [key: string]: any } = {}
    for (let i = 0; i < keys.length; i++) {
      baseObj[keys[i]] = values[i]
    }

    // Make destination data object.
    const dstObj: { [id: string]: typeof baseObj } = {
      [idValue]: baseObj
    }

    return dstObj
  }
}
