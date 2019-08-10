import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutonuevoComponent } from './autonuevo.component';

describe('AutonuevoComponent', () => {
  let component: AutonuevoComponent;
  let fixture: ComponentFixture<AutonuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutonuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutonuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
