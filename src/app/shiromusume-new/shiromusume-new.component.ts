import { Component, OnInit } from '@angular/core'
import { Logger } from '../logger'
import { Data2Service } from '../data-2.service'
import { FsAbilityDoc, FsAbilityTypeDoc, FsCharacterParamTypeDoc, FsCharacterTagDoc, FsCharacterTypeDoc, FsCollectionName } from '../oshiro-data-type'

@Component({
  selector: 'app-shiromusume-new',
  templateUrl: './shiromusume-new.component.html',
  styleUrls: ['./shiromusume-new.component.css']
})
export class ShiromusumeNewComponent implements OnInit {
  constructor (private ds : Data2Service) {
    Logger.trace()
  }

  abilitiesProp = this.ds.getCollection(FsCollectionName.Abilities)
  abilitiesDoc = this.abilitiesProp.getDocument() as FsAbilityDoc
  abilitiesKeys = this.abilitiesProp.getKeys()
  abilityTypesProp = this.ds.getCollection(FsCollectionName.AbilityTypes)
  abilityTypesDoc = this.abilityTypesProp.getDocument() as FsAbilityTypeDoc
  abilityTypesKeys = this.abilityTypesProp.getKeys()
  characterParamTypesProp = this.ds.getCollection(FsCollectionName.CharacterParamTypes)
  characterParamTypesDoc = this.characterParamTypesProp.getDocument() as FsCharacterParamTypeDoc
  characterParamTypesKeys = this.characterParamTypesProp.getKeys()
  characterTagsProp = this.ds.getCollection(FsCollectionName.CharacterTags)
  characterTagsDoc = this.characterTagsProp.getDocument() as FsCharacterTagDoc
  characterTagsKeys = this.characterTagsProp.getKeys()
  characterTypesProp = this.ds.getCollection(FsCollectionName.CharacterTypes)
  characterTypesDoc = this.characterTypesProp.getDocument() as FsCharacterTypeDoc
  characterTypesKeys = this.characterTypesProp.getKeys()

  ngOnInit (): void {
    Logger.trace()

    this.ds.loadData(FsCollectionName.Abilities)
    this.ds.loadData(FsCollectionName.AbilityTypes)
    this.ds.loadData(FsCollectionName.CharacterParamTypes)
    this.ds.loadData(FsCollectionName.CharacterTags)
    this.ds.loadData(FsCollectionName.CharacterTypes)
  }
}
