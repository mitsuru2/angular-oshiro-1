import { Injectable } from '@angular/core';
import { Const } from './const';

@Injectable({
  providedIn: 'root',
})
export class AppProppertyService {
  public title: string;

  constructor() {
    this.title = Const.App.TITLE;
  }
}
