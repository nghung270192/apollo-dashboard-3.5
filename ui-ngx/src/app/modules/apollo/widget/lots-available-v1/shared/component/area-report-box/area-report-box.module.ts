import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaReportBoxComponent} from './area-report-box.component';
import {SharedModule} from '@shared/shared.module';
import {
  ParamsReportModule
} from '@modules/apollo/widget/lots-available-v1/shared/component/params-report/params-report.module';
import {
  FloorReportBoxModule
} from '@modules/apollo/widget/lots-available-v1/shared/component/floor-report-box/floor-report-box.module';


@NgModule({
  declarations: [
    AreaReportBoxComponent
  ],
  exports: [
    AreaReportBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FloorReportBoxModule,
    ParamsReportModule
  ]
})
export class AreaReportBoxModule {
}
