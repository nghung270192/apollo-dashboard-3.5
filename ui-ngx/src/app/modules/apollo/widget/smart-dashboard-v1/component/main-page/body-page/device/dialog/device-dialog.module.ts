import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CommonLightControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/common-light-controller.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';


@NgModule({
  declarations: [CommonLightControllerComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
  ]
})
export class DeviceDialogModule {
}
