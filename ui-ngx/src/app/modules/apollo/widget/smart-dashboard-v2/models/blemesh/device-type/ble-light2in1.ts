import {
  BaseBleSigmeshController
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/base-ble-sigmesh-controller';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  ElementToUnicast,
  DeviceControllerCallbackFunction
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  LightRadarTogetherComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/light-2in1/light-radar-together.component';
import {Observable} from 'rxjs';
import {BleBaseLighting} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-base-lighting';


export class BleLight2in1 extends BleBaseLighting {

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {

    super(nodeTree, apollo, cd, dialog, callback);
  }

  hasToggle(): boolean {
    return true;
  }

  entityClick(): any {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        nodeTreeController: this,
      }
    };

    this.dialog.open(LightRadarTogetherComponent, dialogConfig).afterClosed().subscribe();
  }

  setAllDataSensor(params: {
    index: number;
    sensorData: {
      lowLevel: number;
      highLevel: number;
      delayTime: number;
      brightness: number;
      hlkSensitive: number;
      hlkDelayTime: number;
    };
  }): Observable<any> {
    return this.apollo.hubService.bleHubService.setAllMotionSensorData(this.hubNodeTree?.tbDeviceId,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index),
      this.bleNodeViewer?.cid,
      params?.sensorData?.lowLevel,
      params?.sensorData?.highLevel,
      params?.sensorData?.delayTime,
      params?.sensorData?.brightness,
      params?.sensorData?.hlkSensitive,
      params?.sensorData?.hlkDelayTime
    );
  }

  getAllDataSensor(params: { index: number }): Observable<any> {
    return this.apollo.hubService.bleHubService.getAllMotionSensorData(this.hubNodeTree?.tbDeviceId,
      this.bleNodeViewer?.cid,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index));
  }

}
