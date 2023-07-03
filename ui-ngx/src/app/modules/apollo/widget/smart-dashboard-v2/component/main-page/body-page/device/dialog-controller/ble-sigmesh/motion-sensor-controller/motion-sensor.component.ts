import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlePirSensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-pir-sensor';

export interface DataViewDialog {
  nodeTreeController: BlePirSensor;
}

@Component({
  selector: 'apollo-radar-sensor',
  templateUrl: './motion-sensor.component.html',
  styleUrls: ['./motion-sensor.component.scss']
})
export class MotionSensorComponent implements OnInit, OnChanges, AfterViewInit {

  status = false;
  ambientBrightness = 0;
  brightness = 0;
  delay = 0;
  levelHigh = 0;
  levelLow = 0;
  hlkTime = 0;
  hlkDistance = 0;

  formGroup: FormGroup;

  isProcessing = false;
  isError = false;
  @Input() elementIndex: number;
  @Input()
  nodeTreeController: BlePirSensor;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<MotionSensorComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    this.init = this.init.bind(this);
    this.formGroup = _formBuilder.group(
      {
        status: [0],
        ambientBrightness: [0],
        brightness: [0],
        delay: [0],
        levelHigh: [0],
        levelLow: [0],
        hlkTime: [0],
        hlkDistance: [0],
      }
    );
  }

  ngOnInit(): void {
  }


  init() {
    this.isProcessing = false;
    this.isError = false;
    /*    if(this.nodeControl)
        {
            this.delay = this.nodeControl?.radarDelay;
            this.levelLow = this.nodeControl?.radarLevelLow;
            this.levelHigh = this.nodeControl?.radarLevelHigh;
            this.brightness = this.nodeControl?.radarBrightness;
            this.status = this.nodeControl?.radarStatus;
            this.ambientBrightness = this.nodeControl?.radarAmbientBrightness;
            this.hlkTime = this.nodeControl?.radarHlkTimeActive;
            this.hlkDistance = this.nodeControl?.radarHlkSensitive;
        }*/
  }

  delaySet() {
    this.onStart();
    this.data.nodeTreeController.setDelay(this.delay).subscribe(value => {
        this.status = value?.status;
        this.ambientBrightness = value?.ambient_brightness;
        this.brightness = value?.brightness;
        this.delay = value?.delay;
        this.levelHigh = value?.detect;
        this.levelLow = value?.unDetect;
      },
      error => this.onError());
  }

  levelSet() {
  }

  brightnessSet() {
  }

  hlkDistanceSet() {
  }

  hlkTimeSet() {

  }

  sensorGet() {
    this.onStart();
    this.data.nodeTreeController.getAllParamsSensorMotion().subscribe(value => {
        console.log(value);
        this.status = value?.status;
        this.ambientBrightness = value?.ambient_brightness;
        this.brightness = value?.brightness;
        this.delay = value?.delay;
        this.levelHigh = value?.detect;
        this.levelLow = value?.unDetect;
      },
      error => this.onError());

  }


  ngOnChanges(changes: SimpleChanges): void {
    /*    console.log("changed")
        this.init();
        this.cd.detectChanges();*/
  }

  ngAfterViewInit(): void {
    /*    this.init();
        this.cd.detectChanges();
        this.apollo.viewData.observer.subscribe(res=>{
          this.init();
        })*/
  }

  onStart() {
    this.isProcessing = true;
    this.isError = false;
  }

  onEnd() {
    this.isProcessing = false;
    this.isError = false;
  }

  onError() {
    this.isProcessing = false;
    this.isError = true;
  }


  cancel() {
    this.dialogRef.close();
  }
}
