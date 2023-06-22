import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
 import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
 import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device.model';

export interface DataViewDialog {
  nodeTreeController: DeviceControllerAbstract;
}

@Component({
  selector: 'tb-zigbee-controller',
  templateUrl: './zigbee-controller.component.html',
  styleUrls: ['./zigbee-controller.component.scss']
})
export class ZigbeeControllerComponent extends DialogComponent<ZigbeeControllerComponent> implements OnInit {

  constructor(protected store: Store<AppState>,
              protected router: Router,
              public dialogRef: MatDialogRef<ZigbeeControllerComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);
  }

  ngOnInit(): void {
  }

}
