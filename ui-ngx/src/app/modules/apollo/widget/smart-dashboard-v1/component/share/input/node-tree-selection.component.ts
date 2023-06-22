import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl} from '@angular/forms';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';

@Component({
  selector: 'tb-node-tree-selection',
  templateUrl: './node-tree-selection.component.html',
  styleUrls: ['./node-tree-selection.component.scss']
})
export class NodeTreeSelectionComponent implements OnInit {

  @Input() name = 'Loại thực thể';
  @Input() disable = false;
  @Input() datasource: Array<NodeTree> = [];
  @Input() selection: NodeTree;
  @Output() selectionChange: EventEmitter<NodeTree> = new EventEmitter<NodeTree>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();


  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }

  public objectComparisonFunction = function(option: NodeTree, value: NodeTree): boolean {
     return option?.id?.id === value?.id?.id;
  };
}
