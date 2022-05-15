import { Component, OnInit } from '@angular/core';
import { CollectionStatus, DataService } from '../data.service';
import { Observable } from 'rxjs';
import {
  CharacterDoc,
  CharacterTypeDoc,
  CharacterTypeMap,
  WeaponTypeDoc,
} from '../oshiro-data-type';
import { Logger } from '../logger';

@Component({
  selector: 'app-shiromusume-list',
  templateUrl: './shiromusume-list.component.html',
  styleUrls: ['./shiromusume-list.component.css'],
})
export class ShiromusumeListComponent implements OnInit {
  characters?: CharacterDoc[];
  weaponTypeDoc?: WeaponTypeDoc;
  userOwnCharacters?: string[];
  characterTypes: CharacterTypeDoc[] = [];
  characterTypeIds: string[] = [];
  isCollectionLoadedMap: { [name: string]: boolean } = {
    Abilities: false,
    CharacterTypes: false,
    Characters: false,
  };

  constructor(private dataService: DataService) {
    Logger.trace();
  }

  ngOnInit(): void {
    Logger.trace();
    this.dataService.loadStartingData();
    this.getCharacters();
    this.getCharacterTypes();
    Logger.debug('loading map', this.isCollectionLoadedMap);
    Logger.debug(`typeof characterTypes: ${typeof this.characterTypes}`);
    Logger.debug(`characterTypes.length: ${this.characterTypes.length}`);
  }

  getCharacterTypes(): void {
    Logger.trace();
    let obs = this.dataService.getCollection('CharacterTypes');

    if (obs != undefined) {
      (obs as Observable<CharacterTypeDoc[]>).subscribe((x) => {
        x.sort((a, b) => (a.code < b.code ? -1 : 1));
        this.characterTypes = x;
        this.characterTypeIds = x.map((x) => x.id);
        Logger.debug(this.characterTypeIds);
        this.isCollectionLoadedMap['CharacterTypes'] = true;
        let tmpObj = Object.assign({}, this.isCollectionLoadedMap);
        Logger.debug('loading map', tmpObj);
      });
    } else {
      Logger.error('Observable loading is failed.');
    }
  }

  getCharacters(): void {
    Logger.trace();

    let obs = this.dataService.getCollection('Characters');

    if (obs != undefined) {
      (obs as Observable<CharacterDoc[]>).subscribe((x) => {
        this.characters = x;
        Logger.debug('next() is called.');
        this.isCollectionLoadedMap['Characters'] = true;
        let tmpObj = Object.assign({}, this.isCollectionLoadedMap);
        Logger.debug('loading map', tmpObj);
      });
    } else {
      Logger.error('Observable loading is failed.');
    }
  }
}
