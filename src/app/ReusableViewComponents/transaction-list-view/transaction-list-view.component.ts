import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Transaction} from '../../Services/API/Models/transaction';
import {TransactionsFilterState} from './transactions-filter-state';
import {fromEvent, Observable, Subject, merge} from 'rxjs';
import {buffer, debounceTime, distinctUntilChanged, filter, map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.css']
})
export class TransactionListViewComponent implements OnInit, AfterViewInit, OnDestroy{
  // Public do not mutate objects
  @Input()
  transactions: Transaction[];
  @Input()
  filterState: TransactionsFilterState;
  @Output()
  changeFilterState$: EventEmitter<TransactionsFilterState> = new EventEmitter<TransactionsFilterState>();
  // Internal
  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('sortByDateSwap') sortByDateSwap: any;
  private inputSearch$: Observable<any>;
  private inputSearchFiltered$: Observable<any>;
  private clickSortByDateSwap$: Observable<any>;
  private clickSortByDateSwapFiltered$: Observable<any>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Stream Definition
    this.inputSearch$ = fromEvent(this.searchBox.nativeElement, 'input');
    this.inputSearchFiltered$ = this.inputSearch$.pipe(
      debounceTime(200), // Emit after 200ms of stability
      map(e => this.searchBox.nativeElement.value ), // Change the data Flowing to the input value (dont use mapTo)
      distinctUntilChanged(), // Filter same value
      map(text => ({text})) // emit {text: textValue} as PartialTransactionsFilterState
      // tap(text => this.changeFilterState$.emit({...this.filterState, text})) // Fire changeFilter with updated state
    ); // After the changeFilterState$ emission a Re-Render cycle is triggered by the new upDated Input values (transactions & filterState)
    // Material button have the elementRef a bit hidden
    this.clickSortByDateSwap$ = fromEvent(this.sortByDateSwap._elementRef.nativeElement, 'click');
    this.clickSortByDateSwapFiltered$ = this.clickSortByDateSwap$.pipe(
      buffer(this.clickSortByDateSwap$.pipe(debounceTime(200))), // Emits an array of ClickEvents after the debounceTime
      map(clickEventArray => clickEventArray.length), // Take the number of clicks
      filter(nClicks => (nClicks % 2) === 1), // clickSortByDateSwapFiltered$ will only emit on Odd clicks
      map(c => ({dateSort: this.filterState.dateSort === 'desc' ? 'asc' : 'desc'}) ), // return the new value to be used (dont use mapTo)
      // tap(dateSort => this.changeFilterState$.emit({...this.filterState, dateSort})) // Fire changeFilter with updated state
    ); // After the changeFilterState$ emission a Re-Render cycle is triggered by the new upDated Input values (transactions & filterState)
    // Activate the lazy observers
    merge(this.inputSearchFiltered$, this.clickSortByDateSwapFiltered$).pipe(
      // tap(partial => console.log(partial)),
      tap(updatedPartialTransactionsFilter => this.changeFilterState$.emit({...this.filterState, ...updatedPartialTransactionsFilter})),
      takeUntil(this.unsubscribe$) // Unsubscribe on destroy
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleClear(): void {
    this.searchBox.nativeElement.value = '';
    this.searchBox.nativeElement.dispatchEvent(new Event('input'));
  }
}
