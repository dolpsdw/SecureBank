import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListViewComponent } from './transaction-list-view.component';
import {MatIconTestingModule} from '@angular/material/icon/testing';
import {MatButtonModule} from '@angular/material/button';
import {By} from '@angular/platform-browser';

describe('TransactionListViewComponent', () => {
  let component: TransactionListViewComponent;
  let fixture: ComponentFixture<TransactionListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconTestingModule],
      declarations: [ TransactionListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListViewComponent);
    component = fixture.componentInstance;
    component.transactions = [{
      id: 0,
      date: new Date('2020-09-03T10:33:33.000Z'),
      amount: 1,
      fee: -1,
      description: 'TestTransaction',
      userId: 1
    }];
    component.filterState = {text: 'testSearch', dateSort: 'desc'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message when there is no transactions to display', () => {
    // Arrange
    component.transactions = []; // Ensure no transactions to display
    fixture.detectChanges(); // Trigger update cycle
    const noResultHtml = fixture.debugElement.query(By.css('.transaction-list__no-result'));
    // Act
    // Assert
    expect(noResultHtml).not.toBeNull();
  });
});
