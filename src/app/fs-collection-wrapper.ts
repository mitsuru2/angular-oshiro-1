/**
 * Import modules.
 */
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { Logger } from './logger'
import { FsCollectionName } from './oshiro-data-type'

/**
 * Constants.
 */
/** Firestore collection status. */
export const FsCollectionStatus = {
  Undefined: 'Undefined',
  Initialized: 'Initialized',
  Registered: 'Registered',
  Loaded: 'Loaded'
} as const
export type FsCollectionStatus = typeof FsCollectionStatus[ keyof typeof FsCollectionStatus]

/**
 * class: FsCollectionWrapper<T>(name: FsCollectionName)
 *
 * This classs manage a Firestore collection.
 * It manages loading status, timestamp, data itself, and IDs of each documents in the collection.
 *
 * It's a generic class. The user shall specify data type of the target Firestore collection
 * which comply with AngularFirestore.collection(). (e.g. FsAbilityAfs)
 *
 * @param name    The name of Firestore collection. It should be specify at constructor.
 */
export class FsCollectionWrapper<T> {
  private name: FsCollectionName
  private status: FsCollectionStatus
  private timestamp: Date
  private observable: Observable<T[]>
  private documents: {[id:string]: any}
  private keys: string[]
  private cbFns: (()=>void)[]

  constructor (name: FsCollectionName) {
    Logger.trace(name)
    this.name = name
    this.status = FsCollectionStatus.Initialized
    this.timestamp = new Date()
    this.observable = new Observable<T[]>()
    this.documents = {}
    this.keys = []
    this.cbFns = []
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

  /**
   * It start loading data from server.
   * In default cases, it loads data if the data is not loaded.
   * Set 'isReload' flag true, if you force loading data.
   * @param afs       Angular Firestore module instance.
   * @param isReload  Set true, if you want reload data.
   */
  loadData (afs: AngularFirestore, isReload: boolean = false):void {
    if (!isReload && this.status === FsCollectionStatus.Loaded) {
      return
    }
    this.getObservable(afs)
    this.startSubscribe()
  }

  registerCallback (cbFn:()=>void) {
    this.cbFns.push(cbFn)
  }

  /**
   * It updates '.status' property with input status value.
   * And it also store timestamp and outputs log record.
   * @param status    The target status.
   */
  private updateStatus (status: FsCollectionStatus):void {
    this.status = status
    this.timestamp = new Date()
    Logger.info(`Update FsCollectionStatus: ${this.name}, ${this.status}`)
  }

  /**
   * It gets AngularFirestore collection object from 'afs'.
   * At the end, an observable is stored to '.observable' member.
   * Document ID is assigned to the 'id' field.
   * @param afs Instance of AngularFirestore module.
   */
  private getObservable (afs: AngularFirestore): void {
    const tmp = afs.collection<T>(this.name)
    this.observable = tmp.valueChanges({ idField: 'id' })
    this.updateStatus(FsCollectionStatus.Registered)
  }

  /**
   * It start subscribing '.ovservable'.
   * When the data is subscribed, it updates '.documents', '.keys', and '.status'.
   */
  private startSubscribe (): void {
    this.observable.subscribe((afsData) => {
      this.updateFsDocumentFromAfsData(afsData)
      this.updateKeys(Object.keys(this.documents))
      for (const cbFn of this.cbFns) {
        cbFn()
      }
      this.updateStatus(FsCollectionStatus.Loaded)
    })
  }

  /**
   * It updates '.keys' member.
   * To keep the reference, it pushs each keys to the existing '.keys' after removing all elements.
   * @param keys Target key array.
   */
  private updateKeys (keys: string[]): void {
    Logger.trace()
    const length = this.keys.length
    for (let i = 0; i < length; i++) {
      this.keys.pop()
    }
    for (let i = 0; i < keys.length; i++) {
      this.keys.push(keys[i])
    }
  }

  /**
   * It updates '.documents' member by subscribed data.
   * To keep the reference, it doesn't use 'new' operator.
   * @param afsData Array of ***Afs type data.
   */
  private updateFsDocumentFromAfsData (afsData: T[]): void {
    for (let i = 0; i < afsData.length; i++) {
      const { id, base } = this.extractIdAndBaseDataFromAfsData(afsData[i])
      if (id !== 'dummy') {
        this.documents[id] = base
      }
    }
  }

  /**
   * It extracts ID and ***Base data from ***Afs data.
   * @param afsData The input data object of Angular Firestore document format.
   * @returns ID and base data object.
   */
  private extractIdAndBaseDataFromAfsData (afsData: T): {id:string, base: any} {
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
