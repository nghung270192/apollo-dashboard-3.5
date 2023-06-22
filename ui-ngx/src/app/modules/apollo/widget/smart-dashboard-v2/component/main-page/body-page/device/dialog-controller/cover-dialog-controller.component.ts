import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DqsmartCoverController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/dqsmart-cover-controller';


export interface DataViewDialog {
  iotDevice: DqsmartCoverController;
}

@Component({
  selector: 'tb-control-dialog-controller',
  templateUrl: './cover-dialog-controller.component.html',
  styleUrls: ['./cover-dialog-controller.component.scss']
})
export class CoverDialogControllerComponent implements OnInit {


  private timer: any;
  private delay = 1000;
  private prevent = 0;

  buttons = {
    closeCover: {
      name: 'Đóng rèm',
      loading: false,
      click: this.closeCover
    },
    closeCoverTilt: {
      name: 'Close Cover Tilt',
      loading: false,
      click: this.closeCoverTilt
    },
    openCover: {
      name: 'Mở rèm',
      loading: false,
      click: this.openCover
    },
    openCoverTilt: {
      name: 'Open Cover Tilt',
      loading: false,
      click: this.openCoverTilt
    },
    stopCover: {
      name: 'Dừng',
      loading: false,
      click: this.stopCover
    },
    stopCoverTilt: {
      name: 'Stop Cover Tilt',
      loading: false,
      click: this.stopCoverTilt
    },
    setCoverPosition: {
      name: 'Set Position',
      loading: false,
      click: this.setCoverPosition
    },
    setCoverPositionTilt: {
      name: 'Set Position Tilt',
      loading: false,
      click: this.setCoverPositionTilt
    },
  };

  /*

    operationMode: string;
    ListOperationMode: Array<string> = [];
    fanMode: string;
    FanList: Array<string> = [];
    tempLow: number;
    tempHigh: number;
    temperature: number = 0;

    operationModeForm = new FormControl("");
    fanModeModeForm = new FormControl("");

  */

  constructor(public dialogRef: MatDialogRef<CoverDialogControllerComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {

  }

  ngOnInit(): void {
  }

  setLoading(name: string, state: boolean) {
    this.buttons[name].loading = state;
  }

  closeCover(name: string) {
    this.setLoading(name, true);

    this.data.iotDevice.closeCover().subscribe(res => this.setLoading(name, false));
  }

  closeCoverTilt(name: string) {

    this.setLoading(name, true);
    this.data.iotDevice.closeCoverTilt().subscribe(res => this.setLoading(name, false));
  }

  openCover(name: string) {

    this.setLoading(name, true);
    this.data.iotDevice.openCover().subscribe(res => this.setLoading(name, false));
  }

  openCoverTilt(name: string) {

    this.setLoading(name, true);
    this.data.iotDevice.openCoverTilt().subscribe(res => this.setLoading(name, false));

  }

  stopCover(name: string) {

    this.setLoading(name, true);
    this.data.iotDevice.stopCover().subscribe(res => this.setLoading(name, false));

  }

  stopCoverTilt(name: string) {

    this.setLoading(name, true);
    this.data.iotDevice.stopCoverTilt().subscribe(res => this.setLoading(name, false));

  }

  setCoverPosition(name: string, value: number) {
    this.setLoading(name, true);
    this.data.iotDevice.setCoverPosition(value).subscribe(res => this.setLoading(name, false));
  }

  setCoverPositionTilt(name: string, value: number) {
    this.setLoading(name, true);
    this.data.iotDevice.setCoverPositionTilt(value).subscribe(res => this.setLoading(name, false));
  }

  slideTogle() {
  }

}
