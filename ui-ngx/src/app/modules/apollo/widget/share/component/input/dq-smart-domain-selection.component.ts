import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FormControl} from '@angular/forms';
import {
  HassDomain,
  HassDomainMappingLable, HassDomainSupported
} from "@modules/apollo/widget/share/models/dq-smart/home-assistant.model";

@Component({
  selector: 'tb-dq-smart-domain-selection',
  templateUrl: './dq-smart-domain-selection.component.html',
  styleUrls: ['./dq-smart-domain-selection.component.scss']
})
export class DqSmartDomainSelectionComponent implements OnInit {

  @Input() name = 'Gateway Model';
  @Input() disable = false;
  @Input() selection: Array<HassDomain>;
  @Output() selectionChange: EventEmitter<Array<HassDomain>> = new EventEmitter<Array<HassDomain>>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  HassDomain = Object.values(HassDomainSupported);
  HassDomainMappingLable = HassDomainMappingLable;


  formControl = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
  }

}
