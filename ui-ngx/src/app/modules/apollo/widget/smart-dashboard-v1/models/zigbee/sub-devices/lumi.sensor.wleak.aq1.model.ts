import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  DeviceState
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {
  ApolloWidgetContext,
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {BaseZigbeeDeviceController} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee-controller';
import {ChangeDetectorRef} from '@angular/core';


export class LumiSensorWleakAq1Model extends BaseZigbeeDeviceController {

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              callback?: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, callback);
  }


  entityClick(): any {
    /*    const dialogConfig: MatDialogConfig = {
          disableClose: false,
          data: {
            nodeTreeController: this,
          }
        };
        let sub: any;
        sub = this.dialog-controller.open(ZigbeeControllerComponent, dialogConfig).afterClosed();
        if (sub) {
          sub.subscribe(res => {
          });
        }*/
  }

  renderState(): DeviceState {

    const stateStr = '';
    let color = 'black';
    if (this.endPoint.get('Temperature')) {
      color = this.endPoint.get('Temperature')?.rawState?.color;
    }

    const dvState: DeviceState = {
      renderState: 'T: ' + this.endPoint.get('Temperature')?.rawState?.value + '°C'
        + 'H: ' + this.endPoint.get('Relative Humidity')?.rawState?.value + '%',
      rawState: {
        color,
        temperature: this.endPoint.get('Temperature')?.rawState?.value,
        humidity: this.endPoint.get('Relative Humidity')?.rawState?.value,
      }
    };
    return dvState;
  }
}
