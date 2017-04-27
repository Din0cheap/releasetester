import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

//Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { MastertestplanSearchService } from "../shared/mastertestplan-search.service";
import { Mastertestplan } from "../shared/mastertestplan.model";

@Component({
    selector: 'mastertestplan-search',
    templateUrl: './mastertestplan-search.component.html',
    styleUrls: ['../../css/search.css'],
    providers: [MastertestplanSearchService]
})

export class MastertestplanSearchComponent implements OnInit {
    mastertestplans: Observable<Mastertestplan[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private searchService: MastertestplanSearchService,
        private router: Router) { }


    // Push a search term inte the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.mastertestplans = this.searchTerms
            .debounceTime(300)          // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()     // ignore if next search term is same as previous
            .switchMap(term => term    // switch to new observable each time the term changes
                // return the http search observable
                ? this.searchService.search(term)
                // or the observable of empty mastertestplans if there was no search term
                : Observable.of<Mastertestplan[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log("error: " + error);
                return Observable.of<Mastertestplan[]>([]);
            });
    }

    gotoDetail(mastertestplan: Mastertestplan): void {
        let link = ['/mastertestplans', mastertestplan.id];
        this.router.navigate(link);
    }
}
