import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SectionHealthComponent } from './components/section-health/section-health.component';
import { SectionOrdersComponent } from './components/section-orders/section-orders.component';
import { SectionSalesComponent } from './components/section-sales/section-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideBarComponent,
    SectionHealthComponent,
    SectionOrdersComponent,
    SectionSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
