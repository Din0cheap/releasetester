import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveltestplanComponent } from './leveltestplan.component';

describe('LeveltestplanComponent', () => {
  let component: LeveltestplanComponent;
  let fixture: ComponentFixture<LeveltestplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeveltestplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeveltestplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
