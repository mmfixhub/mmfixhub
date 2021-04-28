import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupsComponent } from './grups.component';

describe('GrupsComponent', () => {
  let component: GrupsComponent;
  let fixture: ComponentFixture<GrupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
