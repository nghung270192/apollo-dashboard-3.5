import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {PageComponent} from '@shared/components/page.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {
  DataViewDialogControllerI,
  DialogControllerDirective
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/dialog-controller.directive';
import {BaseZigbeeDeviceController} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/zigbee-controller';
import {BaseLight} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/base-light';

export interface DataViewDialog {
  entityController: DeviceControllerAbstract;
  apollo: ApolloWidgetContext;
}

@Component({
  selector: 'tb-light-controller',
  templateUrl: './zigbee-light-controller.component.html',
  styleUrls: ['./zigbee-light-controller.component.scss']
})
export class ZigbeeLightControllerComponent
  extends DialogControllerDirective<ZigbeeLightControllerComponent, BaseLight>
  implements OnInit, AfterViewInit {
  lightness = 0;
  state = false;
  hasLightness: boolean;
  hasHsl: boolean;
  hasCTL: boolean;

  maxElementIndex: Array<number> = [];

  constructor(protected store: Store<AppState>,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ZigbeeLightControllerComponent>,
              private cd: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data: DataViewDialogControllerI<BaseLight>) {
    super(dialogRef, data);


  }


  ngOnInit(): void {
    if (this.data.nodeTreeController && this.data.nodeTreeController.getMaxIndex) {
      this.maxElementIndex = Array.from(
        {length: this.data.nodeTreeController.getMaxIndex()}, (_, i) => i + 1);
      this.cd.detectChanges();
    }
  }

  lightnessChange(event, elementIndex) {
    if (this.data?.nodeTreeController && this.data.nodeTreeController.setLightness) {
      this.data.nodeTreeController.setLightness({lightness: event, index: elementIndex}).subscribe(res => {
      });
    }
  }

  setState(event, value, elementIndex) {
    if (this.data?.nodeTreeController) {
      console.log(value);
      this.data.nodeTreeController.setState({
        state: value,
        index: elementIndex
      }).subscribe(value1 => console.log(value1));
    }
  }

  hslChange(event, elementIndex) {
    if (this.data?.nodeTreeController && this.data.nodeTreeController.setHsl) {
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
