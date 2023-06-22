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
  DqsmartDeviceProvider,
  DqsmartGatewayNodeTreeImpl,
  DqsmartNodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {StatusColor} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {ChangeDetectorRef, Type} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';


export class DqsmartControllerProvider {

  public create(nodeTree: NodeTree,
                apollo: ApolloWidgetContext,
                cd: ChangeDetectorRef,
                dialog: MatDialog,
                callback: DeviceControllerCallbackFunction): DeviceControllerAbstract {

    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {
      const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(nodeTree);
      const iotDevice = new IotDevice(nodeTreeImpl.additionalInfo.entity as HassEntity);

      if (iotDevice && iotDevice.deviceType) {
        const dqsmartClass = DqsmartDeviceProvider[iotDevice.deviceType];

        if (dqsmartClass)
          {return new dqsmartClass(nodeTree, apollo, cd, dialog, callback);}
      }
    }
    return null;
  }

  public getClass(nodeTree: NodeTree): Type<DeviceControllerAbstract> {

    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {
      const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(nodeTree);
      const iotDevice = new IotDevice(nodeTreeImpl.additionalInfo.entity as HassEntity);
      if (iotDevice && iotDevice.deviceType) {
        return DqsmartDeviceProvider[iotDevice.deviceType];
      }

    }
    return null;
  }
}
