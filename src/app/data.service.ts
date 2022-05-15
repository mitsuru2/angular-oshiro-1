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

enum CollectionStatus {
  Unloaded = 0,
  Loaded,
}

interface Collection {
  status: CollectionStatus;
  timestamp: Date;
  data: Observable<AbilityDoc[]> | Observable<CharacterDoc[]>;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * Private members.
   */
  // Firestore collection data.
  private abilitiesCollection: Observable<AbilityDoc[]>;
  private charactersCollection: Observable<CharacterDoc[]>;

  private collections: {
    [name: string]: Collection;
  } = {
    Abilities: {
      status: CollectionStatus.Unloaded,
      timestamp: new Date(),
      data: new Observable<AbilityDoc[]>(),
    },
    Characters: {
      status: CollectionStatus.Unloaded,
      timestamp: new Date(),
      data: new Observable<CharacterDoc[]>(),
    },
  };

  constructor(private firestore: AngularFirestore) {
    this.abilitiesCollection = new Observable<AbilityDoc[]>();
    this.charactersCollection = new Observable<CharacterDoc[]>();
  }

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
      this.collections[name].data = tmp.valueChanges({ idField: 'id' });
    } else if (name == ('Characters' as keyof typeof this.collections)) {
      let tmp = this.firestore.collection<CharacterDoc>(name);
      this.collections[name].data = tmp.valueChanges({ idField: 'id' });
    }

    // Update status.
    this.collections[name].status = CollectionStatus.Loaded;
    this.collections[name].timestamp = new Date();

    // Debug print.
    Logger.info(
      `Finish collection loading: ${name}`,
      `Timestamp: ${this.collections[name].timestamp.toISOString()}`
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
      'AbilityTypes',
      'CharacterParamTypes',
      'FacilityTypes',
      'GeographTypes',
      'Regions',
      'Users',
      'WeaponTypes',
    ];

    //    for (let name of names) {
    //      if (!this.collectionSt[name as keyof typeof this.collectionSt]) {
    //        this.loadDataCollection(name);
    //      }
    //    }
    return;
  }

  getCollection(
    name: string
  ): Observable<AbilityDoc[]> | Observable<CharacterDoc[]> | undefined {
    Logger.trace(name);

    // Check collection name.
    if (!Object.keys(this.collections).includes(name)) {
      Logger.error(`Unknown collection name: ${name}`);
      return undefined;
    }

    // Loading data if the target collection is not loaded.
    if (this.collections[name].status == CollectionStatus.Unloaded) {
      this.loadCollection(name);
    }

    // Return observable.
    return this.collections[name].data;
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
