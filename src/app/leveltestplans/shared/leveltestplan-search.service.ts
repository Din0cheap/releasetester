import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Leveltestplan } from "./leveltestplan.model";

@Injectable()

export class SearchService {
    constructor(private http: Http) { }

    search(term: string): Observable<Leveltestplan[]> {
        return this.http
            .get(`app/leveltestplans/?name=${term}`)
            .map(response => response.json().data as Leveltestplan[]);
    }
}

