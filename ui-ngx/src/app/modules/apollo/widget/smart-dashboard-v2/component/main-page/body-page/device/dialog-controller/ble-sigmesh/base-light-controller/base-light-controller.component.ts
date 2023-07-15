import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductModel} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';
import {BleBaseLighting} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-base-lighting';
import {
  DataViewDialogControllerI,
  DialogControllerDirective
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/dialog-controller.directive';


export interface DataViewDialog {
  nodeTreeController: BleBaseLighting;
}

@Component({
  selector: 'tb-base-light-controller',
  templateUrl: './base-light-controller.component.html',
  styleUrls: ['./base-light-controller.component.scss']
})
export class BaseLightControllerComponent
  extends DialogControllerDirective<BaseLightControllerComponent, BleBaseLighting> implements OnInit, AfterViewInit {
  elementIndex = 0;
  lightness = 0;


  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<BaseLightControllerComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialogControllerI<BleBaseLighting>) {
    super(dialogRef, data);
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
      this.lightness = event;
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

  ctlChange(event, elementIndex) {
    if (this.data?.nodeTreeController) {
      this.data.nodeTreeController.setCtl({
        ctl: event,
        lightness: this.lightness,
        index: elementIndex
      }).subscribe(res => {
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
