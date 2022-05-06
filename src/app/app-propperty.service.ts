import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';
import { Injectable } from '@angular/core';
import { Const, DefaultStatus } from './const';

export interface SideMenuSt {
  opened: boolean;
}

export interface AppSt {
  login: boolean;
  sideMenu: SideMenuSt;
}

@Injectable({
  providedIn: 'root',
})
export class AppProppertyService {
  public readonly projectName: string = Const.App.Project;
  public readonly title: string = Const.App.Title;
  public status: AppSt = {
    login: DefaultStatus.Login,
    sideMenu: { opened: DefaultStatus.SideMenu.Opened },
  };

  constructor() {}
}
