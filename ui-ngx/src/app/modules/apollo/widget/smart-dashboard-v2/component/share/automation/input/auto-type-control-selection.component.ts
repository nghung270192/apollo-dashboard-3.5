import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AutoTypeControl} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';

@Component({
  selector: 'tb-auto-type-control-selection',
  templateUrl: './auto-type-control-selection.component.html',
  styleUrls: ['./auto-type-control-selection.component.scss']
})
export class AutoTypeControlSelectionComponent implements OnInit {

  @Input() name = 'Loại thực thể';
  @Input() disable = false;
  @Input() selection: AutoTypeControl;
  @Output() selectionChange: EventEmitter<AutoTypeControl> = new EventEmitter<AutoTypeControl>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();


  autoTypeControls = Object.values(AutoTypeControl);
  AutoTypeControl = AutoTypeControl;

  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }
}
