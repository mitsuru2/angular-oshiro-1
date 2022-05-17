import { Component, OnInit } from '@angular/core'
import { Logger } from '../logger'
import { Data2Service } from '../data-2.service'
import { FsCollectionName, TFsCollectionName } from '../oshiro-data-type'
import { FsCollectionStatus } from '../fs-collection-wrapper'

@Component({
  selector: 'app-shiromusume-new',
  templateUrl: './shiromusume-new.component.html',
  styleUrls: ['./shiromusume-new.component.css']
})
export class ShiromusumeNewComponent implements OnInit {
  constructor (private ds : Data2Service) {}

  abilityStatus = this.ds.getStatus(FsCollectionName.Abilities)
  abilityTypeStatus = this.ds.getStatus(FsCollectionName.AbilityTypes)
  abilities = this.ds.getCollection(FsCollectionName.Abilities)

  ngOnInit (): void {
    Logger.trace()

    this.ds.loadData(FsCollectionName.Abilities)
    this.ds.loadData(FsCollectionName.AbilityTypes)
  }
}
