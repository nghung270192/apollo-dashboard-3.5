import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParamsReportComponent} from './params-report.component';
 import {FlexModule} from '@angular/flex-layout';
import {ReportBoxModule} from '@modules/apollo/widget/lots-available-v1/shared/component/report-box/report-box.module';


@NgModule({
  declarations: [
    ParamsReportComponent
  ],
  imports: [
    CommonModule,
    ReportBoxModule,
    FlexModule
  ],
  exports: [ParamsReportComponent]
})
export class ParamsReportModule {
}
