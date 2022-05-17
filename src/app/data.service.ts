import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  AbilityDoc,
  AbilityTypeDoc,
  CharacterDoc,
  CharacterParamTypeDoc,
  CharacterTagDoc,
  CharacterTypeDoc,
  CharacterTypeMap,
  FacilityDoc,
  FacilityTypeDoc,
  GeographTypeDoc,
  IllustratrDoc,
  RegionDoc,
  UserCharacterListDoc,
  UserDoc,
  UserFacilityListDoc,
  UserWeaponListDoc,
  VoiceActorDoc,
  WeaponDoc,
  WeaponTypeDoc,
} from './oshiro-data-type';
import { Logger } from './logger';
import { collection } from '@firebase/firestore';

export enum CollectionStatus {
  Unloaded = 0,
  Loaded,
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * Private members.
   */
  // Firestore collection data.
  private collectionStatuses: {
    [name: string]: CollectionStatus;
  } = {
    Abilities: CollectionStatus.Unloaded,
    CharacterTypes: CollectionStatus.Unloaded,
    Characters: CollectionStatus.Unloaded,
  };
  private collectionTimestamps: {
    [name: string]: Date;
  } = {
    Abilities: new Date(),
    CharacterTypes: new Date(),
    Characters: new Date(),
  };
  private collections: {
    [name: string]:
      | Observable<AbilityDoc[]>
      | Observable<CharacterTypeDoc[]>
      | Observable<CharacterDoc[]>;
  } = {
    Abilities: new Observable<AbilityDoc[]>(),
    CharacterTypes: new Observable<CharacterTypeDoc[]>(),
    Characters: new Observable<CharacterDoc[]>(),
  };

  // Local data table.
  characterTypes: CharacterTypeMap[] = [];

  constructor(private firestore: AngularFirestore) {}

  /**
   * It loads specified data collection from the data server.
   * Loaded data is stored into this.collectionData[name] as observable object.
   * @param name    Name of the data collection.
   */
  loadCollection(name: string): void {
    Logger.trace(name);

    // Check collection name.
    if (!Object.keys(this.collections).includes(name)) {
      Logger.error(`Unknown collection name: ${name}`);
      return;
    }

    // Loading data.
    if (name == ('Abilities' as keyof typeof this.collections)) {
      let tmp = this.firestore.collection<AbilityDoc>(name); // AngularFirestoreCollection<T>

      this.collections[name] = tmp.valueChanges({ idField: 'id' });
    } else if (name == ('CharacterTypes' as keyof typeof this.collections)) {
      Logger.debug('Before collection');
      let tmp = this.firestore.collection<CharacterTypeDoc>(name);
      this.collections[name] = tmp.valueChanges({ idField: 'id' });
      Logger.debug('After collection');
    } else if (name == ('Characters' as keyof typeof this.collections)) {
      let tmp = this.firestore.collection<CharacterDoc>(name);
      this.collections[name] = tmp.valueChanges({ idField: 'id' });
    } else {
      Logger.error(`No implementation for the collection: ${name}`);
      return;
    }

    // Update status.
    this.collectionStatuses[name] = CollectionStatus.Loaded;
    this.collectionTimestamps[name] = new Date();

    // Debug print.
    Logger.info(
      `Finish collection loading: ${name}`,
      `Timestamp: ${this.collectionTimestamps[name].toISOString()}`
    );

    return;
  }

  /** It loads minimum data collection from the data server to run this application.
   * In particular, it loads following collections:
   * AbilityTypes, CharacterParamTypes, FacilityTypes, GeographTypes, Regions, Users, WeaponTypes.
   */
  loadStartingData(): void {
    Logger.trace();

    let names = [
      //'AbilityTypes',
      'CharacterTypes',
      //'CharacterParamTypes',
      //'FacilityTypes',
      //'GeographTypes',
      //'Regions',
      //'Users',
      //'WeaponTypes',
    ];

    for (let name of names) {
      if (Object.keys(this.collections).includes(name)) {
        if (this.collectionStatuses[name] == CollectionStatus.Unloaded) {
          this.loadCollection(name);
        }
      }
    }

    (
      this.collections['CharacterTypes'] as Observable<CharacterTypeDoc[]>
    ).subscribe((list) => {
      Logger.debug('Subscribing in DataService.');
      for (let item of list) {
        //let tmpObj = { code: item.code, names: item.names, num: item.num };
        let tmpObj2 = {
          [item.id]: { code: item.code, names: item.names, num: item.num },
        };
        this.characterTypes.push(tmpObj2);
      }
      Logger.debug(this.characterTypes);
    });
    return;
  }

  getCollection(
    name: string
  ):
    | Observable<AbilityDoc[]>
    | Observable<CharacterTypeDoc[]>
    | Observable<CharacterDoc[]>
    | undefined {
    Logger.trace(name);

    // Check collection name.
    if (!Object.keys(this.collections).includes(name)) {
      Logger.error(`Unknown collection name: ${name}`);
      return undefined;
    }

    // Loading data if the target collection is not loaded.
    if (this.collectionStatuses[name] == CollectionStatus.Unloaded) {
      this.loadCollection(name);
    }

    // Return observable.
    return this.collections[name];
  }

  getCollectionStatuses(): { [name: string]: CollectionStatus } {
    return this.collectionStatuses;
  }

  convDocToList(doc: any): void {
    Logger.trace();

    // Extract list of NameAndDispOrder from NameAndDispOrderDoc.
    // Object.keys() returns an array of keys of the target object.
    // Ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    // Array.map() makes a new array by input function.
    // Ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    //let list = Object.keys(doc).map((k) => doc[k]);
    //let tmp = list.slice();
    //Logger.debug(tmp);
    //return list;
  }

  convDocToListAndSort(doc: any, isReverse: boolean = false): void {
    Logger.trace();

    // Sort by display order.
    // Here, a nameless function is used as compared function.
    // If result of the compared function is less than or equal to zero, the sorted order will become like [a, b].
    // Otherwise, the sorted order will become like [b, a].
    // Ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //let list = this.convDocToList(doc);
    //if (!isReverse) {
    //  list.sort((a, b) => a.order - b.order);
    //} else {
    //  list.sort((a, b) => b.order - a.order);
    //}
    //Logger.debug(list);
    //return list;
  }
}
