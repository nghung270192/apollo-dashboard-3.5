import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device.model';
import {HubNodeTreeImpl, NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  ConvertBleElementToUnicast,
  DeviceControllerCallbackFunction,
  DeviceState, EDevCallbackEvent, renderBleLightState
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {Observable, of, SubscriptionLike} from 'rxjs';
import {BleNodeViewer, NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {ModelIcon, NodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v1/models/common-type.model';
import {CommonProductName, ProductModel} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';
import {
  LightControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/light-controller.component';
import {
  RadarSensorComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/radar-sensor.component';

export class BaseBleSigmeshController extends DeviceControllerAbstract {
  bleNodeViewer: BleNodeViewer = new BleNodeViewer();
  hubNodeTree: HubNodeTreeImpl;

  private _onOff: any = null;
  private _lightness: number = null;
  private subscription: SubscriptionLike;

  constructor(nodeTree: NodeTree,
              public apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private callback: DeviceControllerCallbackFunction) {
    super(nodeTree);

    if (this.additionalInfo && this.additionalInfo?.entity) {
      this.bleNodeViewer = new BleNodeViewer(nodeTree?.additionalInfo?.entity as NodeModel);
      this.updateNewState();
    }

    if (this.additionalInfo && this.additionalInfo?.hubNodeTreeId) {
      apollo.hubNodeTrees.get(this.additionalInfo?.hubNodeTreeId.id);
      apollo.apolloNodeTreeService.getApolloNodeTree(this.additionalInfo?.hubNodeTreeId.id).subscribe(
        value => {
          this.hubNodeTree = new HubNodeTreeImpl(value);
        }
      );
    }
  }

  private updateNewState() {
    const bleState = this.apollo.bleNodeState.get(this.bleNodeViewer.unicastAddress);
    if (bleState && bleState?.status) {
      this.lightness = bleState?.lightnessStatus;
      this.onOff = bleState?.onOffStatus;
    } else {
      this.lightness = null;
      this.onOff = null;
    }
    if (this.callback) {
      this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
    }
    ;
    this.cd.detectChanges();
  }

  subscribe(): void {
    this.subscription = this.apollo.apolloService.eventTaskSubject.subscribe((event) => {
      if (event === EventTask.REQUEST_UPDATE_NEW_STATE) {
        this.updateNewState();
      }
    });
  }

  unSubscribe(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  renderDeviceTypeIcon(): string {
    return ModelIcon.blemesh;
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

  sceneCall(params: any): boolean {
    return false;
  }

  setLightness(params: any): Observable<any> {

    return this.apollo.hubService.bleHubService.setLightness(this.hubNodeTree?.tbDeviceId,
      ConvertBleElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), params?.lightness);
  }

  getLightness(params: any): Observable<any> {
    return of(this._lightness);
  }

  setHsl(params: any) {
    return this.apollo.hubService.bleHubService.setHsl(this.hubNodeTree?.tbDeviceId,
      ConvertBleElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), params?.hsl?.h, params?.hsl?.s, params?.hsl?.l);
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
        ConvertBleElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), 0);
    } else {
      return this.apollo.hubService.bleHubService.setOnOff(this.hubNodeTree?.tbDeviceId,
        ConvertBleElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), 1);
    }
  }

  renderIcon(): string {
    return this.bleNodeViewer?.renderIcon;
  }

  renderName(): string {
    return this.bleNodeViewer?.unicastAddress + ' ' + this.bleNodeViewer?.name;
  }

  hasToggle(): boolean {
    return this.bleNodeViewer?.product?.model === ProductModel.light;
  }

  entityClick(): any {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        nodeTreeController: this,
      }
    };
    if (this.bleNodeViewer?.product?.model === ProductModel.light) {
      this.dialog.open(LightControllerComponent, dialogConfig).afterClosed().subscribe();
    } else if (this.bleNodeViewer?.product?.model === ProductModel.sensor) {
      this.dialog.open(RadarSensorComponent, dialogConfig).afterClosed().subscribe();
    }
  }

  getSettingDialog(): any {
  }

  renderIconUrlOnMap(): string {
    let icon = './assets/apollo/icon/device-unknown.svg';
    if (this.bleNodeViewer.product?.model === ProductModel.light) {
      if (this.lightness && this.lightness > 0) {
        icon = './assets/apollo/icon/bulb-light-on.svg';
      } else if (this.lightness && this.lightness === 0) {
        icon = './assets/apollo/icon/bulb-light-off.svg';
      } else {
        icon = './assets/apollo/icon/bulb-light.svg';
      }
    } else {
      switch (this.bleNodeViewer.product.pid2Enum) {
        case CommonProductName.pirSensor:
          icon = './assets/apollo/icon/motion-sensor.svg';
          break;
        case CommonProductName.motionSensor:
          icon = './assets/apollo/icon/motion-sensor.svg';
          break;
        case CommonProductName.gateway:
          icon = './assets/apollo/icon/device-unknown.svg';
          break;
        case CommonProductName.repeaterApollo:
          icon = './assets/apollo/icon/device-unknown.svg';
          break;
        case CommonProductName.doubleWing:
          icon = './assets/apollo/icon/device-unknown.svg';
          break;
        case CommonProductName.provisioner:
          icon = './assets/apollo/icon/device-unknown.svg';
          break;
        case CommonProductName.temperatureSensor:
          icon = './assets/apollo/icon/device-unknown.svg';
          break;
        case CommonProductName.switch1:
          icon = './assets/apollo/icon/device-unknown.svg';
          break;
        default:
          icon = './assets/apollo/icon/device-unknown.svg';
      }
    }

    return icon;
  }

  event: EventEmitter<EDevCallbackEvent>;
}
