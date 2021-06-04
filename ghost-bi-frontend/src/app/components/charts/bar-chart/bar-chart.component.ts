import { Component, OnInit } from '@angular/core';

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

  barChartData: any[] = SAMPLE_BARCHART_DATA;
  barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  barChartType = 'bar';
  barChartLegend = true;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
