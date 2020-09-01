import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css']
})
export class PublicPageComponent implements OnInit {
  t = {
    "id": 4734,
    "date": new Date("2018-07-11T22:49:24.000Z"),
    "amount": -193.38,
    "fee": -3.18,
    "description": "Lorem ipsum dolor sit amet",
    "userId": 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
