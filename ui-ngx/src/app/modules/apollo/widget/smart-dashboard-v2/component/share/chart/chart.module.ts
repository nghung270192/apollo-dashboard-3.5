import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';
import { CircleChartComponent } from './circle-chart.component';



@NgModule({
  declarations: [
    BaseChartComponent,
    CircleChartComponent
  ],
  exports: [
    BaseChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartModule { }
