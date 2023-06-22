import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  NodeTreeType,
  NodeTreeTypeLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'tb-node-tree-type-selection',
  templateUrl: './node-type-option-selection.component.html',
  styleUrls: ['./node-type-option-selection.component.scss']
})
export class NodeTypeOptionSelectionComponent implements OnInit {

  @Input()name = 'Loại thực thể';
  @Input()disable = false;
  @Input()selection: NodeTreeType;
  @Output()selectionChange: EventEmitter<NodeTreeType> = new EventEmitter<NodeTreeType>();

  public nodeTreeType = Object.values(NodeTreeType);
  public NodeTreeTypeLabelMapping = NodeTreeTypeLabelMapping;

  formControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

}
