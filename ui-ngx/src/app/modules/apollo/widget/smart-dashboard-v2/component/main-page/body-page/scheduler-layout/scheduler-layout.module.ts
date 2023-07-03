import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  SchedulerLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/scheduler-layout/scheduler-layout.component';
import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';


@NgModule({
  declarations: [SchedulerLayoutComponent],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    SchedulerLayoutComponent
  ]
})
export class SchedulerLayoutModule {
}
