import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  CharacterDoc,
  NameWithOrder,
  NameWithOrderDoc,
} from '../oshiro-data-type';
import { Logger } from '../logger';

@Component({
  selector: 'app-shiromusume-list',
  templateUrl: './shiromusume-list.component.html',
  styleUrls: ['./shiromusume-list.component.css'],
})
export class ShiromusumeListComponent implements OnInit {
  characters?: CharacterDoc;
  weaponTypeNameDoc?: NameWithOrderDoc;
  userOwnCharacters?: string[];
  characterTypeNameDoc?: NameWithOrderDoc;
  characterTypeNames?: NameWithOrder[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    Logger.trace();
    this.getCharacters();
  }

  getCharacters(): void {
    Logger.trace();
    this.characters = this.dataService.getCollectionData('characters');
    this.userOwnCharacters =
      this.dataService.getCollectionData('users')['6MiwgNSrwlYKqCCmIqxx'][
        'oshiro'
      ].characterIds;
    this.weaponTypeNameDoc =
      this.dataService.getCollectionData('weaponTypeNames');
    this.characterTypeNameDoc =
      this.dataService.getCollectionData('characterTypeNames');
    if (this.characterTypeNameDoc != null) {
      this.characterTypeNames = this.dataService.convDocToListAndSort(
        this.characterTypeNameDoc
      );
    }
  }
}
