import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger';

@Component({
  selector: 'app-shiromusume-new',
  templateUrl: './shiromusume-new.component.html',
  styleUrls: ['./shiromusume-new.component.css'],
})
export class ShiromusumeNewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Logger.trace();
  }
}
