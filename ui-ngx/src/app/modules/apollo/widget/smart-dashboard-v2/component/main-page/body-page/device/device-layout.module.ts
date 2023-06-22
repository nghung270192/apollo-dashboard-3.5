import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DeviceLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/device-layout.component';
import {
  DeviceSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/device-setting.component';
import {
  IconEntityComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/icon-entity.component';
import {
  SlideButtonComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/slide-button.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {SmartDashboarShareModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/smart-dashboard-shared.module';


@NgModule({
  declarations: [
    DeviceLayoutComponent,
    DeviceSettingComponent,
    IconEntityComponent,
    SlideButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    SmartDashboarShareModule
  ],
  exports: [
    DeviceLayoutComponent,
    DeviceSettingComponent,
    IconEntityComponent,
    SlideButtonComponent
  ]
})
export class DeviceLayoutModule {
}
