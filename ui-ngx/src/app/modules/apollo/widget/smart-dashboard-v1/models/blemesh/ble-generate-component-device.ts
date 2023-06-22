import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {ChangeDetectorRef, Type} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
  DeviceControllerCallbackFunction
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device.model';
import {BleNodeViewer} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';


export class BleGenerateComponentDevice {
  providerClass: { [key: string]: Type<DeviceControllerAbstract> } = {

    unknown: undefined
  };

  public create(nodeTree: NodeTree,
                apollo: ApolloWidgetContext,
                cd: ChangeDetectorRef,
                dialog: MatDialog,
                callback: DeviceControllerCallbackFunction): DeviceControllerAbstract {
    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {

    }
    return null;
  }

  public getClass(nodeTree: NodeTree): Type<DeviceControllerAbstract> {

    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {

      const bleNodeViewer: BleNodeViewer = new BleNodeViewer(nodeTree?.additionalInfo?.entity);

    }
    return null;
  }
}
