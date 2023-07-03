import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  ApolloNodeTreeCreateOrUpdateComponent
} from './share/apollo-node-tree/apollo-node-tree-create-or-update.component';

import {DeviceCreateOrUpdateComponent} from './share/device/device-create-or-update.component';
import {CreateBleDeviceFromApolloComponent} from './share/device/create-ble-device-from-apollo.component';
import {CreateZbDeviceFromApolloComponent} from './share/device/create-zb-device-from-apollo.component';
import {
  ZigbeeControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/zigbee-controller.component';

import {CreateDqsmartDeviceComponent} from './share/device/create-dqsmart-device.component';
import {NotificationComponent} from './share/notification.component';
 import {
  CoverDialogControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/cover-dialog-controller.component';
import {CreatePelabDeviceComponent} from './share/device/create-pelab-device.component';

import {ApolloNodeTreeCreateV2} from './share/apollo-node-tree/add-entity-dialog.component';
import {ComponentShared} from './share/smart-dashboard-shared.module';
import {MainModule} from './main-page/main.module';
import {InputModule} from './share/input/input.module';

import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';

@NgModule({
  declarations: [
    ApolloNodeTreeCreateOrUpdateComponent,
    DeviceCreateOrUpdateComponent,
    CreateBleDeviceFromApolloComponent,
    CreateZbDeviceFromApolloComponent,
    ZigbeeControllerComponent,
    CreateDqsmartDeviceComponent,
    CreatePelabDeviceComponent,
    NotificationComponent,
    CoverDialogControllerComponent,
    ApolloNodeTreeCreateV2,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    ComponentShared,
    MainModule,
    InputModule,
    ToolbarSharedModule

  ],
  exports: [MainModule]
})
export class ComponentModule {
}
