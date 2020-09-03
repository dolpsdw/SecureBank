import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionsFilterState} from '../../ReusableViewComponents/transaction-list-view/transactions-filter-state';
import {TransactionsService} from '../../Services/transactions.service';
import {EMPTY, Subject} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {AuthenticationService} from '../../Services/authentication.service';

@Component({
  selector: 'app-transactions-smart',
  templateUrl: './transactions-smart.component.html',
  styleUrls: ['./transactions-smart.component.css']
})
export class TransactionsSmartComponent implements OnInit, OnDestroy {
  transactions = []; // Default transactions Value
  filterState: TransactionsFilterState = {dateSort: 'desc'}; // Default filterState Value
  private filterChange$ = new Subject<TransactionsFilterState>();

  constructor(private transactionsService: TransactionsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    // After User fire a filterChange in the ListView components
    this.filterChange$.pipe( // If a new Emission from filterChange
      switchMap(newFilter => // cancel previous active subscription to queryTransactions(httpClient) observable canceling HttpRequest
        this.transactionsService.queryTransactions(newFilter) // and subscribe to fire a new HttpRequest
          .pipe(catchError(err => EMPTY)) // catchError will complete so use it inside switchMap observable
      ), // If HttpErrors occur complete, and prevent the rest of observable chain to continue
      // tap(v => console.log('Use offline devtools AND check this console.log does not happen', v))
      tap(transactionsResponse => this.updateTransactionsListView(transactionsResponse.transactions, transactionsResponse.originalQuery) )
      // Update the viewList with the response models
    ).subscribe(); // onDestroy the observable complete and this stream is unsubscribed

    // if User is loggedIn do a first fetch with default filters
    if (this.authService.isLoggedIn()){
      this.transactionsService.queryTransactions(this.filterState).subscribe(
        transactionsResponse => this.updateTransactionsListView(transactionsResponse.transactions, transactionsResponse.originalQuery));
    }
  }

  ngOnDestroy(): void {
    this.filterChange$.complete(); // Unsubscribe everybody
  }

  onFilterChange(e): void {
    // We want to observe onFilterChange to be an observable instead of a flat function with data
    // so we can onFilterChange.switchMap(to httpClient) and cancel previous unfinished httpClient request, by unsubscribing
    this.filterChange$.next(e);
  }

  private updateTransactionsListView(newTransactions, newFilterState): void{
    this.transactions = newTransactions;
    this.filterState = newFilterState;
  }
}
