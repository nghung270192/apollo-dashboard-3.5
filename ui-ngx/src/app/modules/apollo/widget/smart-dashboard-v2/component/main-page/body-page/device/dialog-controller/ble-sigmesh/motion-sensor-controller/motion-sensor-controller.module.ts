import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MotionSensorComponent
} from './motion-sensor.component';
import {SharedModule} from '@shared/shared.module';
import {
  ToolbarSharedModule
} from '../../toolbar-shared/toolbar-shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';


@NgModule({
  declarations: [MotionSensorComponent],
  imports: [
    CommonModule,
    SharedModule,
    ToolbarSharedModule,
    ApolloShareModule
  ],
  exports: [MotionSensorComponent]
})
export class MotionSensorControllerModule {
}
