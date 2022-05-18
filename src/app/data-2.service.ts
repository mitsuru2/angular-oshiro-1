/**
 * Import modules.
 */
/** Core modules. */
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'

/** Local modules. */
import { FsAbilityAfs, FsAbilityTypeAfs, FsCharacterParamTypeAfs, FsCharacterTagAfs, FsCharacterTypeAfs, FsCollectionName } from './oshiro-data-type'
import { FsCollectionWrapper } from './fs-collection-wrapper'
import { Logger } from './logger'

export type FsCollection =
  | FsCollectionWrapper<FsAbilityAfs>
  | FsCollectionWrapper<FsAbilityTypeAfs>
  | FsCollectionWrapper<FsCharacterParamTypeAfs>
  | FsCollectionWrapper<FsCharacterTagAfs>
  | FsCollectionWrapper<FsCharacterTypeAfs>

export type FsCollections = {[name: string]: FsCollection}

/**
 * Service class: Data2Service
 */
@Injectable({
  providedIn: 'root'
})
export class Data2Service {
  private abilities = new FsCollectionWrapper<FsAbilityAfs>(FsCollectionName.Abilities)
  private abilityTypes = new FsCollectionWrapper<FsAbilityTypeAfs>(FsCollectionName.AbilityTypes)
  private characterParamTypes = new FsCollectionWrapper<FsCharacterParamTypeAfs>(FsCollectionName.CharacterParamTypes)
  private characterTags = new FsCollectionWrapper<FsCharacterTagAfs>(FsCollectionName.CharacterTags)
  private characterTypes = new FsCollectionWrapper<FsCharacterTypeAfs>(FsCollectionName.CharacterTypes)
  private collections: FsCollections = {
    Abilities: this.abilities,
    AbilityTypes: this.abilityTypes,
    CharacterParamTypes: this.characterParamTypes,
    CharacterTags: this.characterTags,
    CharacterTypes: this.characterTypes
  }

  constructor (private afs: AngularFirestore) {
    Logger.trace()
  }

  loadData (name: FsCollectionName, isReload: boolean = false) {
    Logger.trace(name)
    this.collections[name].loadData(this.afs, isReload)
  }

  getCollection (name:FsCollectionName):FsCollection {
    Logger.trace(name)
    return this.collections[name]
  }

  registerCallback (name: FsCollectionName, cbFn:()=> void) {
    Logger.trace(name)
    this.collections[name].registerCallback(cbFn)
  }
}
