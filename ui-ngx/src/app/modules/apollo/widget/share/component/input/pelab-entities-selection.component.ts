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
import {PelabEntity} from '@modules/apollo/widget/share/models/pelab/pelab.model';

@Component({
  selector: 'tb-pelab-entity-selection',
  templateUrl: './pelab-entities-selection.component.html',
  styleUrls: ['./pelab-entities-selection.component.scss']
})
export class PelabEntitiesSelectionComponent implements OnInit, OnChanges {

  @Input() name = 'Chọn thực thể';
  @Input() datasource: Array<PelabEntity> = [];
  @Input() multiple: boolean;
  @Input() byId: boolean;

  @Input() entities: Array<PelabEntity>=[];
  @Output() entitiesChange: EventEmitter<Array<PelabEntity>> = new EventEmitter<Array<PelabEntity>>();

  @Output() closeEvent: EventEmitter<Array<PelabEntity>> = new EventEmitter<Array<PelabEntity>>();

  datasourceFilter: Array<PelabEntity> = [];


  formControl = new FormControl('');

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.datasourceFilter = this.datasource;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  public objectComparisonFunction = function(option: PelabEntity, value: PelabEntity): boolean {
    console.log(option,value);
    return option.deviceAdressStr === value.deviceAdressStr;
  };

}
