import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceDialogModule} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/device-dialog.module';


@NgModule({
  declarations: [],
  exports: [ ],
  imports: [
     CommonModule,
    DeviceDialogModule
  ]
})
export class BodyPageModule {
}
