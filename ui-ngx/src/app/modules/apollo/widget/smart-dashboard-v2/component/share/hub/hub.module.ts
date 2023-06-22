import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/share/hub/hub.component';
import {SharedModule} from '@shared/shared.module';
import {InputModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/input/input.module';


@NgModule({
  declarations: [
    HubComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputModule
  ],
  exports: [
    HubComponent
  ]
})
export class HubModule {
}
