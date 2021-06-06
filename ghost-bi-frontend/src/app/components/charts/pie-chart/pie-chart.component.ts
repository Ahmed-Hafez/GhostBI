import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from 'src/app/shared/theme.colors';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() inputData: any;
  @Input() limit: number;

  pieChartData: number[];
  pieChartLabels: string[];
  pieChartType: string = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: 'transparent'
    }
  ];

  ngOnInit() {
    this.parseChartData(this.inputData, this.limit);
  }
  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
    console.log(allData);
    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;

    return c;
  }

}
