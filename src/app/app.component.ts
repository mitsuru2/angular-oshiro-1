import { ApplicationInitStatus, Component } from '@angular/core';
import { AppProppertyService, AppSt } from './app-propperty.service';
import { Logger } from './logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public appProperty: AppProppertyService) {}

  ngOnInit(): void {
    Logger.trace();
  }

  onClickMenuButton(e: any): void {
    Logger.trace();
    let st = this.appProperty.status.sideMenu.opened;
    if (st == true) {
      e.close();
      st = false;
    } else {
      e.open();
      st = true;
    }
    this.appProperty.status.sideMenu.opened = st;

    Logger.debug('sideMenu.opened:', this.appProperty.status.sideMenu.opened);
  }

  onClickLoginButton(): void {
    Logger.trace();
    let tmp = this.appProperty.status.login;
    this.appProperty.status.login = !tmp;
    Logger.debug('status.login:', this.appProperty.status.login);
  }

  onClickLogoutButton(): void {
    Logger.trace();
    let tmp = this.appProperty.status.login;
    this.appProperty.status.login = !tmp;
    Logger.debug('status.login:', this.appProperty.status.login);
  }

  onClickSettingsButton(): void {
    Logger.trace();
  }

  toggleSideMenu(e: any): void {
    e.toggle();
  }
}
