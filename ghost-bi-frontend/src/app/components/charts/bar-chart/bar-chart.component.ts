import { SalesDataService } from './../../../services/sales-data.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpResponse } from '@angular/common/http';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65, 59, 80, 81, 56, 57, 30], label: 'Q3 Sales' },
  { data: [32, 78, 21, 65, 76, 98, 45], label: 'Q4 Sales' }
];

const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  orders: any;
  orderLabels: string[];
  orderData: number[];

  barChartData: any[];
  barChartLabels: string[];
  barChartType = 'bar';
  barChartLegend = true;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this.salesDataService.getOrders(1, 100)
      .subscribe(res => {
        const localChartData = this.getChartData(res as HttpResponse<any>);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Sales'}];
      });
  }

  getChartData(res: HttpResponse<any>) {
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.total);

    const formattedOrders = this.orders.reduce((r, e) => {
      r.push([moment(e.placed).format('YY-MM-DD'), e.total]);
      return r;
    }, []);

    const p = [];

    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;
  }

}
