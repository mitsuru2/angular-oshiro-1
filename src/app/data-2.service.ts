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

type FsCollection =
  | FsCollectionWrapper<FsAbilityAfs>
  | FsCollectionWrapper<FsAbilityTypeAfs>
  | FsCollectionWrapper<FsCharacterParamTypeAfs>
  | FsCollectionWrapper<FsCharacterTagAfs>
  | FsCollectionWrapper<FsCharacterTypeAfs>

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

  constructor (private afs: AngularFirestore) {
    Logger.trace()
  }

  loadData (name: FsCollectionName, isReload: boolean = false) {
    if (name === FsCollectionName.Abilities) {
      this.abilities.loadData(this.afs, isReload)
    } else if (name === FsCollectionName.AbilityTypes) {
      this.abilityTypes.loadData(this.afs, isReload)
    } else if (name === FsCollectionName.CharacterParamTypes) {
      this.characterParamTypes.loadData(this.afs, isReload)
    } else if (name === FsCollectionName.CharacterTags) {
      this.characterTags.loadData(this.afs, isReload)
    } else if (name === FsCollectionName.CharacterTypes) {
      this.characterTypes.loadData(this.afs, isReload)
    }
  }

  getCollection (name:FsCollectionName):FsCollection {
    if (name === FsCollectionName.Abilities) {
      return this.abilities
    } else if (name === FsCollectionName.AbilityTypes) {
      return this.abilityTypes
    } else if (name === FsCollectionName.CharacterParamTypes) {
      return this.characterParamTypes
    } else if (name === FsCollectionName.CharacterTags) {
      return this.characterTags
    } else /* if (name === FsCollectionName.CharacterTypes) */ {
      return this.characterTypes
    }
  }
}
