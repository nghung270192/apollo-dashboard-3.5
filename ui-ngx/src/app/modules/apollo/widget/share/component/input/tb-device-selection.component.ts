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
import {Device} from '@shared/models/device.models';

@Component({
  selector: 'tb-device-selection',
  templateUrl: './tb-device-selection.component.html',
  styleUrls: ['./tb-device-selection.component.scss']
})
export class TbDeviceSelectionComponent implements OnInit, OnChanges {

  @Input() name = 'Gateway Model';
  @Input() disable = false;
  @Input() devices: Array<Device>;
  @Input() selection: string;
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  formControl = new FormControl('');

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd.detectChanges();
  }

}
