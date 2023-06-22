import {ChangeDetectorRef, Directive, Inject} from '@angular/core';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DataViewDialogControllerI<D extends DeviceControllerAbstract> {
  nodeTreeController: D;
}

@Directive()
export abstract class DialogControllerDirective<T, D extends DeviceControllerAbstract> {
  constructor(
    protected dialogRef: MatDialogRef<T>,
    protected data: DataViewDialogControllerI<D>) {
  }

  cancel() {
    this.dialogRef.close();
  }

  dataIsValid(): boolean {
    return !!this.data && !!this.data?.nodeTreeController;
  }
}

/*@Directive()
export abstract class DialogBaseLightControllerDirective<T, D extends BleBaseLighting>
  extends DialogControllerDirective<T, D> {
  constructor(
    protected dialogRef: MatDialogRef<T>,
    protected data: DataViewDialogControllerI<D>) {
    super(dialogRef, data);
  }

  lightnessChange(lightness, index) {
    if (this.dataIsValid() && this.data.nodeTreeController.setLightness) {
      this.data.nodeTreeController.setLightness({lightness, index}).subscribe(res => {
      });
    }
  }

  stateChange(event, elementIndex) {

  }
}*/
