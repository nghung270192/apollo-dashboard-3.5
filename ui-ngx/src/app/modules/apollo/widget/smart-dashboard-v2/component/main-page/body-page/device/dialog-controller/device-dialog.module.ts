import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  BleSigmeshModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/ble-sigmesh.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';
import {
  ZigbeeModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/zigbee/zigbee.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    BleSigmeshModule,
    ToolbarSharedModule,
    ZigbeeModule
  ],
  exports: [
    BleSigmeshModule,
    ZigbeeModule
  ]
})
export class DeviceDialogModule {
}
