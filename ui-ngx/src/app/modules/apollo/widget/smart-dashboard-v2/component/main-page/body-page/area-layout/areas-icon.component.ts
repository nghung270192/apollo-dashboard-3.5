import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';

@Component({
  selector: 'tb-areas-icon',
  templateUrl: './areas-icon.component.html',
  styleUrls: ['./areas-icon.component.scss']
})
export class AreasIconComponent implements OnInit {
  selection = false;

  @Input()scale = 100;
  @Input()apollo: ApolloWidgetContext;
  @Input()nodeTree: NodeTree;
  @Input()isEdited = false;
  @Output()nodeTreeClick: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output()reloadEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
