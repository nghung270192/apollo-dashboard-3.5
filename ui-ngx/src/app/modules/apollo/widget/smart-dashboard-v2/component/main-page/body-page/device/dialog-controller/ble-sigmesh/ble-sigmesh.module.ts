import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MotionSensorComponent
} from './motion-sensor-controller/motion-sensor.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  EnergySensorManagementModule
} from './energy-sensor-management/energy-sensor-management.module';
import {
  Light2in1Module
} from './light-2in1/light-2in1.module';
import {
  ToolbarSharedModule
} from '../toolbar-shared/toolbar-shared.module';
import {
  BaseLightControllerModule
} from './base-light-controller/base-light-controller.module';
import {
  MotionSensorControllerModule
} from './motion-sensor-controller/motion-sensor-controller.module';
import {
  BaseNodeControllerModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/base-node-controller/base-node-controller.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    EnergySensorManagementModule,
    Light2in1Module,
    ToolbarSharedModule,
    BaseLightControllerModule,
    MotionSensorControllerModule,
    BaseNodeControllerModule
  ],
  exports: [
    EnergySensorManagementModule,
    Light2in1Module,
    BaseLightControllerModule,
    MotionSensorControllerModule,
    BaseNodeControllerModule

  ]
})
export class BleSigmeshModule {
}
