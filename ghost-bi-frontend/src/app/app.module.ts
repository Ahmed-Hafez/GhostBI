import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SectionHealthComponent } from './components/sections/section-health/section-health.component';
import { SectionOrdersComponent } from './components/sections/section-orders/section-orders.component';
import { SectionSalesComponent } from './components/sections/section-sales/section-sales.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ServerComponent } from './components/server/server.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideBarComponent,
    SectionHealthComponent,
    SectionOrdersComponent,
    SectionSalesComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ServerComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
