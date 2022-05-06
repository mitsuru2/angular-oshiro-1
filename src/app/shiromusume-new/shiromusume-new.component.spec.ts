import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiromusumeNewComponent } from './shiromusume-new.component';

describe('ShiromusumeNewComponent', () => {
  let component: ShiromusumeNewComponent;
  let fixture: ComponentFixture<ShiromusumeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiromusumeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiromusumeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
