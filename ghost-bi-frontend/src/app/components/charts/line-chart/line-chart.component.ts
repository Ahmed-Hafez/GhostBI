import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { LINE_CHART_COLORS } from '../../../shared/chart.colors';
import * as moment from 'moment';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
  { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
  { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'},
];
const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  topCustomers: string[];
  allOrders: any[];

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true
  };

  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit() {
    this.salesDataService.getOrders(1, 100).subscribe(res => {
      this.allOrders = res['page']['data'];

      this.salesDataService.getOrdersByCustomer(3).subscribe(cus => {
        this.topCustomers = (cus as any).map(x => x['name']);

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData.map(x => x['data']).reduce((a, i) => {
          a.push(i.map(o => new Date(o[0])));
          return a;
        }, []);

        dates = [].concat.apply([], dates);

        const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
        console.log('r:', r);

        this.lineChartLabels = r[0]['orders'].map(o => o['date']);

        this.lineChartData = [
          { 'data': r[0].orders.map(x => x.total), 'label': r[0]['customer']},
          { 'data': r[1].orders.map(x => x.total), 'label': r[1]['customer']},
          { 'data': r[2].orders.map(x => x.total), 'label': r[2]['customer']}
        ];

      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(o => o.customer.name === name);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    const result = { customer: name, data: formattedOrders };

    return result;
  }

  getCustomerOrdersByDate(orders: any, dates: any) {
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();

    // define our result object to return:
    const result = {};
    const dataSets = result['data'] = [];

    customers.reduce((x, y, i) => {
      const customerOrders = [];
      dataSets[i] = {
        customer: y, orders:
        u.reduce((r, e, j) => {
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
          customerOrders.push(obj);
          return customerOrders;
        })
      };
      return x;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }

}
