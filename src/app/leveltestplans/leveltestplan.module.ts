import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TestProcedureModule } from "../test-procedures/test-procedure.module";

import { LeveltestplanComponent } from "./leveltestplan/leveltestplan.component"
import { LeveltestplanDetailComponent } from "./leveltestplan-detail/leveltestplan-detail.component";
import { LeveltestplanSearchComponent } from "./leveltestplan-search/leveltestplan-search.component";
import { LeveltestplanService } from "./shared/leveltestplan.service";
import { SearchService } from "./shared/leveltestplan-search.service";

const routes: Routes = [
    { path: '', redirectTo: '/leveltestplans', pathMatch: 'full' },
    { path: 'leveltestplans', component: LeveltestplanComponent },
    { path: 'leveltestplans/:id', component: LeveltestplanDetailComponent },
];



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        TestProcedureModule
    ],
    declarations: [
        LeveltestplanComponent,
        LeveltestplanDetailComponent,
        LeveltestplanSearchComponent,
    ],
    exports:[FormsModule,CommonModule],
    providers: [LeveltestplanService, SearchService],
})

export class LeveltestplanModule { }
