import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProcedureComponent } from './test-procedure.component';

describe('TestProcedureComponent', () => {
  let component: TestProcedureComponent;
  let fixture: ComponentFixture<TestProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
