import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductModel} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';
import {
  BleDeviceNodeTreeController
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';

export interface DataViewDialog {
  nodeTreeController: BleDeviceNodeTreeController;
}

@Component({
  selector: 'tb-light-controller',
  templateUrl: './light-controller.component.html',
  styleUrls: ['./light-controller.component.scss']
})
export class LightControllerComponent implements OnInit, AfterViewInit {
  elementIndex = 0;
  lightness = 0;


  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<LightControllerComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
  }


  productModel = ProductModel.light;
  ProductModel = ProductModel;

  ngOnInit(): void {
    this.data?.nodeTreeController?.getLightness(null).subscribe(res => {
      this.lightness = res;
      if (this.lightness === undefined) {
        this.lightness = 0;
      }
      this.cd.detectChanges();
    });

  }

  lightnessChange(event, elementIndex) {
    if (this.data?.nodeTreeController) {
      this.data.nodeTreeController.setLightness({lightness: event, index: elementIndex}).subscribe(res => {
      });
    }
  }

  stateChange(event, elementIndex) {

  }

  hslChange(event, elementIndex) {
    if (this.data?.nodeTreeController) {
      this.data.nodeTreeController.setHsl({hsl: event, index: elementIndex}).subscribe(res => {
      });
    }
  }

  ngAfterViewInit(): void {

    this.cd.detectChanges();
  }

  cancel() {
    this.dialogRef.close();
  }
}
