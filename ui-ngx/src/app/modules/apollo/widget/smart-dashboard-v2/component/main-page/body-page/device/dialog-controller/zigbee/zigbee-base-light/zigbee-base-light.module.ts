import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ZigbeeLightControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/zigbee/zigbee-base-light/zigbee-light-controller.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';


@NgModule({
  declarations: [ZigbeeLightControllerComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    ToolbarSharedModule,
  ],
  exports: [ZigbeeLightControllerComponent]
})
export class ZigbeeBaseLightModule {
}
