import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import {  LeveltestplanService} from "../shared/leveltestplan.service";
import { Leveltestplan } from "../shared/leveltestplan.model";

@Component({
    selector: 'leveltestplan',
    templateUrl: './leveltestplan.component.html',
    styleUrls: ['../../css/component.css'],
    providers: [LeveltestplanService]
})

export class LeveltestplanComponent implements OnInit {
    @Input() leveltestplans: Leveltestplan[];
    selectedLeveltestplan: Leveltestplan;
    testprocedureCount: Number;

    constructor(
        private router: Router,
        private service: LeveltestplanService) { }

    ngOnInit(): void {
        if (this.leveltestplans === undefined) {
            this.getLeveltestplans();
        }
    }

    getLeveltestplans(): void {
        this.service.getLeveltestplans().then(leveltestplans => this.leveltestplans = leveltestplans);
    }

    onSelect(leveltestplan: Leveltestplan): void {
        if (this.selectedLeveltestplan === leveltestplan) {
            this.selectedLeveltestplan = null;
            return;
        }


        this.selectedLeveltestplan = leveltestplan;
        if (leveltestplan.testProcedures)
            this.testprocedureCount = leveltestplan.testProcedures.length;
        else
            this.testprocedureCount = 0;
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }

        this.service.create(name)
            .then(leveltestplan => {
                this.leveltestplans.push(leveltestplan);
                this.selectedLeveltestplan = null;
            });
    }

    delete(leveltestplan: Leveltestplan): void {
        this.service
            .delete(leveltestplan.id)
            .then(() => {
                this.leveltestplans = this.leveltestplans.filter(m => m !== leveltestplan);
                if (this.selectedLeveltestplan === leveltestplan) { this.selectedLeveltestplan = null; }
            });
    }

    gotoDetail(): void {
        this.router.navigate(['/leveltestplans', this.selectedLeveltestplan.id]);
    }
}