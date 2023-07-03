import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';
import {
  AutomationLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/automation-layout/automation-layout.component';


@NgModule({
  declarations: [AutomationLayoutComponent],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    AutomationLayoutComponent
  ]
})
export class AutomationLayoutModule {
}
