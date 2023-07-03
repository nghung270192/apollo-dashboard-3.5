import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';
import {
  DqsmartSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/setting/dqsmart-setting.component';
import {
  GatewayIconComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/gateway-icon.component';
import {
  PelabPageComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/pelab-page/pelab-page.component';
import {
  PelabSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/setting/pelab-setting.component';
import {
  DqsmartPageComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/dqsmart-page/dqsmart-page.component';
import {
  GatewayLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/gateway-layout.component';
import {
  GatewaySettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/gateway-setting.component';
import {
  ApolloGatewayAdditionalInforComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/apollo-gateway-additional-infor.component';
import {
  BlePageComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/ble-page/ble-page.component';


@NgModule({
  declarations: [
    DqsmartSettingComponent,
    GatewayIconComponent,
    PelabPageComponent,
    PelabSettingComponent,
    DqsmartPageComponent,
    GatewayLayoutComponent,
    GatewaySettingComponent,
    ApolloGatewayAdditionalInforComponent,
    BlePageComponent,],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    DqsmartSettingComponent,
    GatewayIconComponent,
    PelabPageComponent,
    PelabSettingComponent,
    DqsmartPageComponent,
    GatewayLayoutComponent,
    GatewaySettingComponent,
    ApolloGatewayAdditionalInforComponent,
    BlePageComponent,]
})
export class GatewayLayoutModule {
}
