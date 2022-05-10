import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  NameWithOrderDoc,
  NameWithIdsDoc,
  CharacterDoc,
  UserDoc,
  CharacterType,
  WeaponType,
  GeographType,
  Region,
  WeaponTypeCosts,
} from './oshiro-data-type';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  private database: {
    characterTypeNames: NameWithOrderDoc;
    weaponTypeNames: NameWithOrderDoc;
    characters: CharacterDoc;
    characterTags: NameWithIdsDoc;
    users: UserDoc;
  } = {
    characterTypeNames: {
      '0': { name: '城娘', order: 0 },
      '1': { name: '城娘(コラボ)', order: 1 },
      '2': { name: '兜娘', order: 2 },
      '3': { name: 'コラボユニット', order: 3 },
      '4': { name: '殿', order: 6 },
      '5': { name: '神娘', order: 5 },
      '6': { name: 'イベントアイテム', order: 4 },
    },
    weaponTypeNames: {
      '0': { name: '刀', order: 0 },
      '1': { name: '槍', order: 1 },
      '2': { name: '槌', order: 2 },
      '3': { name: '盾', order: 3 },
      '4': { name: '拳', order: 4 },
      '5': { name: '鎌', order: 5 },
      '6': { name: '戦棍', order: 6 },
      '7': { name: '双剣', order: 7 },
      '8': { name: '弓', order: 8 },
      '9': { name: '石弓', order: 9 },
      '10': { name: '鉄砲', order: 10 },
      '11': { name: '大砲', order: 11 },
      '12': { name: '歌舞', order: 12 },
      '13': { name: '札', order: 13 },
      '14': { name: '鈴', order: 14 },
      '15': { name: '杖', order: 15 },
      '16': { name: '祓串', order: 16 },
      '17': { name: '本', order: 17 },
      '18': { name: '投剣', order: 18 },
      '19': { name: '鞭', order: 19 },
      '20': { name: '陣貝', order: 20 },
    },
    characters: {
      fukuyamaDate: {
        order: 0,
        type: CharacterType.ShiroMusume,
        name: '福山館',
        rarerity: 1,
        weaponType: WeaponType.Bow,
        cost: WeaponTypeCosts[WeaponType.Bow]['cost'],
        geographType: [GeographType.Hill, GeographType.Seaside],
        region: Region.Hokkaido,
        abilityIds: ['0'],
        abilityIds_kai: ['0'],
        voiceActor: '松田利冴',
      },
      matsumaeJo: {
        order: 1,
        type: CharacterType.ShiroMusume,
        name: '松前城',
        rarerity: 4,
        weaponType: WeaponType.Gun,
        cost: WeaponTypeCosts[WeaponType.Gun]['cost'],
        geographType: [GeographType.Hill, GeographType.Seaside],
        region: Region.Hokkaido,
        abilityIds: ['1'],
        abilityIds_kai: ['1', '2'],
        voiceActor: '松田利冴',
        tags: [{ name: '日本100名城', id: '0' }],
      },
    },
    characterTags: {
      '0': { name: '日本100名城', ids: ['matsumae-jo'] },
    },
    users: {
      '6MiwgNSrwlYKqCCmIqxx': {
        name: 'mitsuru',
        oshiro: {
          characterIds: ['matsumaeJo'],
        },
        setting: {
          hideSideMenu: false,
        },
      },
    },
  };

  constructor() {}

  createDb(): any {
    Logger.trace();
    return this.database;
  }
}
