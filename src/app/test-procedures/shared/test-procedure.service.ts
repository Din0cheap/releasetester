import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { TestProcedure } from "./test-procedure.model";

@Injectable()

export class TestProcedureService {
    private testprocedureUrl = 'api/testprocedures';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getTestProcedures(): Promise<TestProcedure[]> {
        return this.http.get(this.testprocedureUrl)
            .toPromise()
            .then(response => response.json().data as TestProcedure[])
            .catch(this.handleError)
    }

    getTestProcedure(id: number): Promise<TestProcedure> {
        const url = `${this.testprocedureUrl}/${id}`
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as TestProcedure)
            .catch(this.handleError);
    }

    update(testprocedure: TestProcedure): Promise<TestProcedure> {
        const url = `${this.testprocedureUrl}/${testprocedure.id}`;
        return this.http
            .put(url, JSON.stringify(testprocedure), { headers: this.headers })
            .toPromise()
            .then(() => testprocedure)
            .catch(this.handleError);
    }

    create(name: string): Promise<TestProcedure> {
        return this.http
            .post(this.testprocedureUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as TestProcedure)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.testprocedureUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('an error occured', error);
        return Promise.reject(error.message || error);
    }
}



