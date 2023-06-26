import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {BodyPageComponent} from './main-page/body-page/body-page.component';
import {
  ApolloNodeTreeCreateOrUpdateComponent
} from './share/apollo-node-tree/apollo-node-tree-create-or-update.component';
import {AreaLayoutComponent} from './main-page/body-page/area-layout/area-layout.component';
import {GatewayLayoutComponent} from './main-page/body-page/gateway/gateway-layout.component';
import {GatewaySettingComponent} from './main-page/body-page/gateway/gateway-setting.component';
import {
  ApolloGatewayAdditionalInforComponent
} from './main-page/body-page/gateway/apollo-gateway-additional-infor.component';
import {HubLayoutComponent} from './main-page/body-page/Hub/hub-layout.component';
import {HubSettingComponent} from './main-page/body-page/Hub/hub-setting.component';
import {BlePageComponent} from './main-page/body-page/gateway/ble-page/ble-page.component';
import {DeviceCreateOrUpdateComponent} from './share/device/device-create-or-update.component';
import {CreateBleDeviceFromApolloComponent} from './share/device/create-ble-device-from-apollo.component';
import {HubPageComponent} from './main-page/body-page/Hub/hub-page/hub-page.component';
import {ZigbeeTabComponent} from './main-page/body-page/Hub/hub-page/zigbee-tab.component';
import {BleSigMeshTabComponent} from './main-page/body-page/Hub/hub-page/ble-sig-mesh-tab.component';
import {ZigbeeUpdateDeviceComponent} from './main-page/body-page/Hub/hub-page/zigbee-update-device.component';
import {AreaSettingComponent} from './main-page/body-page/area-layout/area-setting.component';
import {MapViewComponent} from './main-page/body-page/map-layout/map-view.component';
import {SceneLayoutComponent} from './main-page/body-page/scene-layout/scene-layout.component';
import {IconSceneEntityComponent} from './main-page/body-page/scene-layout/icon-scene-entity.component';
import {CreateZbDeviceFromApolloComponent} from './share/device/create-zb-device-from-apollo.component';
import {
  ZigbeeControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/zigbee-controller.component';
import {AutomationLayoutComponent} from './main-page/body-page/automation-layout/automation-layout.component';
import {SchedulerLayoutComponent} from './main-page/body-page/scheduler-layout/scheduler-layout.component';
import {DqsmartSettingComponent} from './main-page/body-page/gateway/setting/dqsmart-setting.component';
import {PelabSettingComponent} from './main-page/body-page/gateway/setting/pelab-setting.component';
import {DqsmartPageComponent} from './main-page/body-page/gateway/dqsmart-page/dqsmart-page.component';
import {CreateDqsmartDeviceComponent} from './share/device/create-dqsmart-device.component';
import {IconGroupEntityComponent} from './main-page/body-page/group-layout/icon-group-entity.component';
import {GroupLayoutComponent} from './main-page/body-page/group-layout/group-layout.component';
import {BleGroupControllerComponent} from './main-page/body-page/group-layout/dialog/ble-group-controller.component';
import {NotificationComponent} from './share/notification.component';
import {HubIconComponent} from './main-page/body-page/Hub/hub-icon.component';
import {GatewayIconComponent} from './main-page/body-page/gateway/gateway-icon.component';
import {AreasIconComponent} from './main-page/body-page/area-layout/areas-icon.component';
import {WidgetSettingComponent} from './main-page/widget-setting.component';
import {MapSettingComponent} from './main-page/body-page/map-layout/map-setting.component';
import {
  CoverDialogControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/cover-dialog-controller.component';
import {PelabPageComponent} from './main-page/body-page/gateway/pelab-page/pelab-page.component';
import {CreatePelabDeviceComponent} from './share/device/create-pelab-device.component';
import {
  PelabGroupControllerComponent
} from './main-page/body-page/group-layout/dialog/pelab-group-controller.component';
import {ApolloNodeTreeCreateV2} from './share/apollo-node-tree/add-entity-dialog.component';
import {SmartDashboarShareModule} from './share/smart-dashboard-shared.module';
import {MainModule} from './main-page/main.module';
import {InputModule} from './share/input/input.module';
import {
  AnalyzeLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/analyze-layout/analyze-layout.module';
import {
  BleGroupSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/ble-group-setting.component';
import {
  SettingGroupFromApolloComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/setting-group-from-apollo.component';
import {MenuModule} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/menu/menu.module';
import {
  DeviceLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/device-layout.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';
import {
    EnergyLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-layout.module';


@NgModule({
  declarations: [
    MainPageComponent,
    BodyPageComponent,
    ApolloNodeTreeCreateOrUpdateComponent,
    AreaLayoutComponent,
    GatewayLayoutComponent,
    GatewaySettingComponent,
    ApolloGatewayAdditionalInforComponent,
    HubLayoutComponent,
    HubSettingComponent,
    BlePageComponent,
    DeviceCreateOrUpdateComponent,
    CreateBleDeviceFromApolloComponent,
    CreateZbDeviceFromApolloComponent,
    HubPageComponent,
    ZigbeeTabComponent,
    BleSigMeshTabComponent,
    ZigbeeUpdateDeviceComponent,
    AreaSettingComponent,
    MapViewComponent,
    SceneLayoutComponent,
    IconSceneEntityComponent,
    ZigbeeControllerComponent,
    AutomationLayoutComponent,
    SchedulerLayoutComponent,
    DqsmartSettingComponent,
    PelabSettingComponent,
    DqsmartPageComponent,
    CreateDqsmartDeviceComponent,
    CreatePelabDeviceComponent,
    IconGroupEntityComponent,
    GroupLayoutComponent,
    BleGroupControllerComponent,
    NotificationComponent,
    HubIconComponent,
    GatewayIconComponent,
    AreasIconComponent,
    WidgetSettingComponent,
    MapSettingComponent,
    CoverDialogControllerComponent,
    PelabPageComponent,
    PelabGroupControllerComponent,
    ApolloNodeTreeCreateV2,
    BleGroupSettingComponent,
    SettingGroupFromApolloComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ApolloShareModule,
        SmartDashboarShareModule,
        MainModule,
        InputModule,
        AnalyzeLayoutModule,
        MenuModule,
        DeviceLayoutModule,
        ToolbarSharedModule,
        EnergyLayoutModule

    ],
  exports: [
    MainPageComponent,
  ]
})
export class ComponentModule {
}
