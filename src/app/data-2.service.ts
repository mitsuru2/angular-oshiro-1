/**
 * Import modules.
 */
/** Core modules. */
import { Injectable } from '@angular/core'

/** Local modules. */
import { FsAbilityAfs, FsAbilityDoc, FsAbilityTypeAfs, FsAbilityTypeDoc, FsCollectionName } from './oshiro-data-type'
import { Logger } from './logger'
import { FsCollectionWrapper, FsCollectionStatus } from './fs-collection-wrapper'
import { AngularFirestore } from '@angular/fire/compat/firestore'

type FsCollection = FsCollectionWrapper<FsAbilityAfs> | FsCollectionWrapper<FsAbilityTypeAfs>

/**
 * Service class: Data2Service
 */
@Injectable({
  providedIn: 'root'
})
export class Data2Service {
  private dummyCollection = new FsCollectionWrapper<FsAbilityAfs>('Abilities')
  private abilities = new FsCollectionWrapper<FsAbilityAfs>('Abilities')
  private abilityTypes = new FsCollectionWrapper<FsAbilityTypeAfs>('AbilityTypes')

  constructor (private afs: AngularFirestore) {
    Logger.trace()
  }

  loadData (name: FsCollectionName) {
    if (name === FsCollectionName.Abilities) {
      this.abilities.loadData(this.afs)
    } else if (name === FsCollectionName.AbilityTypes) {
      this.abilityTypes.loadData(this.afs)
    }
  }

  getStatus (name: FsCollectionName): FsCollectionStatus {
    if (name === FsCollectionName.Abilities) {
      return this.abilities.getStatus()
    } else if (name === FsCollectionName.AbilityTypes) {
      return this.abilityTypes.getStatus()
    } else {
      return FsCollectionStatus.Undefined
    }
  }

  getCollection (name:FsCollectionName):FsCollection {
    if (name === FsCollectionName.Abilities) {
      return this.abilities
    } else if (name === FsCollectionName.AbilityTypes) {
      return this.abilityTypes
    } else {
      Logger.error(`Unsupported Firesotre collection name: ${name}`)
      return this.dummyCollection
    }
  }
}
