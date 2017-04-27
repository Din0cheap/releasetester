import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { LeveltestplanService } from "../shared/leveltestplan.service";
import { Leveltestplan } from "../shared/leveltestplan.model";
import { TestProcedure } from "../../test-procedures/shared/test-procedure.model"

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'leveltestplan-detail',
    templateUrl: './leveltestplan-detail.component.html',
    styleUrls: ['../../css/component.css','../../css/detail.css']
})

export class LeveltestplanDetailComponent implements OnInit {
    leveltestplan: Leveltestplan;
    testprocedures: TestProcedure[];
    constructor(
        private service: LeveltestplanService,
        private route: ActivatedRoute,
        private location: Location
    ) { }


    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.service.getLeveltestplan(+params['id']))
            .subscribe(levelplan => {this.leveltestplan = levelplan; this.testprocedures= levelplan.testProcedures;})
    }

     save(): void {
        this.service.update(this.leveltestplan)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}