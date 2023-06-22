import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  EnergySensorManagementComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
    ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';
import {ChartModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/chart/chart.module';


@NgModule({
  declarations: [EnergySensorManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    ToolbarSharedModule,
    ChartModule
  ],
  exports: [EnergySensorManagementComponent]
})
export class EnergySensorManagementModule {
}
