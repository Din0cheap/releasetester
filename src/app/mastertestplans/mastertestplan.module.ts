import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LeveltestplanModule } from "../leveltestplans/leveltestplan.module";

import { MastertestplanComponent } from "./mastertestplan/mastertestplan.component"
import { MastertestplanDetailComponent } from "./mastertestplan-detail/mastertestplan-detail.component";
import { MastertestplanSearchComponent } from "./mastertesplan-search/mastertestplan-search.component";
import { MastertestplanService } from "./shared/mastertestplan.service";
import { MastertestplanSearchService } from "./shared/mastertestplan-search.service";

const routes: Routes = [
    { path: '', redirectTo: '/mastertestplans', pathMatch: 'full' },
    { path: 'mastertestplans', component: MastertestplanComponent },
    { path: 'mastertestplans/:id', component: MastertestplanDetailComponent },
];



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        LeveltestplanModule
    ],
    declarations: [
        MastertestplanComponent,
        MastertestplanDetailComponent,
        MastertestplanSearchComponent,
    ],
    exports:[FormsModule,CommonModule],
    providers: [MastertestplanService, MastertestplanSearchService],
})

export class MastertestplanModule { }
