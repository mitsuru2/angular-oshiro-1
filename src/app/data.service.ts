import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CharacterDoc } from './oshiro-data-type';
import { Logger } from './logger';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'mock-server/';

  constructor(private http: HttpClient) {}

  getCollectionData(name: string): any {
    Logger.trace(name);

    let targetUrl = this.baseUrl + name;

    //    if (name == 'users') {
    //      return this.http.get<UserDoc>(targetUrl);
    //    } else if (name == 'characterTypeNames') {
    //      return this.http.get<NameWithOrderDoc>(targetUrl);
    //    } else if (name == 'weaponTypeNames') {
    //      return this.http.get<NameWithOrderDoc>(targetUrl);
    //    } else if (name == 'characters') {
    //      return this.http.get<CharacterDoc>(targetUrl);
    //    } else if (name == 'characterTags') {
    //      return this.http.get<NameWithIdsDoc>(targetUrl);
    //    } else {
    //      Logger.error(`Invalid collection name: ${name}`);
    //    }
    return null;
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
