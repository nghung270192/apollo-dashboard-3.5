import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportBoxModule} from './report-box/report-box.module';
import {AreaReportBoxModule} from './area-report-box/area-report-box.module';
import {FloorReportDetailModule} from './floor-report-detail/floor-report-detail.module';
import {AreaReportDetailModule} from './area-report-detail/area-report-detail.module';
import {DialogModule} from '@modules/apollo/widget/lots-available-v1/shared/component/dialog/dialog.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportBoxModule,
    AreaReportBoxModule,
    FloorReportDetailModule,
    AreaReportDetailModule,
    DialogModule
  ],
  exports: [
    ReportBoxModule,
    AreaReportBoxModule,
    FloorReportDetailModule,
    AreaReportDetailModule,
    DialogModule
  ]
})
export class ComponentModule {
}
