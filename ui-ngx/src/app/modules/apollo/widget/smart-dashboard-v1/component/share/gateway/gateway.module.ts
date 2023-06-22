import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
 import {SharedModule} from '@shared/shared.module';
import {InputModule} from '@modules/apollo/widget/smart-dashboard-v1/component/share/input/input.module';
import {GatewayComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/share/gateway/gateway.component';


@NgModule({
  declarations: [
    GatewayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputModule
  ],
  exports: [
    GatewayComponent
  ]
})
export class GatewayModule {
}
