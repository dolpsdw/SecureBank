import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../Services/API/Models/transaction';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {
  @Input()
  transaction: Transaction;

  constructor() { }

  ngOnInit(): void {
  }

}
