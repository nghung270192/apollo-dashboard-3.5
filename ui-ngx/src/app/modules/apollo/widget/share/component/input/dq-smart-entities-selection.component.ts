import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IotDevice} from "@modules/apollo/widget/share/models/dq-smart/home-assistant.model";

@Component({
  selector: 'tb-dqsmart-entity-selection',
  templateUrl: './dq-smart-entities-selection.component.html',
  styleUrls: ['./dq-smart-entities-selection.component.scss']
})
export class DqSmartEntitiesSelectionComponent implements OnInit, OnChanges {

  @Input() name = 'New Entity';
  @Input() datasource: Array<IotDevice> = [];
  @Input() domains: Array<string>;
  @Input() multiple = false;

  @Input() selection: Array<IotDevice> = [];
  @Output() selectionChange: EventEmitter<Array<IotDevice>> = new EventEmitter<Array<IotDevice>>();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  datasourceFilter: Array<IotDevice> = [];

  formControl = new FormControl('');

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.datasourceFilter = [];
    if (this.domains && Array.isArray(this.domains) && this.domains.length > 0) {
      this.domains.forEach(dm => {
        if (this.datasource && Array.isArray(this.datasource)) {
           this.datasourceFilter = this.datasourceFilter.concat(this.datasource.filter(entity => entity.domain === dm));
         }
      });

    } else {
      this.datasourceFilter = this.datasource;
    }
  }

  selectionChangeEvent() {
    this.selectionChange.emit(this.selection);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }


}
