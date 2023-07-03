import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';

import {
  MapViewComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/map-layout/map-view.component';
import {
  MapSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/map-layout/map-setting.component';
import {
  HubIconComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-icon.component";
import {
  HubLayoutComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-layout.component";
import {
  HubSettingComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-setting.component";
import {
  HubPageComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-page/hub-page.component";
import {
  ZigbeeTabComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-page/zigbee-tab.component";
import {
  BleSigMeshTabComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-page/ble-sig-mesh-tab.component";
import {
  ZigbeeUpdateDeviceComponent
} from "@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/Hub/hub-page/zigbee-update-device.component";


@NgModule({
  declarations: [HubIconComponent,
    HubLayoutComponent,
    HubSettingComponent,
    HubPageComponent,
    ZigbeeTabComponent,
    BleSigMeshTabComponent,
    ZigbeeUpdateDeviceComponent,
    HubIconComponent],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    HubIconComponent,
    HubLayoutComponent,
    HubSettingComponent,
    HubPageComponent,
    ZigbeeTabComponent,
    BleSigMeshTabComponent,
    ZigbeeUpdateDeviceComponent,
    HubIconComponent
  ]
})
export class HubLayoutModule {
}
