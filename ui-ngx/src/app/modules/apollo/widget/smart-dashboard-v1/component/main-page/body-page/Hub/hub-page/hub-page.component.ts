import {Component, Input, OnInit} from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';

@Component({
  selector: 'tb-hub-page',
  templateUrl: './hub-page.component.html',
  styleUrls: ['./hub-page.component.scss']
})
export class HubPageComponent implements OnInit {
  checkJconConfig = true;
  selectedIndex = 0;
  @Input()apollo: ApolloWidgetContext;
  @Input()nodeTree: NodeTree;
  constructor() { }

  ngOnInit(): void {
  }

}
