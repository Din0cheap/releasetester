import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { MastertestplanService } from "../shared/mastertestplan.service";
import { Mastertestplan } from "../shared/mastertestplan.model";
import { Leveltestplan } from "../../leveltestplans/shared/leveltestplan.model";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'mastertestplan-detail',
    templateUrl: './mastertestplan-detail.component.html',
    styleUrls: ['../../css/component.css', '../../css/detail.css'],
})

export class MastertestplanDetailComponent implements OnInit {
    mastertestplan: Mastertestplan;
    leveltestplans: Leveltestplan[];
    symbol = "🔎";
    constructor(
        private service: MastertestplanService,
        private route: ActivatedRoute,
        private location: Location
    ) { }



    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.service.getMastertestplan(+params['id']))
            .subscribe(masterplan => { this.mastertestplan = masterplan; this.leveltestplans = masterplan.leveltestplans; })
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.service.update(this.mastertestplan)
            .then(() => this.goBack());
    }


}