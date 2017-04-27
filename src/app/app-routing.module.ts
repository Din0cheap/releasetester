import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MastertestplanModule  } from "./mastertestplans/mastertestplan.module";

/*
import { MastertestplanComponent } from "../components/mastertestplan/mastertestplan.component";
import { MastertestplanDetailComponent } from "../components/mastertestplan/mastertestplan-detail.component";
import { LeveltestplanComponent } from "../components/leveltestplan/leveltestplan.component";
import { LeveltestplanDetailComponent } from "../components/leveltestplan/leveltestplan-detail.component";
import { TestProcedureComponent } from "../components/test-procedure/test-procedure.component";
import { TestProcedureDetailComponent } from "../components/test-procedure/test-procedure-detail.component";
*/

const routes: Routes = [
  { path: '', redirectTo: '/mastertestplans', pathMatch: 'full' },
  { path: 'mastertestplans', component: MastertestplanModule },
  /*{ path: 'mastertestplans/:id', component: MastertestplanDetailComponent },
  { path: 'leveltestplans', component: LeveltestplanComponent },
  { path: 'leveltestplans/:id', component: LeveltestplanDetailComponent },
  { path: 'testprocedures', component: TestProcedureComponent },
  { path: 'testprocedures/:id', component: TestProcedureDetailComponent }*/
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
