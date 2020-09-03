import { Injectable } from '@angular/core';
import {ApiService} from './API/api.service';
import {Observable} from 'rxjs';
import {TransactionsFilterState} from '../ReusableViewComponents/transaction-list-view/transactions-filter-state';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private api: ApiService) { }

  public queryTransactions(filter: TransactionsFilterState): Observable<any>{
    // This service can centralize CRUD operations of Transaction entity ? do sanitization, logging or handle non Protocol errors, Retrying
    return new Observable<any>( subscriber => {
      this.api.getTransactions(filter.dateSort, filter.text).subscribe(
        response => { // Response is HTTP OK and have the data.
          subscriber.next({transactions: response.map(r => ({...r, date: new Date(r.date)})), originalQuery: filter}); // Do some parsing
        },
        error => subscriber.error(error) // Response is HttpErrorResponse
      );
    });
  }
}
