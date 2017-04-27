import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Mastertestplan } from "./mastertestplan.model";

@Injectable()

export class MastertestplanSearchService {
    constructor(private http: Http) { }

    search(term: string): Observable<Mastertestplan[]> {
        return this.http
            .get(`app/mastertestplans/?name=${term}`)
            .map(response => response.json().data as Mastertestplan[]);
    }

}


