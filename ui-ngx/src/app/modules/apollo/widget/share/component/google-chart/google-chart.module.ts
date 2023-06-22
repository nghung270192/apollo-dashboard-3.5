import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleChartComponent} from './google-chart.component';
import {GoogleChartsModule} from 'angular-google-charts';


@NgModule({
  declarations: [
    GoogleChartComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule
  ],
  exports: [
    GoogleChartComponent
  ]
})
export class GoogleChartModule {
}
