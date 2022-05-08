import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Logger.trace();
  }
}
