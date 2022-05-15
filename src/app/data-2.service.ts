import { Injectable } from '@angular/core';
import { Logger } from './logger';

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

@Injectable({
  providedIn: 'root',
})
export class Data2Service {
  constructor() {}

  srcData: T_AfsDoc[] = [
    { id: 'abc', names: ['hogehoge'], code: '10-00', num: 1 },
    { id: 'bcd', names: ['fugafuga'], code: '20-10', num: 0 },
  ];

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
