import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';



@NgModule({
  declarations: [
    BaseChartComponent
  ],
  exports: [
    BaseChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartModule { }
