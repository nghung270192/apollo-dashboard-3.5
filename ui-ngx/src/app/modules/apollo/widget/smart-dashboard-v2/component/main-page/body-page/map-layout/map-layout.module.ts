import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';

import {
  MapViewComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/map-layout/map-view.component';
import {
  MapSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/map-layout/map-setting.component';


@NgModule({
  declarations: [
    MapViewComponent,
    MapSettingComponent,],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    MapViewComponent,
    MapSettingComponent,
  ]
})
export class MapLayoutModule {
}
