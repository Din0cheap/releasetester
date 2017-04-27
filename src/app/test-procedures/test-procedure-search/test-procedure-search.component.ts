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

import { TestProcedureSearchService } from "../shared/test-procedure-search.service";
import {  TestProcedure } from "../shared/test-procedure.model";

@Component({
    selector: 'test-procedure-search',
    templateUrl: './test-procedure-search.component.html',
    styleUrls: ['../../css/search.css'],
    providers: [TestProcedureSearchService]
})

export class TestProcedureSearchComponent implements OnInit {
    testProcedures: Observable<TestProcedure[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private searchService: TestProcedureSearchService,
        private router: Router) { }


    // Push a search term inte the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.testProcedures = this.searchTerms
            .debounceTime(300)          // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()     // ignore if next search term is same as previous
            .switchMap(term => term    // switch to new observable each time the term changes
                // return the http search observable
                ? this.searchService.search(term)
                // or the observable of empty mastertestplans if there was no search term
                : Observable.of<TestProcedure[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log("error: "+error);
                return Observable.of<TestProcedure[]>([]);
            });
    }

    gotoDetail(testprocedure: TestProcedure): void {
        let link = ['/testprocedures', testprocedure.id];
        this.router.navigate(link);
    }
}
