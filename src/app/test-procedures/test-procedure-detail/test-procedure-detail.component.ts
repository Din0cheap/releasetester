import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { TestProcedureService } from "../shared/test-procedure.service";
import { Condition, Operation, TestProcedure, Test } from "../shared/test-procedure.model";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'test-procedure-detail',
    templateUrl: './test-procedure-detail.component.html',
    styleUrls: ['../../css/component.css', '../../css/detail.css']
})

export class TestProcedureDetailComponent implements OnInit {
    testprocedure: TestProcedure;
    selectedTestprocedure: TestProcedure;
    setup: TestProcedure;
    test: Test[];
    cleanup: TestProcedure;

    constructor(
        private service: TestProcedureService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.service.getTestProcedure(+params['id']))
            .subscribe(testprocedure => {
                this.testprocedure = testprocedure;
                this.setup = testprocedure.setup;
                this.test = testprocedure.test;
                this.cleanup = testprocedure.cleanup
            })
    }

    onHover(testprocedure: TestProcedure): void {
        this.selectedTestprocedure = testprocedure;
    }

    gotoDetail(testprocedure: TestProcedure): void {
        this.router.navigate(['/testprocedures', testprocedure.id]);
    }

    save(): void {
        this.service.update(this.testprocedure)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}