import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchedulerInputComponent} from './input/scheduler-input.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  AutoTypeControlSelectionComponent
} from './input/auto-type-control-selection.component';
import {SelectCmdZigbeeComponent} from './input/select-cmd-zigbee.component';
import {ZbEndpointSelectComponent} from './input/zb-endpoint-select.component';
import {RenderAutomationNodeTreeComponent} from './render-automation-node-tree.component';
import {AutomationCreateOrUpdateComponent} from './automation-create-or-update.component';
import {InputModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/input/input.module';

@NgModule({
  declarations: [
    AutomationCreateOrUpdateComponent,
    SchedulerInputComponent,
    AutoTypeControlSelectionComponent,
    SelectCmdZigbeeComponent,
    ZbEndpointSelectComponent,
    RenderAutomationNodeTreeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    InputModule,
  ],
  exports: []
})
export class AutomationModule {
}
