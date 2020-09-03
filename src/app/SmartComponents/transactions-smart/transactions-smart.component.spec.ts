import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsSmartComponent } from './transactions-smart.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TransactionsService} from '../../Services/transactions.service';
import {AuthenticationService} from '../../Services/authentication.service';
import {EMPTY, Observable} from 'rxjs';
import {TransactionsFilterState} from '../../ReusableViewComponents/transaction-list-view/transactions-filter-state';

describe('TransactionsSmartComponent', () => {
  let component: TransactionsSmartComponent;
  let fixture: ComponentFixture<TransactionsSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsSmartComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: AuthenticationService, useValue: {isLoggedIn: () => true } }, // ngOnInit we need the stub there for be loggedIn
        {provide: TransactionsService, useValue: { // We can use also spyObj https://stackoverflow.com/questions/50272195/spyon-calling-actual-implementation-of-method
          queryTransactions: jasmine.createSpy<(filter: TransactionsFilterState) => Observable<any> >('queryTransactionSpy',
            (filter: TransactionsFilterState) => EMPTY).and.callThrough() // default to the Stub so can be subscribed
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transactions sorted desc by default', () => {
    // Arrange
    const transactionsServiceStub = TestBed.inject(TransactionsService); // Get the spy router instance
    // const test = spyOn(transactionsServiceStub, 'queryTransactions');
    // Act
    // Assert
    expect(component.filterState.dateSort).toBe('desc');
    expect(transactionsServiceStub.queryTransactions).toHaveBeenCalledWith({dateSort: 'desc'});
  });

  it('should request transactions shorted by asc when user sort by date asc', () => {
    // Arrange
    const transactionsServiceStub = TestBed.inject(TransactionsService); // Get the spy router instance
    // Act
    expect(transactionsServiceStub.queryTransactions).not.toHaveBeenCalledWith({dateSort: 'asc'});
    component.onFilterChange({dateSort: 'asc'});
    // Assert
    expect(transactionsServiceStub.queryTransactions).toHaveBeenCalledWith({dateSort: 'asc'});
  });

  it('should request transactions filtered by description when user filter by text', () => {
    // Arrange
    const transactionsServiceStub = TestBed.inject(TransactionsService); // Get the spy router instance
    // Act
    expect(transactionsServiceStub.queryTransactions).not.toHaveBeenCalledWith({text: 'test', dateSort: 'desc'});
    component.onFilterChange({text: 'test', dateSort: 'desc'});
    // Assert
    expect(transactionsServiceStub.queryTransactions).toHaveBeenCalledWith({text: 'test', dateSort: 'desc'});
  });
});
