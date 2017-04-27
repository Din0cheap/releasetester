import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { MastertestplanService } from "../shared/mastertestplan.service";
import { Mastertestplan } from "../shared/mastertestplan.model";

@Component({
    selector: 'mastertestplan',
    templateUrl: './mastertestplan.component.html',
    styleUrls: ['../../css/component.css'],
    providers: [MastertestplanService]
})

export class MastertestplanComponent implements OnInit {
    @Input() mastertestplans: Mastertestplan[];
    selectedMastertestplan: Mastertestplan;
    testplanCount: number;

    constructor(
        private router: Router,
        private service: MastertestplanService) { }

    ngOnInit(): void {
        if (this.mastertestplans === undefined) {
            this.getMastertestplans();
        }
    }

    getMastertestplans(): void {
        this.service.getMastertestplans().then(mastertestplans => this.mastertestplans = mastertestplans);
    }

    onSelect(mastertestplan: Mastertestplan): void {
        if (this.selectedMastertestplan === mastertestplan) {
            this.selectedMastertestplan = null;
            return;
        }

        this.selectedMastertestplan = mastertestplan;
        if (mastertestplan.leveltestplans)
            this.testplanCount = mastertestplan.leveltestplans.length;
        else
            this.testplanCount = 0;
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }

        this.service.create(name)
            .then(mastertestplan => {
                this.mastertestplans.push(mastertestplan);
                this.selectedMastertestplan = null;
            });
    }

    delete(mastertestplan: Mastertestplan): void {
        this.service
            .delete(mastertestplan.id)
            .then(() => {
                this.mastertestplans = this.mastertestplans.filter(m => m !== mastertestplan);
                if (this.selectedMastertestplan === mastertestplan) { this.selectedMastertestplan = null; }
            });
    }

    gotoDetail(): void {
        this.router.navigate(['/mastertestplans', this.selectedMastertestplan.id]);
    }

}