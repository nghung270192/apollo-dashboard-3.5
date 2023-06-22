import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  NodeTreeType,
  NodeTreeTypeLabelMapping
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'tb-node-tree-type-select',
  templateUrl: './node-tree-type-select.component.html',
  styleUrls: ['./node-tree-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NodeTreeTypeSelectComponent),
      multi: true
    }
  ]
})
export class NodeTreeTypeSelectComponent implements ControlValueAccessor, OnInit {

  formGroup: FormGroup;
  nodeTreeType: NodeTreeType;


  onChange: any = (v: any) => {
  };
  onTouched: any = (v: any) => {
  };

  NodeTreeTypes = Object.values(NodeTreeType);
  NodeTreeTypeLabelMapping = NodeTreeTypeLabelMapping;

  constructor() {

  }

  ngOnInit(): void {
  }

  writeValue(value: any): void {
    this.nodeTreeType = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
