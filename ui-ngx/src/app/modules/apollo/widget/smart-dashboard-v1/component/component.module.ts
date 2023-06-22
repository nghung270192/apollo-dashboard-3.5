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
import {DeviceSettingComponent} from './main-page/body-page/device/device-setting.component';
import {DeviceLayoutComponent} from './main-page/body-page/device/device-layout.component';
import {SlideButtonComponent} from './main-page/body-page/device/slide-button.component';
import {IconEntityComponent} from './main-page/body-page/device/icon-entity.component';
import {BlePageComponent} from './main-page/body-page/gateway/ble-page/ble-page.component';
import {DeviceCreateOrUpdateComponent} from './share/device/device-create-or-update.component';
import {CreateBleDeviceFromApolloComponent} from './share/device/create-ble-device-from-apollo.component';
import {LightControllerComponent} from './main-page/body-page/device/dialog/light-controller.component';
import {HubPageComponent} from './main-page/body-page/Hub/hub-page/hub-page.component';
import {ZigbeeTabComponent} from './main-page/body-page/Hub/hub-page/zigbee-tab.component';
import {BleSigMeshTabComponent} from './main-page/body-page/Hub/hub-page/ble-sig-mesh-tab.component';
import {RadarSensorComponent} from './main-page/body-page/device/dialog/radar-sensor.component';
import {ZigbeeUpdateDeviceComponent} from './main-page/body-page/Hub/hub-page/zigbee-update-device.component';
import {AreaSettingComponent} from './main-page/body-page/area-layout/area-setting.component';
import {MapViewComponent} from './main-page/body-page/map-layout/map-view.component';
import {SceneLayoutComponent} from './main-page/body-page/scene-layout/scene-layout.component';
import {IconSceneEntityComponent} from './main-page/body-page/scene-layout/icon-scene-entity.component';
import {SceneCreateOrUpdateComponent} from './share/scene/scene-create-or-update.component';
import {CreateSceneFromApolloComponent} from './share/scene/create-scene-from-apollo.component';
import {CreateZbDeviceFromApolloComponent} from './share/device/create-zb-device-from-apollo.component';
import {ZigbeeControllerComponent} from './main-page/body-page/device/dialog/zigbee-controller.component';
import {AutomationLayoutComponent} from './main-page/body-page/automation-layout/automation-layout.component';
import {RenderAutomationNodeTreeComponent} from './share/automation/render-automation-node-tree.component';
import {AutomationCreateOrUpdateComponent} from './share/automation/automation-create-or-update.component';
import {LoadZbDevFromHubComponent} from './share/common/load-zb-dev-from-hub.component';
import {ZbEndpointSelectComponent} from './share/automation/input/zb-endpoint-select.component';
import {AutoTypeControlSelectionComponent} from './share/automation/input/auto-type-control-selection.component';
import {SchedulerLayoutComponent} from './main-page/body-page/scheduler-layout/scheduler-layout.component';
import {SchedulerInputComponent} from './share/automation/scheduler-input.component';
import {DqsmartSettingComponent} from './main-page/body-page/gateway/setting/dqsmart-setting.component';
import {PelabSettingComponent} from './main-page/body-page/gateway/setting/pelab-setting.component';
import {DqsmartPageComponent} from './main-page/body-page/gateway/dqsmart-page/dqsmart-page.component';
import {CreateDqsmartDeviceComponent} from './share/device/create-dqsmart-device.component';
import {CreateSceneFromDqsmartComponent} from './share/scene/create-scene-from-dqsmart.component';
import {IconGroupEntityComponent} from './main-page/body-page/group-layout/icon-group-entity.component';
import {GroupLayoutComponent} from './main-page/body-page/group-layout/group-layout.component';
import {CreateGroupFromApolloComponent} from './share/group/create-group-from-apollo.component';
import {CreateGroupFromDqsmartComponent} from './share/group/create-group-from-dqsmart.component';
import {GroupCreateOrUpdateComponent} from './share/group/group-create-or-update.component';
import {BleGroupControllerComponent} from './main-page/body-page/group-layout/dialog/ble-group-controller.component';
import {NotificationComponent} from './share/common/notification.component';
import {HubIconComponent} from './main-page/body-page/Hub/hub-icon.component';
import {GatewayIconComponent} from './main-page/body-page/gateway/gateway-icon.component';
import {AreasIconComponent} from './main-page/body-page/area-layout/areas-icon.component';
import {WidgetSettingComponent} from './main-page/widget-setting.component';
import {MapSettingComponent} from './main-page/body-page/map-layout/map-setting.component';
import {CoverDialogControllerComponent} from './main-page/body-page/device/dialog/cover-dialog-controller.component';
import {PelabPageComponent} from './main-page/body-page/gateway/pelab-page/pelab-page.component';
import {CreatePelabDeviceComponent} from './share/device/create-pelab-device.component';
import {CreatePelabGroupComponent} from './share/group/create-pelab-group.component';
import {
  PelabGroupControllerComponent
} from './main-page/body-page/group-layout/dialog/pelab-group-controller.component';
import {SelectCmdZigbeeComponent} from './share/automation/input/select-cmd-zigbee.component';
import {ApolloNodeTreeCreateV2} from './share/apollo-node-tree/add-entity-dialog.component';
import {SmartDashboarShareModule} from './share/share.module';
import {MainModule} from './main-page/main.module';
import {InputModule} from './share/input/input.module';
import {
  AnalyzeLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/analyze-layout/analyze-layout.module';
import {
  BleGroupSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/group-layout/dialog/ble-group-setting.component';
import {
  SettingGroupFromApolloComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/group-layout/dialog/setting-group-from-apollo.component';
import {MenuModule} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/menu/menu.module';

import {
  EditEntityComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/common/edit-entity/edit-entity.component';

@NgModule({
  declarations: [
    CreateGroupFromApolloComponent,
    CreateGroupFromDqsmartComponent,
    GroupCreateOrUpdateComponent,
    MainPageComponent,
    BodyPageComponent,
    ApolloNodeTreeCreateOrUpdateComponent,
    AreaLayoutComponent,
    GatewayLayoutComponent,
    GatewaySettingComponent,
    ApolloGatewayAdditionalInforComponent,
    HubLayoutComponent,
    HubSettingComponent,
    DeviceSettingComponent,
    DeviceLayoutComponent,
    SlideButtonComponent,
    IconEntityComponent,
    BlePageComponent,
    DeviceCreateOrUpdateComponent,
    CreateBleDeviceFromApolloComponent,
    CreateZbDeviceFromApolloComponent,
    LightControllerComponent,
    HubPageComponent,
    ZigbeeTabComponent,
    BleSigMeshTabComponent,
    RadarSensorComponent,
    ZigbeeUpdateDeviceComponent,
    AreaSettingComponent,
    MapViewComponent,
    SceneLayoutComponent,
    IconSceneEntityComponent,
    SceneCreateOrUpdateComponent,
    CreateSceneFromApolloComponent,
    ZigbeeControllerComponent,
    AutomationLayoutComponent,
    RenderAutomationNodeTreeComponent,
    AutomationCreateOrUpdateComponent,
    LoadZbDevFromHubComponent,
    ZbEndpointSelectComponent,
    AutoTypeControlSelectionComponent,
    SchedulerLayoutComponent,
    SchedulerInputComponent,
    DqsmartSettingComponent,
    PelabSettingComponent,
    DqsmartPageComponent,
    CreateDqsmartDeviceComponent,
    CreatePelabDeviceComponent,
    CreateSceneFromDqsmartComponent,
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
    CreatePelabGroupComponent,
    PelabGroupControllerComponent,
    SelectCmdZigbeeComponent,
    ApolloNodeTreeCreateV2,
    BleGroupSettingComponent,
    SettingGroupFromApolloComponent,
    EditEntityComponent
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

  ],
  exports: [
    MainPageComponent,
    DeviceLayoutComponent,
  ]
})
export class ComponentModule {
}
