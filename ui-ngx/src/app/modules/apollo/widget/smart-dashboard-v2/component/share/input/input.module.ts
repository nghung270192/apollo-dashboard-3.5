import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  EntityModelSelectComponent
} from './entity-model-select.component';
import {SharedModule} from '@shared/shared.module';
import {
  GatewayModelSelectionComponent
} from './gateway-model-selection.component';
import {
  NodeTreeSelectionComponent
} from './node-tree-selection.component';
import {
  NodeTreeSelectionWithIdComponent
} from './node-tree-selection-with-id.component';
import {
  InputComparisonOptionSelectionComponent
} from './input-comparison-option-selection.component';
import {
  NodeTreeTypeSelectComponent
} from './node-tree-type-select.component';
import {
  NodeTypeOptionSelectionComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/input/node-type-option-selection.component';


@NgModule({
  declarations: [
    NodeTreeSelectionWithIdComponent,
    NodeTreeSelectionComponent,
    EntityModelSelectComponent,
    GatewayModelSelectionComponent,
    InputComparisonOptionSelectionComponent,
    NodeTreeTypeSelectComponent,
    NodeTypeOptionSelectionComponent
  ],
  exports: [
    NodeTreeSelectionWithIdComponent,
    NodeTreeSelectionComponent,
    EntityModelSelectComponent,
    GatewayModelSelectionComponent,
    InputComparisonOptionSelectionComponent,
    NodeTreeTypeSelectComponent,
    NodeTypeOptionSelectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class InputModule {
}
