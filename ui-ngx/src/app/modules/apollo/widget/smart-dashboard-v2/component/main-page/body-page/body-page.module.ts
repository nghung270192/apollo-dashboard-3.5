import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DeviceDialogModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/device-dialog.module';
import {
  DeviceLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/device-layout.module';
import {
  EnergyLayoutModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/energy-layout/energy-layout.module';


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    DeviceDialogModule,
    DeviceLayoutModule,
    EnergyLayoutModule
  ]
})
export class BodyPageModule {
}
