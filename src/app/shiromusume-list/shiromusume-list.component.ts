import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {
  CharacterDoc,
  CharacterTypeDoc,
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
  characterTypes: CharacterTypeDoc[] = [
    { id: 'dummy', name: 'hoge', order: 99, hasSubCollection: false },
  ];

  constructor(private dataService: DataService) {
    Logger.trace();
    let tmp = [0, 2, 1];
    tmp.sort((a, b) => a - b);
    Logger.debug(`typeof tmp[0]: ${typeof tmp[0]}`);
    Logger.debug(`tmp.length: ${tmp.length}`);
    Logger.debug(`tmp: ${tmp}`);
  }

  ngOnInit(): void {
    Logger.trace();
    this.getCharacters();
    this.getCharacterTypes();
    Logger.debug(`typeof characterTypes: ${typeof this.characterTypes}`);
    Logger.debug(`characterTypes.length: ${this.characterTypes.length}`);
  }

  getCharacterTypes(): void {
    Logger.trace();
    let obs = this.dataService.getCollection('CharacterTypes');

    if (obs != undefined) {
      (obs as Observable<CharacterTypeDoc[]>).subscribe(
        (x) => (this.characterTypes = x.sort((a, b) => a.order - b.order))
      );
    } else {
      Logger.error('Observable loading is failed.');
    }
  }

  getCharacters(): void {
    Logger.trace();

    let obs = this.dataService.getCollection('Characters');

    if (obs != undefined) {
      (obs as Observable<CharacterDoc[]>).subscribe(
        (x) => (this.characters = x)
      );
    } else {
      Logger.error('Observable loading is failed.');
    }
  }
}
