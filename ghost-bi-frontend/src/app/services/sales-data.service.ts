
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../shared/api.variables';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

  constructor(private http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this.http.get(API_URL + 'order/' + pageIndex + '/' + pageSize);
  }

  getOrdersByCustomer(n: number) {
    return this.http.get(API_URL + 'order/bycustomer/' + n);
  }

  getOrdersByState() {
    return this.http.get(API_URL + 'order/bystate/');
  }
}
