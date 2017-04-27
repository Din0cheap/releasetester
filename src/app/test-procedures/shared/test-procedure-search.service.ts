import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { TestProcedure } from "./test-procedure.model";

@Injectable()

export class TestProcedureSearchService {
    constructor(private http: Http) { }

    search(term: string): Observable<TestProcedure[]> {
        console.log("testproc");
        return this.http
            .get(`app/testprocedures/?name=${term}`)
            .map(response => response.json().data as TestProcedure[]);
    }
}

