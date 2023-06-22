import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseLightControllerComponent
} from './base-light-controller.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';



@NgModule({
  declarations: [BaseLightControllerComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    ToolbarSharedModule
  ],
  exports:[BaseLightControllerComponent]
})
export class BaseLightControllerModule { }
