/**
 * Import modules.
 */
/** Core modules. */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { type } from 'os';
import { Observable } from 'rxjs';

/** Local modules. */
import { Logger } from './logger';

/**
 * Interfaces.
 */
export interface T_Base {
  names: string[];
  code: string;
  num: number;
}

export interface T_AfsDoc extends T_Base {
  id: string;
  /*name: string*/
}

export interface T_AfsMap {
  [id: string]: {
    names: string[];
    code: string;
    num: number;
  };
}

/**
 * Service class: Data2Service
 */
@Injectable({
  providedIn: 'root',
})
export class Data2Service {
  /** Member variables. */

  constructor() {}

  srcData: T_AfsDoc[] = [
    { id: 'abc', names: ['hogehoge'], code: '10-00', num: 1 },
    { id: 'bcd', names: ['fugafuga'], code: '20-10', num: 0 },
  ];

  /**
   * It converts input ***_AfsDoc data into ***_FsDoc type.
   * It extracts ***_Base data by removind the key 'id' and make new data object.
   * @pacram afsDoc The input data object of Angular Firestore document format.
   * @returns The converted data object. The user shall cast it as Firesotre document format.
   */
  convAfsDocToFsDoc<T_AfsDoc>(afsDoc: T_AfsDoc): any {
    Logger.trace();

    // Get keys and values.
    let keys = Object.keys(afsDoc);
    let values = Object.values(afsDoc);

    // Check if 'id' is included.
    if (!keys.includes('id')) {
      Logger.error('Essential key is not found.');
      return undefined;
    }

    // Find 'id' and remove it.
    let idIndex = keys.indexOf('id');
    let idValue = Object.values(afsDoc)[idIndex];
    keys.splice(idIndex, 1);
    values.splice(idIndex, 1);

    // Make base data object.
    let baseObj: { [key: string]: any } = {};
    for (let i = 0; i < keys.length; i++) {
      baseObj[keys[i]] = values[i];
    }

    // Make destination data object.
    let dstObj: { [id: string]: typeof baseObj } = {
      [idValue]: baseObj,
    };

    return dstObj;
  }

  /** test function. */
  makeDocTable<T1>(src: T1): any {
    Logger.debug(src);
    let keys: string[] = Object.keys(src);
    let values = Object.values(src);
    let keysSnp1 = { ...keys };
    Logger.debug(keysSnp1);
    let idx = keys.indexOf('id');
    let idValue = Object.values(src)[idx];
    Logger.debug(idx);
    Logger.debug(`ID: ${idValue}`);
    keys.splice(idx, 1);
    values.splice(idx, 1);
    let keysSnp2 = { ...keys };
    let valuesSnp2 = { ...values };
    Logger.debug(keysSnp2);
    Logger.debug(valuesSnp2);

    let baseObj: { [key: string]: any } = {};
    for (let i = 0; i < keys.length; i++) {
      baseObj[keys[i]] = values[i];
    }
    Logger.debug(baseObj);

    let dstObj: { [id: string]: typeof baseObj } = {
      [idValue]: baseObj,
    };

    return dstObj;
  }
}
