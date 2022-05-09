import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {
  CharacterDoc,
  NameWithOrder,
  NameWithOrderDoc,
  UserDoc,
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

    (
      this.dataService.getCollectionData(
        'characters'
      ) as Observable<CharacterDoc>
    ).subscribe((x) => (this.characters = x));

    (
      this.dataService.getCollectionData('users') as Observable<UserDoc>
    ).subscribe(
      (x) =>
        (this.userOwnCharacters =
          x['6MiwgNSrwlYKqCCmIqxx']['oshiro'].characterIds)
    );

    (
      this.dataService.getCollectionData(
        'weaponTypeNames'
      ) as Observable<NameWithOrderDoc>
    ).subscribe((x) => (this.weaponTypeNameDoc = x));

    (
      this.dataService.getCollectionData(
        'characterTypeNames'
      ) as Observable<NameWithOrderDoc>
    ).subscribe((x) => (this.characterTypeNameDoc = x));

    if (this.characterTypeNameDoc != null) {
      this.characterTypeNames = this.dataService.convDocToListAndSort(
        this.characterTypeNameDoc
      );
    }
  }
}
