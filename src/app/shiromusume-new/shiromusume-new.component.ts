import { Component, OnInit } from '@angular/core'
import { Logger } from '../logger'
import { Data2Service } from '../data-2.service'
import { FsAbilityDoc, FsAbilityTypeDoc, FsCollectionName } from '../oshiro-data-type'
import { FsCollectionStatus } from '../fs-collection-wrapper'

@Component({
  selector: 'app-shiromusume-new',
  templateUrl: './shiromusume-new.component.html',
  styleUrls: ['./shiromusume-new.component.css']
})
export class ShiromusumeNewComponent implements OnInit {
  constructor (private ds : Data2Service) {}

  abilitiesProp = this.ds.getCollection(FsCollectionName.Abilities)
  abilitiesDoc = this.abilitiesProp.getDocument() as FsAbilityDoc
  abilitiesKeys = this.abilitiesProp.getKeys()
  abilityTypesProp = this.ds.getCollection(FsCollectionName.AbilityTypes)
  abilityTypesDoc = this.abilityTypesProp.getDocument() as FsAbilityTypeDoc
  abilityTypesKeys = this.abilityTypesProp.getKeys()

  ngOnInit (): void {
    Logger.trace()

    if (this.abilitiesProp.getStatus() !== FsCollectionStatus.Loaded) {
      this.ds.loadData(FsCollectionName.Abilities)
    }
    if (this.abilityTypesProp.getStatus() !== FsCollectionStatus.Loaded) {
      this.ds.loadData(FsCollectionName.AbilityTypes)
    }
  }
}
