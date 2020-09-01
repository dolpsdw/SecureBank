import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListViewComponent } from './transaction-list-view.component';
import {MatIconTestingModule} from '@angular/material/icon/testing';
import {MatButtonModule} from '@angular/material/button';

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
    component.transactions = [];
    component.filterState = {text: 'testSearch', dateSort: 'desc'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
