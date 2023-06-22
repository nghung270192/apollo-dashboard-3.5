import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  ComparisonType,
  ComparisonTypeLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v1/models/automation/automation.model';

@Component({
  selector: 'tb-comparison-selection',
  templateUrl: './input-comparison-option-selection.component.html',
  styleUrls: ['./input-comparison-option-selection.component.scss']
})
export class InputComparisonOptionSelectionComponent implements OnInit {

  @Input()name = 'Loại biểu thức';
  @Input()disable = false;
  @Input()selection: ComparisonType;
  @Output()selectionChange: EventEmitter<ComparisonType> = new EventEmitter<ComparisonType>();
  @Output()eventClose: EventEmitter<any> = new EventEmitter<any>();

  public nodeTreeType = Object.values(ComparisonType);
  public NodeTreeTypeLabelMapping = ComparisonTypeLabelMapping;

  formControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
    console.log(this.nodeTreeType);
  }

}
