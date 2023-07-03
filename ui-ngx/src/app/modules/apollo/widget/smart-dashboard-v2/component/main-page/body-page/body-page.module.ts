import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  DeviceLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/device-layout.module';

import {SharedModule} from '@shared/shared.module';
import {
  SchedulerLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/scheduler-layout/scheduler-layout.module';
import {
  BodyPageComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/body-page.component';
import {
  AnalyzeLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/analyze-layout/analyze-layout.module';
import {
  AreasLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/area-layout/areas-layout.module';
import {
  EnergyLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-layout.module';
import {
  SceneLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/scene-layout/scene-layout.module';
import {
  MapLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/map-layout/map-layout.module';
import {
  HubLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-layout.module';
import {
  GroupLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/group-layout.module';
import {
  GatewayLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/gateway-layout.module';
import {
  AutomationLayoutModule
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/automation-layout/automation-layout.module";


@NgModule({
  declarations: [BodyPageComponent],
  exports: [BodyPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeviceLayoutModule,
    SchedulerLayoutModule,
    AnalyzeLayoutModule,
    AreasLayoutModule,
    EnergyLayoutModule,
    SceneLayoutModule,
    MapLayoutModule,
    HubLayoutModule,
    GroupLayoutModule,
    GatewayLayoutModule,
    AutomationLayoutModule
  ]
})
export class BodyPageModule {
}
