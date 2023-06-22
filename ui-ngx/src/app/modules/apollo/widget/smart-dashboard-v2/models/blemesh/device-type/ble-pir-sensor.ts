import {
  BaseBleSigmeshController
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/base-ble-sigmesh-controller';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  DeviceControllerCallbackFunction, DeviceState
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';

import {
  MotionSensorComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/motion-sensor-controller/motion-sensor.component';
import { Observable } from 'rxjs';

export class BlePirSensor extends BaseBleSigmeshController {
  toggle(params?: any): Observable<any> {
      throw new Error('Method not implemented.');
  }


  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {

    super(nodeTree, apollo, cd, dialog, callback);
  }

  entityClick(): any {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        nodeTreeController: this,
      }
    };

    this.dialog.open(MotionSensorComponent, dialogConfig).afterClosed().subscribe();
  }

  renderState(): DeviceState {
    return super.renderState();
  }

}
