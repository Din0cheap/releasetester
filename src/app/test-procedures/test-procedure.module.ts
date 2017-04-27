import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TestProcedureComponent } from "./test-procedure/test-procedure.component"
import { TestProcedureDetailComponent } from   "./test-procedure-detail/test-procedure-detail.component";
import { TestProcedureSearchComponent } from   "./test-procedure-search/test-procedure-search.component";
import { TestProcedureService } from           "./shared/test-procedure.service";
import { TestProcedureSearchService } from     "./shared/test-procedure-search.service";

const routes: Routes = [
    { path: 'testprocedures', component: TestProcedureComponent },
    { path: 'testprocedures/:id', component: TestProcedureDetailComponent },
];



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
    declarations: [
        TestProcedureComponent,
        TestProcedureDetailComponent,
        TestProcedureSearchComponent,
    ],
    exports:[FormsModule,CommonModule],
    providers: [TestProcedureService, TestProcedureSearchService],
})

export class TestProcedureModule { }
