import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {DqsmartClimateController} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/dqsmart-climate-controller';


export interface DataViewDialog {
  entityController: DqsmartClimateController;
}

@Component({
  selector: 'tb-control-dialog-controller',
  templateUrl: './climate-dialog-controller.component.html',
  styleUrls: ['./climate-dialog-controller.component.scss']
})
export class ClimateDialogControllerComponent implements OnInit {


  private timer: any;
  private delay = 1000;
  private prevent = 0;

  operationMode: string;
  ListOperationMode: Array<string> = [];
  fanMode: string;
  FanList: Array<string> = [];
  tempLow: number;
  tempHigh: number;
  temperature = 0;

  operationModeForm = new FormControl('');
  fanModeModeForm = new FormControl('');


  constructor(public dialogRef: MatDialogRef<ClimateDialogControllerComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    this.increaseTemperature = this.increaseTemperature.bind(this);
    this.setTemp = this.setTemp.bind(this);
  }

  ngOnInit(): void {
    this.ListOperationMode = ['off', 'cool', 'dry', 'fan_only'];

    this.FanList = ['level1', 'level2', 'level3', 'level4', 'level5', 'auto'];

    this.tempLow = this.data?.entityController?.climateHass.minTemperature;
    this.tempHigh = this.data?.entityController?.climateHass.maxTemperature;

    this.temperature = this.data?.entityController?.climateHass.temperature;
    this.operationMode = this.data?.entityController?.climateHass.operatureMode;
    this.fanMode = this.data?.entityController?.climateHass.fanMode;


  }

  slideTogle() {
    this.data?.entityController.toggle(this.data?.entityController.renderState().rawState.onOffState);
  }

  setTemp() {
    const temp: any = {
      operationMode: this.operationMode,
      temperatureHigh: this.tempHigh,
      temperatureLow: this.tempLow,
      temperature: this.temperature,
    };

    this.data?.entityController.climateSetTemperature(temp).subscribe(res => console.log(res));
  }


  increaseTemperature() {
    this.temperature++;
    if (this.timer) {clearTimeout(this.timer);}
    this.timer = setTimeout(function() {
      this.setTemp();
    }.bind(this), this.delay);
  }

  decreaseTemperature() {
    this.temperature--;
    if (this.timer) {clearTimeout(this.timer);}
    this.timer = setTimeout(function() {
      this.setTemp();
    }.bind(this), this.delay);
  }

  setFanMode() {
    this.data?.entityController.climateSetFanMode(this.fanMode).subscribe(res => console.log(res));
  }

  setOperationMode() {
    this.data.entityController.climateSetOperationMode(this.operationMode).subscribe(res => console.log(res));
  }
}
