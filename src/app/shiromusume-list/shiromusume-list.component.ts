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
  characterTypes?: CharacterTypeDoc[];

  constructor(private dataService: DataService) {
    Logger.trace();
  }

  ngOnInit(): void {
    Logger.trace();
    this.getCharacters();
    this.getCharacterTypes();
  }

  getCharacterTypes(): void {
    Logger.trace();
    let obs = this.dataService.getCollection('CharacterTypes');

    if (obs != undefined) {
      (obs as Observable<CharacterTypeDoc[]>).subscribe(
        (x) => (this.characterTypes = x)
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
