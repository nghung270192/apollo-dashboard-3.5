import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  DeviceState,
  EDevCallbackEvent
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {Observable, SubscriptionLike} from 'rxjs';
import {
  HomeAssistantService,
  IotDevice
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {HassEntity, StateChangedEvent} from 'home-assistant-js-websocket';
import {
  DqsmartGatewayNodeTreeImpl,
  DqsmartNodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {StatusColor} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {ChangeDetectorRef, Type} from '@angular/core';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';

export abstract class BaseDqsmartController extends DeviceControllerAbstract {

  iotDevice: IotDevice;
  dqsmartNodeTreeImpl: DqsmartNodeTreeImpl;

  public subscription: SubscriptionLike;
  dqSmartGatewayNode: DqsmartGatewayNodeTreeImpl;


  constructor(nodeTree: NodeTree,
              public apollo: ApolloWidgetContext,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              public callback?: DeviceControllerCallbackFunction) {
    super(nodeTree);
    this.dqsmartNodeTreeImpl = new DqsmartNodeTreeImpl(nodeTree);
    this.iotDevice = new IotDevice(this.dqsmartNodeTreeImpl.hassEntity);

    this.apollo.apolloNodeTreeService.getApolloNodeTree(nodeTree?.additionalInfo?.gatewaySource.id).subscribe(res => {
      if (res) {
        this.dqSmartGatewayNode = new DqsmartGatewayNodeTreeImpl(res, apollo);
        this.apollo.dqsmartService.getState(this.dqSmartGatewayNode.hassUrl, this.dqSmartGatewayNode.token,
          this.iotDevice.entityId).subscribe(res => {
          if (res) {
            this.iotDevice = new IotDevice(res);
            this.updateNewState(null);
            this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
          }
        });
      }
    });
  }


  hasToggle(): boolean {
    return false;
  }

  renderIcon(): string {
    return this.iotDevice.icon;
  }

  renderIconUrlOnMap(): string {
    return this.iotDevice.iconUrlCommon;
  }

  renderName(): string {
    return this.iotDevice.name;
  }


  renderDeviceTypeIcon(): string {
    return this.iotDevice.getPlattform();
  }

  subscribe(): void {
    this.subscription = this.apollo.dqsmartSubjectObserver.subscribe(res => {
      if (res.model === GatewayModel.DQSMART) {
        const stateChangedEvent: StateChangedEvent = res.newState as StateChangedEvent;
        if (stateChangedEvent.data.entity_id === this.iotDevice.entityId && stateChangedEvent.data.new_state) {
          this.iotDevice = new IotDevice(stateChangedEvent.data.new_state);
          this.updateNewState(this.iotDevice.hassEntity);
          this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
        }
      }
    });
  }

  unSubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle(params?: any): Observable<any> {
    return this.callServices(
      params ? HomeAssistantService.turnOff : HomeAssistantService.turnOn,
      {entity_id: this.iotDevice.entityId});
  }

  renderState(): DeviceState {
    return {
      renderState: this.iotDevice.state,
      rawState: {
        color: this.iotDevice.state === 'on' ? StatusColor.on : this.iotDevice.state === 'off' ? StatusColor.off : StatusColor.unknown,
        onOffState: this.iotDevice.state === 'on'
      }
    };
  }

  public callServices(service: HomeAssistantService, serviceData: any): Observable<any> {
    return this.apollo.dqsmartService.callServices(this.dqSmartGatewayNode.hassUrl,
      this.dqSmartGatewayNode.token,
      this.iotDevice.domain, service, serviceData);
  }

  entityClick(): any {

  }

  abstract updateNewState(hassEntity: HassEntity | null): void;
}

export class DqsmartUnknownEntity extends BaseDqsmartController {
  updateNewState(hassEntity: HassEntity | null): void {
  }

}
