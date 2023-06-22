import {BaseBleSigmeshController} from '@modules/apollo/widget/smart-dashboard-v1/models/blemesh/base-ble-sigmesh-controller';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
  DeviceControllerCallbackFunction
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';

export class BleEnergySensor extends BaseBleSigmeshController {

  iconUrl = './assets/apollo/icon/bulb-light.svg';
  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback: DeviceControllerCallbackFunction) {

    super(nodeTree, apollo, cd, dialog, callback);
  }

  renderIconUrlOnMap(): string {
    return this.iconUrl;
  }


}
