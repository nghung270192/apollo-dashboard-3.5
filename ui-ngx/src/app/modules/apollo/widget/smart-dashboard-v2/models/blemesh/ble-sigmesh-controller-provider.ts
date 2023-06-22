import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {Type} from '@angular/core';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {BleNodeViewer} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-node-viewer';
import {BleEnergySensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-energy-sensor';
import {
  BaseBleSigmeshController
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/base-ble-sigmesh-controller';
import {BlePirSensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-pir-sensor';
import {BleBaseLighting} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-base-lighting';
import {BleLight2in1} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-light2in1';
import {DeviceType} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';


export class BleSigmeshControllerProvider {

  providerMap: Record<DeviceType, Type<DeviceControllerAbstract>> = {
    bikeSmartkey: BaseBleSigmeshController,
    'door-sensor': BaseBleSigmeshController,
    'energy-sensor': BleEnergySensor,
    'light-4-channel': BaseBleSigmeshController,
    'light-d': BleBaseLighting,
    'light-radar-2in1': BleLight2in1,
    'light-rgb': BleBaseLighting,
    'light-rgbd': BleBaseLighting,
    'light-rgbdw': BleBaseLighting,
    'light-rgbw': BleBaseLighting,
    'light-sensor': BaseBleSigmeshController,
    'light-w': BleBaseLighting,
    'motion-sensor': BlePirSensor,
    'pir-sensor': BlePirSensor,
    'radar-sensor': BlePirSensor,
    'rfid-reader': BaseBleSigmeshController,
    'temperature-sensor': BaseBleSigmeshController,
    'tube-light': BleBaseLighting,
    'uv-remote': BaseBleSigmeshController,
    'uv-sensor': BaseBleSigmeshController,
    gateway: BaseBleSigmeshController,
    hub: BaseBleSigmeshController,
    light: BleBaseLighting,
    lotsAvailableDisplay: BaseBleSigmeshController,
    lotsAvailableDistanceSensor: BaseBleSigmeshController,
    provisioner: BaseBleSigmeshController,
    repeater: BaseBleSigmeshController,
    switch: BaseBleSigmeshController,
    unknown: BaseBleSigmeshController
  };

  /*  public create(nodeTree: NodeTree,
                  apollo: ApolloWidgetContext,
                  cd: ChangeDetectorRef,
                  dialog: MatDialog,
                  callback: DeviceControllerCallbackFunction): DeviceControllerAbstract {
      if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {

      }
      return null;
    }*/

  public getClass(nodeTree: NodeTree): Type<DeviceControllerAbstract> {

    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {

      const bleNodeViewer = new BleNodeViewer(nodeTree?.additionalInfo?.entity);
      if (bleNodeViewer) {
        return this.providerMap[bleNodeViewer.product.type];
      }
    }
    return null;
  }
}
