import {ChangeDetectorRef, Type} from '@angular/core';

import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device.model';
import {
  LumiRemoteB1acn01Model
} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/lumi.remote.b1acn01.model';
import {
  LumiRemoteB286acn01Model
} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/lumi.remote.b286acn01.model';
import {
  LumiSensorMotionAq2Model
} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/lumi.sensor.motion.aq2.model';
import {
  LumiSensorWleakAq1Model
} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/lumi.sensor.wleak.aq1.model';
import {LumiWeatherModel} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/lumi.weather.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {
  DeviceControllerCallbackFunction
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {ZigbeeDeviceImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/zigbee-controller';
import {DqhomeRe3} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re3';
import {DqhomeRe6} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re6';
import {DqhomeRe4} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re4';
import {DqhomeRe1} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re1';
import {DqhomeRe2} from '@modules/apollo/widget/smart-dashboard-v1/models/zigbee/sub-devices/dqhome.re2';


export class ZigbeeGenerateComponentDevice {
  providerZigbeeDeviceController: { [key: string]: Type<DeviceControllerAbstract> } = {
    'dqhome.cur': undefined,
    'dqhome.di': undefined,
    'dqhome.re1': DqhomeRe1,
    'dqhome.re2': DqhomeRe2,
    'dqhome.re3': DqhomeRe3,
    'dqhome.re4': DqhomeRe4,
    'dqhome.re6': DqhomeRe6,
    'lumi.ctrl_86plug.aq1': undefined,
    'lumi.ctrl_ln1.aq1': undefined,
    'lumi.ctrl_ln2.aq1': undefined,
    'lumi.ctrl_neutral1': undefined,
    'lumi.ctrl_neutral2': undefined,
    'lumi.curtain': undefined,
    'lumi.gas': undefined,
    'lumi.light.aqcn02': undefined,
    'lumi.plug': undefined,
    'lumi.relay.c2acn01': undefined,
    'lumi.remote.b186acn01': undefined,
    'lumi.remote.b1acn01': LumiRemoteB1acn01Model,
    'lumi.remote.b286acn01': LumiRemoteB286acn01Model,
    'lumi.sensor_86sw1': undefined,
    'lumi.sensor_86sw1lu': undefined,
    'lumi.sensor_86sw2': undefined,
    'lumi.sensor_86sw2Un': undefined,
    'lumi.sensor_cube': undefined,
    'lumi.sensor_ht': undefined,
    'lumi.sensor_magnet': undefined,
    'lumi.sensor_magnet.aq2': undefined,
    'lumi.sensor_motion': undefined,
    'lumi.sensor_motion.aq2': LumiSensorMotionAq2Model,
    'lumi.sensor_natgas': undefined,
    'lumi.sensor_smoke': undefined,
    'lumi.sensor_switch': undefined,
    'lumi.sensor_switch.aq2': undefined,
    'lumi.sensor_switch.aq3': undefined,
    'lumi.sensor_wleak.aq1': LumiSensorWleakAq1Model,
    'lumi.vibration.aq1': undefined,
    'lumi.weather': LumiWeatherModel,
    'unknown 1234560': undefined,
    'unknown 1234561': undefined,
    'unknown 1234562': undefined,
    'unknown 1234563': undefined,
    'unknown 1234564': undefined,
    'unknown 1234565': undefined,
    'unknown 1234566': undefined,
    'unknown 1234567': undefined,
    'unknown 12345670': undefined,
    'unknown 12345671': undefined,
    'unknown 12345672': undefined,
    'unknown 12345673': undefined,
    'unknown 12345674': undefined,
    'unknown 12345675': undefined,
    'unknown 12345676': undefined,
    'unknown 12345677': undefined,
    'unknown 12345678': undefined,
    'unknown 12345679': undefined,
    'unknown 1234567a': undefined,
    'unknown 1234567b': undefined,
    'unknown 1234567c': undefined,
    'unknown 1234567d': undefined,
    'unknown 1234568': undefined,
    'unknown 1234569': undefined,
    'unknown 123456a': undefined,
    'unknown 123456b': undefined,
    'unknown 123456c': undefined,
    'unknown 123456d': undefined,
    'unknown 123456e': undefined,
    'unknown 123456f': undefined,
    unknown: undefined
  };

  public create(nodeTree: NodeTree,
                apollo: ApolloWidgetContext,
                cd: ChangeDetectorRef,
                dialog: MatDialog,
                callback: DeviceControllerCallbackFunction): DeviceControllerAbstract {

    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {
      const zigbee = new ZigbeeDeviceImpl(nodeTree?.additionalInfo?.entity);
      if (zigbee && zigbee.model) {
        const zigbeeClass = this.providerZigbeeDeviceController[zigbee.model];
        if (zigbeeClass) {
          return new zigbeeClass(nodeTree, apollo, cd, dialog, callback);
        }
        return;
      }

    }
    return null;
  }

  public getClass(nodeTree: NodeTree): Type<DeviceControllerAbstract> {

    if (nodeTree && nodeTree?.additionalInfo && nodeTree?.additionalInfo?.entity) {
      const zigbee = new ZigbeeDeviceImpl(nodeTree?.additionalInfo?.entity);
      if (zigbee && zigbee.model) {
        return this.providerZigbeeDeviceController[zigbee.model];

      }

    }
    return null;
  }
}
