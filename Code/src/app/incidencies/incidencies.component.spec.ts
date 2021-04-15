import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciesComponent } from './incidencies.component';

describe('IncidenciesComponent', () => {
  let component: IncidenciesComponent;
  let fixture: ComponentFixture<IncidenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
