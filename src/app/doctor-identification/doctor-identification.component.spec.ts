import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorIdentificationComponent } from './doctor-identification.component';

describe('DoctorIdentificationComponent', () => {
  let component: DoctorIdentificationComponent;
  let fixture: ComponentFixture<DoctorIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
