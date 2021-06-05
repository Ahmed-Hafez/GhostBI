import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { Order } from 'src/app/shared/orders';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.scss']
})
export class SectionOrdersComponent implements OnInit {

  orders: Order[] = [
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), completed: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), completed: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), completed: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), completed: new Date(2021, 6, 6)},
    { id: 1, customer: {id: 1, name: 'Main St Bakery', state: 'CO', email: 'example@example.com'}, total: 230, placed: new Date(2021, 6, 5), completed: new Date(2021, 6, 6)},
  ];

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  constructor(private salesData: SalesDataService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.salesData.getOrders(this.page, this.limit)
      .subscribe(res => {
        console.log('Result from getOrders: ', res);
        this.orders = res['page']['data'];
        this.total = res['page'].total;
        this.loading = false;
      });
  }

  goToPrevious(): void {
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }

}
