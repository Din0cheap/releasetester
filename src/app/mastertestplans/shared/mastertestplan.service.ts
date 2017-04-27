import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { Mastertestplan } from "./mastertestplan.model";

@Injectable()

export class MastertestplanService {
    private mastertestplanUrl = 'api/mastertestplans';

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }
    
    getMastertestplans(): Promise<Mastertestplan[]> {
        return this.http.get(this.mastertestplanUrl)
            .toPromise()
            .then(response => response.json().data as Mastertestplan[])
            .catch(this.handleError)
    }

    getMastertestplan(id: number): Promise<Mastertestplan> {
        const url = `${this.mastertestplanUrl}/${id}`
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Mastertestplan)
            .catch(this.handleError);
    }


    update(masterplan: Mastertestplan): Promise<Mastertestplan> {
        const url = `${this.mastertestplanUrl}/${masterplan.id}`;
        return this.http
            .put(url, JSON.stringify(masterplan), { headers: this.headers })
            .toPromise()
            .then(() => masterplan)
            .catch(this.handleError);
    }

    create(name: string): Promise<Mastertestplan> {
        return this.http
            .post(this.mastertestplanUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Mastertestplan)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.mastertestplanUrl}/${id}`;
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



