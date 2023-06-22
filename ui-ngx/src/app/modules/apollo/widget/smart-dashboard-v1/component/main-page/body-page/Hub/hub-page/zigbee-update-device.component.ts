import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {HubController} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {ZigbeeDevice, ZigbeeModel} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DataViewDialog {
  hubController: HubController;
  zbDevice: ZigbeeDevice;
}

@Component({
  selector: 'tb-zigbee-update-device',
  templateUrl: './zigbee-update-device.component.html',
  styleUrls: ['./zigbee-update-device.component.scss']
})
export class ZigbeeUpdateDeviceComponent implements OnInit {

  name: string;
  addr: number;
  model: ZigbeeModel;

  constructor(
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ZigbeeUpdateDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.zbDevice) {
      this.name = this.data.zbDevice?.name;
      this.addr = this.data.zbDevice?.addr;
      this.model = this.data.zbDevice?.model;
    }
    this.cd.detectChanges();
  }


  save($event) {
    const device: ZigbeeDevice = {
      addr: this.addr, model: this.model, name: this.name
    };
    this.dialogRef.close({device});
  }

}
