import { Injectable } from '@angular/core';
import {
  CharacterType,
  GeographType,
  Region,
  WeaponType,
  WeaponTypeCosts,
  CharacterDoc,
  NameWithOrderDoc,
  NameWithIdsDoc,
  UserDoc,
  BaseDoc,
  NameWithOrder,
} from './oshiro-data-type';
import { Logger } from './logger';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  database: {
    [collection: string]:
      | {
          [document: string]: {
            [subCollection: string]:
              | NameWithOrderDoc
              | CharacterDoc
              | NameWithIdsDoc;
          };
        }
      | UserDoc;
  } = {
    common: {
      oshiro: {
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
      },
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

  getCollectionData(name: string): any {
    Logger.trace(name);

    if (name == 'users') {
      return this.database['users'];
    } else if (name == 'characterTypeNames') {
      return this.database['common']['oshiro'][
        'characterTypeNames' as keyof typeof this.database['common']['oshiro']
      ];
    } else if (name == 'weaponTypeNames') {
      return this.database['common']['oshiro'][
        'weaponTypeNames' as keyof typeof this.database['common']['oshiro']
      ];
    } else if (name == 'characters') {
      return this.database['common']['oshiro'][
        'characters' as keyof typeof this.database['common']['oshiro']
      ];
    } else if (name == 'characterTags') {
      return this.database['common']['oshiro'][
        'characterTags' as keyof typeof this.database['common']['oshiro']
      ];
    }
  }

  convDocToList(doc: BaseDoc): any[] {
    Logger.trace();

    // Extract list of NameAndDispOrder from NameAndDispOrderDoc.
    // Object.keys() returns an array of keys of the target object.
    // Ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    // Array.map() makes a new array by input function.
    // Ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    let list = Object.keys(doc).map((k) => doc[k]);
    let tmp = list.slice();
    Logger.debug(tmp);
    return list;
  }

  convDocToListAndSort(
    doc: NameWithOrderDoc,
    isReverse: boolean = false
  ): NameWithOrder[] {
    Logger.trace();

    // Sort by display order.
    // Here, a nameless function is used as compared function.
    // If result of the compared function is less than or equal to zero, the sorted order will become like [a, b].
    // Otherwise, the sorted order will become like [b, a].
    // Ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let list = this.convDocToList(doc);
    if (!isReverse) {
      list.sort((a, b) => a.order - b.order);
    } else {
      list.sort((a, b) => b.order - a.order);
    }
    Logger.debug(list);
    return list;
  }
}
