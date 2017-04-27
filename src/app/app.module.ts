import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';

//Import for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { MockDB } from "./mockDB/mockDB.service";

//import { AppRoutingModule } from "./app-routing.module";


import { MastertestplanModule } from "./mastertestplans/mastertestplan.module";
import { LeveltestplanModule } from "./leveltestplans/leveltestplan.module";
import { TestProcedureModule } from "./test-procedures/test-procedure.module";

/*import { LeveltestplanComponent } from './components/leveltestplan/leveltestplan.component';
import { LeveltestplanDetailComponent } from "./components/leveltestplan/leveltestplan-detail.component";
import { TestProcedureComponent } from './components/test-procedure/test-procedure.component';
import { TestProcedureDetailComponent } from "./components/test-procedure/test-procedure-detail.component";

import { TestProcedureSearchComponent } from "./components/search/test-procedure-search.component";
*/
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(MockDB),
    //AppRoutingModule,
    MastertestplanModule,
    LeveltestplanModule,
    TestProcedureModule
  ],
  declarations: [
    AppComponent,
    /*  LeveltestplanComponent,
      LeveltestplanDetailComponent,
      TestProcedureComponent,
      TestProcedureDetailComponent,
      TestProcedureSearchComponent,
      */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
