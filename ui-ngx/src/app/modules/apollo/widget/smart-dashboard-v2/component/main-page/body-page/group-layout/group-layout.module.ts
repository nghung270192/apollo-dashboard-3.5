import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';
import {
  IconGroupEntityComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/icon-group-entity.component';
import {
  GroupLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/group-layout.component';
import {
  BleGroupControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/ble-group-controller.component';
import {
  BleGroupSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/ble-group-setting.component';
import {
  CreateGroupFromDqsmartComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/create-group-from-dqsmart.component';
import {
  CreatePelabGroupComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/create-pelab-group.component';
import {
  PelabGroupControllerComponent,
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/pelab-group-controller.component';
import {
  SettingGroupFromApolloComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/setting-group-from-apollo.component';


@NgModule({
  declarations: [
    IconGroupEntityComponent,
    GroupLayoutComponent,
    BleGroupControllerComponent,
    BleGroupSettingComponent,
    CreateGroupFromDqsmartComponent,
    CreatePelabGroupComponent,
    PelabGroupControllerComponent,
    SettingGroupFromApolloComponent
  ],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [
    IconGroupEntityComponent,
    GroupLayoutComponent,
    BleGroupControllerComponent,
    BleGroupSettingComponent,
    CreateGroupFromDqsmartComponent,
    CreatePelabGroupComponent,
    PelabGroupControllerComponent,
    SettingGroupFromApolloComponent
  ]
})
export class GroupLayoutModule {
}
