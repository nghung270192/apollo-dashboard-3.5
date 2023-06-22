import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {BleLight2in1} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-light2in1';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  DataViewDialogControllerI, DialogControllerDirective
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/dialog-controller.directive';
import {FormBuilder, FormGroup} from '@angular/forms';

interface parameter {
  name: string;
  formName: string;
  min: number;
  max: number;
  unit: string;

  set(): void;

  get(): void;
}

interface parameters {
  [key: string]: parameter;
}

@Component({
  selector: 'tb-light-radar-together',
  templateUrl: './light-radar-together.component.html',
  styleUrls: ['./light-radar-together.component.scss']
})
export class LightRadarTogetherComponent
  extends DialogControllerDirective<LightRadarTogetherComponent, BleLight2in1>
  implements OnInit {
  lightness = 0;

  parametersObject: parameters = {
    activeLevel: {
      name: 'Độ sáng khi có người',
      formName: 'inactiveLevel',
      set: undefined,
      get: undefined,
      max: 100,
      min: 0,
      unit: '(%)'
    },
    inActiveLevel: {
      name: 'Độ sáng khi không người',
      formName: 'activeLevel',
      get: undefined,
      set: undefined,
      max: 100,
      min: 0,
      unit: '(%)'
    },
    delayTime: {
      name: 'Thời gian trễ',
      formName: 'delayTime',
      get: undefined,
      set: undefined,
      max: 10000,
      min: 0,
      unit: '(s)'
    },
    ambientBrightness: {
      name: 'Độ sáng môi trường',
      formName: 'ambientBrightness',
      get: undefined,
      set: undefined,
      max: 65535,
      min: 0,
      unit: ''
    },
    brightness: {
      name: 'Độ sáng cài đặt',
      formName: 'brightness',
      get: undefined,
      set: undefined,
      max: 65535,
      min: 0,
      unit: ''
    },
    sensitiveHlk: {
      name: 'Độ nhạy cảm biến HLK',
      formName: 'hlkSensitive',
      get: undefined,
      set: undefined,
      max: 100,
      min: 0,
      unit: ''
    },
    delayTimeHlk: {
      name: 'Thời gian trễ cảm biến HLK',
      formName: 'hlkDelayTime',
      get: undefined,
      set: undefined,
      max: 100,
      min: 0,
      unit: '(s)'
    }
  };

  parametersArray: Array<parameter>;


  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LightRadarTogetherComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DataViewDialogControllerI<BleLight2in1>) {
    super(dialogRef, data);

    this.formGroup = fb.group({
      inactiveLevel: [null, []],
      activeLevel: [null, []],
      delayTime: [null, []],
      ambientBrightness: [null, []],
      brightness: [null, []],
      hlkSensitive: [null, []],
      hlkDelayTime: [null, []],
    });
  }

  printFormGrou() {
    console.log(this.formGroup);
  }

  ngOnInit(): void {
    this.parametersArray = Object.values(this.parametersObject).map(value => value);
    console.log(this.parametersArray);
  }

  getAll() {
    if (this.dataIsValid()) {
      this.data.nodeTreeController.getAllDataSensor({index: 1}).subscribe(value => {
      });
    }
  }

  setAll() {
    if (this.dataIsValid()) {
      this.data.nodeTreeController.setAllDataSensor(
        {
          index: 1,
          sensorData: {
            lowLevel: this.formGroup.get('inactiveLevel').value,
            highLevel: this.formGroup.get('activeLevel').value,
            delayTime: this.formGroup.get('delayTime').value,
            brightness: this.formGroup.get('brightness').value,
            hlkSensitive: this.formGroup.get('hlkSensitive').value,
            hlkDelayTime: this.formGroup.get('hlkDelayTime').value,
          }
        }).subscribe(value => {
      });
    }
  }

  lightnessChange(lightness, index) {
    if (this.dataIsValid() && this.data.nodeTreeController.setLightness) {
      this.data.nodeTreeController.setLightness({lightness, index}).subscribe(res => {
      });
    }
  }
}
