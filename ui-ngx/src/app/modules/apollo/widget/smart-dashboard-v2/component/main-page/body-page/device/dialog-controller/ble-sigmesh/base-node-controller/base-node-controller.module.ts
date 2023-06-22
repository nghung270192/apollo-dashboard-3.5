import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseNodeControllerComponent} from './base-node-controller.component';
import {SharedModule} from '@shared/shared.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';


@NgModule({
  declarations: [
    BaseNodeControllerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolbarSharedModule,
  ],
  exports: [
    BaseNodeControllerComponent
  ]
})
export class BaseNodeControllerModule {
}
