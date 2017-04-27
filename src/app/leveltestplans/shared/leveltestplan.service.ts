import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { Leveltestplan } from "./leveltestplan.model";

@Injectable()

export class LeveltestplanService {
    private leveltestplanUrl = 'api/leveltestplans';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

   

    getLeveltestplans(): Promise<Leveltestplan[]> {
        return this.http.get(this.leveltestplanUrl)
            .toPromise()
            .then(response => response.json().data as Leveltestplan[])
            .catch(this.handleError)
    }

    getLeveltestplan(id: number): Promise<Leveltestplan> {
        const url = `${this.leveltestplanUrl}/${id}`
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Leveltestplan)
            .catch(this.handleError);
    }

    update(leveltestplan: Leveltestplan): Promise<Leveltestplan> {
        const url = `${this.leveltestplanUrl}/${leveltestplan.id}`;
        return this.http
            .put(url, JSON.stringify(leveltestplan), { headers: this.headers })
            .toPromise()
            .then(() => leveltestplan)
            .catch(this.handleError);
    }

    create(name: string): Promise<Leveltestplan> {
        return this.http
            .post(this.leveltestplanUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Leveltestplan)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.leveltestplanUrl}/${id}`;
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



