import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloorReportBoxComponent} from './floor-report-box.component';
import {SharedModule} from '@shared/shared.module';
import {
  ParamsReportModule
} from '@modules/apollo/widget/lots-available-v1/shared/component/params-report/params-report.module';

@NgModule({
  declarations: [
    FloorReportBoxComponent
  ],
  exports: [
    FloorReportBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ParamsReportModule,
  ]
})
export class FloorReportBoxModule {
}
