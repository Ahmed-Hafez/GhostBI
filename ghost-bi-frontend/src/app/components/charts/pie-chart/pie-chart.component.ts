import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  pieChartData: number[] = [350, 450, 120];
  pieChartLabels: string[] = ['Logistics', 'Main St Bakery', 'Acme Hosting'];
  pieChartType: string = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: ['#26547c', '#ff6b6b', "#ffd166"],
      borderColor: 'transparent'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
