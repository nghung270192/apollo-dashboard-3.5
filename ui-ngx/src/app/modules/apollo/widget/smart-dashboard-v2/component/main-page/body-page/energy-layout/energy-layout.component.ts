import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';

@Component({
  selector: 'tb-energy-layout',
  templateUrl: './energy-layout.component.html',
  styleUrls: ['./energy-layout.component.scss']
})
export class EnergyLayoutComponent {
  @Input() apollo: ApolloWidgetContext;

  @Input() rootNodeTree: NodeTree;
  @Input() callbackEvent: (event: EventTask) => void;

  constructor() {
  }
}
