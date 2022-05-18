import { Component, OnInit, ViewChild } from '@angular/core'
import { Logger } from '../logger'
import { Data2Service } from '../data-2.service'
import { FsAbilityDoc, FsAbilityTypeDoc, FsCharacterParamTypeDoc, FsCharacterTagDoc, FsCharacterTypeDoc, FsCollectionName } from '../oshiro-data-type'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'

type FsCharacterTypeView = {
  id: string;
  code: string;
  name: string;
  num: number;
}

@Component({
  selector: 'app-shiromusume-new',
  templateUrl: './shiromusume-new.component.html',
  styleUrls: ['./shiromusume-new.component.css']
})
export class ShiromusumeNewComponent implements OnInit {
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
  characterTypesView:FsCharacterTypeView[] = []
  characterTypesDataSource = new MatTableDataSource(this.characterTypesView)
  characterTypesColumns: string[] = ['id', 'code', 'name', 'num']

  @ViewChild(MatSort, { static: false }) set content (sort: MatSort) { // eslint-disable-line accessor-pairs
    this.characterTypesDataSource.sort = sort
  }

  constructor (private ds : Data2Service) {
    Logger.trace()
  }

  ngOnInit (): void {
    Logger.trace()

    this.ds.registerCallback(FsCollectionName.CharacterTypes, this.convCharacterTypesDocToView.bind(this))

    this.ds.loadData(FsCollectionName.Abilities)
    this.ds.loadData(FsCollectionName.AbilityTypes)
    this.ds.loadData(FsCollectionName.CharacterParamTypes)
    this.ds.loadData(FsCollectionName.CharacterTags)
    this.ds.loadData(FsCollectionName.CharacterTypes)
  }

  convCharacterTypesDocToView () {
    Logger.trace()

    for (const key of this.characterTypesKeys) {
      const doc = this.characterTypesDoc[key]
      let name = doc.names[0]
      if (doc.names.length > 1) {
        name += ' >> ' + doc.names[1]
      }
      const viewData: FsCharacterTypeView = {
        id: key,
        code: doc.code,
        name,
        num: doc.num
      }
      this.characterTypesView.push(viewData)
    }
    this.characterTypesDataSource = new MatTableDataSource(this.characterTypesView)
  }
}
