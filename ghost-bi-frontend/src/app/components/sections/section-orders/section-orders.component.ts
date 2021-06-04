import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/orders';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.scss']
})
export class SectionOrdersComponent implements OnInit {

  orders: Order[] = [
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), fulfilled: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), fulfilled: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), fulfilled: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), fulfilled: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), fulfilled: new Date(2021, 6, 6)},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
