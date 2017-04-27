import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import {TestProcedureService } from "../shared/test-procedure.service";
import { TestProcedure } from "../shared/test-procedure.model";


@Component({
  selector: 'test-procedure',
  templateUrl: './test-procedure.component.html',
  styleUrls: ['../../css/component.css'],
  providers: [TestProcedureService]
})

export class TestProcedureComponent implements OnInit {
  @Input() testprocedures: TestProcedure[];
  selectedTestprocedure: TestProcedure;
  testCount: Number;

  constructor(
    private router: Router,
    private service: TestProcedureService) { }

  ngOnInit(): void {
    if (this.testprocedures === undefined) {
      this.getTestprocedures();
    }
  }

  getTestprocedures(): void {
    this.service.getTestProcedures().then(testprocedures => this.testprocedures = testprocedures);
  }

  onSelect(testprocedure: TestProcedure): void {
    if (this.selectedTestprocedure === testprocedure) {
      this.selectedTestprocedure = null;
      return;
    }

    this.selectedTestprocedure = testprocedure;
    if (testprocedure.test)
      this.testCount = testprocedure.test.length;
    else
      this.testCount = 0;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.service.create(name)
      .then(testprocedure => {
        this.testprocedures.push(testprocedure);
        this.selectedTestprocedure = null;
      });
  }

  delete(testprocedure: TestProcedure): void {
    this.service
      .delete(testprocedure.id)
      .then(() => {
        this.testprocedures = this.testprocedures.filter(m => m !== testprocedure);
        if (this.selectedTestprocedure === testprocedure) { this.selectedTestprocedure = null; }
      });
  }

  gotoDetail(): void {
    this.router.navigate(['/testprocedures', this.selectedTestprocedure.id]);
  }

}
