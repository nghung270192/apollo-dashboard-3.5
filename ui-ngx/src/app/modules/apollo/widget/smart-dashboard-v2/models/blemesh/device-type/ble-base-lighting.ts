import {
  BaseBleSigmeshController
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/base-ble-sigmesh-controller';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  ApolloWidgetContext,
  ResponseMethod
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  DeviceControllerCallbackFunction,
  DeviceState,
  EDevCallbackEvent,
  ElementToUnicast,
  renderBleLightState
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  BaseLightControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/base-light-controller/base-light-controller.component';
import {Observable, of} from 'rxjs';

export class BleBaseLighting extends BaseBleSigmeshController {


  private _onOff: any = null;
  private _lightness: number = null;

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {

    super(nodeTree, apollo, cd, dialog, callback);

    this.observable.subscribe(value => {
        value.data.forEach(value1 => {
          if (value1.method === ResponseMethod.onOffStatus) {
            this._onOff = value1.params?.value;
          } else if (value1.method === ResponseMethod.lightnessStatus) {
            this._lightness = value1.params?.value;
          }
        });
        this.updateNewState();
      }
    );
  }

  entityClick(): any {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        nodeTreeController: this,
      }
    };

    this.dialog.open(BaseLightControllerComponent, dialogConfig).afterClosed().subscribe();
  }


  get onOff(): number {
    return this._onOff;
  }

  set onOff(value: number) {
    this._onOff = value;
  }

  get lightness(): number {
    return this._lightness;
  }

  set lightness(value: number) {
    this._lightness = value;
  }

  setLightness(params: any): Observable<any> {

    return this.apollo.hubService.bleHubService.setLightness(this.hubNodeTree?.tbDeviceId,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), params?.lightness);
  }

  getLightness(params: any): Observable<any> {
    return of(this._lightness);
    /*return this.apollo.hubService.bleHubService.getLightness(this.hubNodeTree?.tbDeviceId,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index));*/
  }

  renderState(): DeviceState {
    return renderBleLightState(this.onOff, this.lightness);
  }

  toggle(params: any = {index: 0}): Observable<any> {
    /*if (this.lightness) {
      return this.apollo.hubService.bleHubService.setLightness(this.nodeInfo?.tbDeviceId.id, this.bleNodeViewer?.unicastAddress, 0);
    } else {
      return this.apollo.hubService.bleHubService.setLightness(this.nodeInfo?.tbDeviceId.id, this.bleNodeViewer?.unicastAddress, 100);
    }*/

    if (this.onOff) {
      return this.apollo.hubService.bleHubService.setOnOff(this.hubNodeTree?.tbDeviceId,
        ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), 0);
    } else {
      return this.apollo.hubService.bleHubService.setOnOff(this.hubNodeTree?.tbDeviceId,
        ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), 1);
    }
  }


  setHsl(params: any) {
    return this.apollo.hubService.bleHubService.setHsl(this.hubNodeTree?.tbDeviceId,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), params?.hsl?.h, params?.hsl?.s, params?.hsl?.l);
  }


  private updateNewState() {
    /*    const bleState = this.apollo.bleNodeState.get(this.bleNodeViewer.unicastAddress);
        if (bleState && bleState?.status) {
          this.lightness = bleState?.lightnessStatus;
          this.onOff = bleState?.onOffStatus;
        } else {
          this.lightness = null;
          this.onOff = null;
        }
        if (this.callback) {
          this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
        }*/

    this.cd.detectChanges();
  }
}
