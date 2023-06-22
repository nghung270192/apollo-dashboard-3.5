import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl} from '@angular/forms';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';

@Component({
  selector: 'tb-node-tree-selection-with-id',
  templateUrl: './node-tree-selection-with-id.component.html',
  styleUrls: ['./node-tree-selection-with-id.component.scss']
})
export class NodeTreeSelectionWithIdComponent implements OnInit {

  @Input()name = 'Loại thực thể';
  @Input()disable = false;
  @Input()datasource: Array<NodeTree> = [];
  @Input()selection: string;
  @Output()selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()closeEvent: EventEmitter<any> = new EventEmitter<any>();


  formControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

}
