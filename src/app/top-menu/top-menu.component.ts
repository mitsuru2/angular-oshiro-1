import { Component, OnInit } from '@angular/core';
import { AppProppertyService } from '../app-propperty.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit {
  title!: String;

  constructor(private appProperty: AppProppertyService) {}

  ngOnInit(): void {
    this.title = this.appProperty.title;
  }
}
