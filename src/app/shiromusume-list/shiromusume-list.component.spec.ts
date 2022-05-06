import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiromusumeListComponent } from './shiromusume-list.component';

describe('ShiromusumeListComponent', () => {
  let component: ShiromusumeListComponent;
  let fixture: ComponentFixture<ShiromusumeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiromusumeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiromusumeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
