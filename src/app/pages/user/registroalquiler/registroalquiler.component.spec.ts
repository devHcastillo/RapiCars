import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroalquilerComponent } from './registroalquiler.component';

describe('RegistroalquilerComponent', () => {
  let component: RegistroalquilerComponent;
  let fixture: ComponentFixture<RegistroalquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroalquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroalquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
