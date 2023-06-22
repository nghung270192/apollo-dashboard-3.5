import {Observable, of, SubscriptionLike} from 'rxjs';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {
  HubNodeTreeImpl,
  NodeTree,
  NodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  ApolloWidgetContext
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {ChangeDetectorRef, EventEmitter, Type} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CommonProductName, ProductModel} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';
import {
  LightControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/light-controller.component';
import {
  ModelIcon,
  NodeTreeInfoBase,
  StatusColor
} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity.model';
import {PelabEntityImpl} from '@modules/apollo/widget/share/models/pelab/pelab.model';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/pelab/pelab.model';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v1/models/common-type.model';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {ApolloDeviceModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-hub/apollo-hub';
import {
  ZigbeeGenerateComponentDevice
} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee-generate-component-device.model';
import {
  DqsmartDeviceControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/base-dqsmart-controller';
import {
  RadarSensorComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/device/dialog/radar-sensor.component';
import {BleNodeViewer} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-node-viewer';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function ConvertBleElementToUnicast(baseUnicast: string, element: number): string {
  return (Number('0x' + baseUnicast) + element).toString(16).padStart(4, '0').toUpperCase();
}

export enum EDevCallbackEvent {
  UPDATE_NEW_STATE = 'UPDATE_NEW_STATE',
}

export type DeviceControllerCallbackFunction = (event: EDevCallbackEvent | string) => void;

export interface DeviceState {
  rawState: {
    color?: string;
    onOffState?: boolean;
    lightness?: any;
    [key: string]: any;
  };
  renderState?: string;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderBleLightState(onOff: number, lightness: number): DeviceState {
  let strState = 'unknown';

  if (onOff !== undefined) {
    if (!onOff) {
      strState = 'OFF';
    } else {
      strState = 'ON';
    }
    if (lightness !== undefined && lightness !== null) {
      strState = strState.concat('  ' + lightness?.toString() + '%');
    }
  } else {
    if (lightness !== undefined && lightness !== null) {
      if (lightness === 0) {
        strState = 'OFF';
      } else {
        strState = 'ON';
      }
      strState = strState.concat('  ' + lightness?.toString() + '%');
    }
  }

  return {
    rawState: {
      color: (onOff == null && lightness == null) ? StatusColor.unknown : ((onOff) || (lightness)) ? StatusColor.on : StatusColor.off,
      onOffState: !!((onOff) || (lightness)),
    },
    renderState: strState
  };
}

export interface BleStateParams {
  address: string;
  value: string;
}

export class BleDeviceNodeTreeController extends DeviceControllerAbstract {
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

export class PelabDeviceNodeTreeController extends DeviceControllerAbstract {
  private pelabDevice: PelabEntityImpl;
  private gateway: PelabGatewayNodeTreeImpl;
  lightness: number;
  state: boolean;

  timeOutId: any;

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              private dialog: MatDialog,
              public callback?: DeviceControllerCallbackFunction) {
    super(nodeTree);
    this.pelabDevice = new PelabEntityImpl(nodeTree?.additionalInfo?.entity);
    this.gateway = apollo.pelabGateway.get(this.additionalInfo?.gatewaySource?.id);
    this.gateway.getDevice(this.pelabDevice.deviceAdressStr).subscribe(res => {
      if (res) {
        this.pelabDevice = new PelabEntityImpl(res);
        this.lightness = this.pelabDevice.dimmingValue;
        this.state = !!this.pelabDevice.deviceStatus;

        this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
      }
    });


  }

  renderDeviceTypeIcon(): string {
    return ModelIcon.lorawan;
  }

  renderName(): string {
    return this.pelabDevice.deviceName;
  }

  hasToggle(): boolean {
    return true;
  }


  subscribe(): void {
    this.timeOutId = setInterval(() => {
      this.gateway.getDevice(this.pelabDevice.deviceAdressStr).subscribe(res => {
        if (res) {
          this.pelabDevice = new PelabEntityImpl(res);
          this.lightness = this.pelabDevice.dimmingValue;
          this.state = !!this.pelabDevice.deviceStatus;

          this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
        }
      });
    }, 60000);
  }

  unSubscribe(): void {
    if (this.timeOutId) {
      clearInterval(this.timeOutId);
    }
  }


  toggle(params?: any): Observable<any> {
    this.state = !this.state;
    return this.gateway.setState(this.lightness !== undefined ? this.lightness : 100, this.state,
      false, [this.pelabDevice.deviceAdressStr]);
  }

  renderState(): DeviceState {
    return {
      rawState: {
        color: this.state ? StatusColor.on : !this.state ? StatusColor.off : StatusColor.unknown,
        onOffState: this.state,
        lightness: this.lightness
      },
      renderState: this.state ? 'On' : 'Off' + ' ' + this.lightness
    };
  }

  renderIcon(): string {
    return 'light-bulb-v2';
  }

  entityClick(): any {
  }

  getSettingDialog(): any {
  }

  renderIconUrlOnMap(): string {
    return './assets/apollo/icon/device-unknown.svg';
  }

  event: EventEmitter<EDevCallbackEvent>;
}


export class DeviceControllerComponent {
  /*public create(nodeTree: NodeTree,
                apollo: ApolloWidgetContext,
                cd: ChangeDetectorRef,
                dialog-controller: MatDialog,
                callback: DeviceControllerCallbackFunction): DeviceControllerAbstract {
    if (!nodeTree) {
      return null;
    }

    if (nodeTree.model === GatewayModel.APOLLO) {
      if (nodeTree?.additionalInfo?.model === ApolloDeviceModel.BLE_SIG_MESH) {
        const bleClass = new BleDeviceNodeTreeController(nodeTree, apollo, cd, dialog-controller, callback);

        return bleClass;
      } else if (nodeTree?.additionalInfo?.model === ApolloDeviceModel.ZIGBEE) {
        const zigbeeClass = new ZigbeeGenerateComponentDevice();
        if (zigbeeClass) {
          return zigbeeClass.create(nodeTree, apollo, cd, dialog-controller, callback);
        }
      }
    } else if (nodeTree.model === GatewayModel.DQSMART) {

      const dqsmart = new DqsmartDeviceControllerComponent();
      if (dqsmart) {
        return dqsmart.create(nodeTree, apollo, cd, dialog-controller, callback);
      }

      // return new DqsmartDeviceNodeTreeController(nodeTree, apollo, cd, dialog-controller, callback);

    } else if (nodeTree.model === GatewayModel.PELAB_LORA) {
      return new PelabDeviceNodeTreeController(nodeTree, apollo, cd, dialog-controller, callback);
    }
    return null;
  }*/

  public getClass(nodeTree: NodeTree): Type<DeviceControllerAbstract> {
    if (!nodeTree) {
      return null;
    }

    if (nodeTree.model === GatewayModel.APOLLO) {
      if (nodeTree?.additionalInfo?.model === ApolloDeviceModel.BLE_SIG_MESH) {
        return BleDeviceNodeTreeController;
      } else if (nodeTree?.additionalInfo?.model === ApolloDeviceModel.ZIGBEE) {
        const zigbeeClass = new ZigbeeGenerateComponentDevice();
        return zigbeeClass.getClass(nodeTree);
      }
    } else if (nodeTree.model === GatewayModel.DQSMART) {
      const dqsmart = new DqsmartDeviceControllerComponent();
      if (dqsmart) {
        return dqsmart.getClass(nodeTree);
      }
      // return new DqsmartDeviceControllerComponent().getClass(nodeTree);

    } else if (nodeTree.model === GatewayModel.PELAB_LORA) {
      return PelabDeviceNodeTreeController;
    }
    return null;
  }
}
