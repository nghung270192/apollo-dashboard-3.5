import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';

import {
  AreasIconComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/area-layout/areas-icon.component';
import {
  AreaLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/area-layout/area-layout.component';
import {
  AreaSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/area-layout/area-setting.component';


@NgModule({
  declarations: [AreasIconComponent, AreaLayoutComponent,
    AreaSettingComponent,],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    AreasIconComponent, AreaLayoutComponent,
    AreaSettingComponent,
  ]
})
export class AreasLayoutModule {
}
