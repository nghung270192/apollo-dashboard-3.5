import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Observable} from 'rxjs';
import {HassEntity} from 'home-assistant-js-websocket';
import {Type} from '@angular/core';

import {DqsmartClimateController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/dqsmart-climate-controller';
import {DqsmartLightController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/dqsmart-light-controller';
import {
   DqsmartUnknownEntity
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/base-dqsmart-controller';
import {DqsmartTemperatureController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/dqsmart-temperature-controller';
 import {DqsmartCoverController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/dqsmart-cover-controller';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {DqsmartSceneController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/dqsmart-scene-controller';

export class DqsmartGatewayNodeTreeImpl extends NodeTreeImpl {

  constructor(nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    super(nodeTree);

  }

  get username(): string {
    return this.additionalInfo.username;
  }

  set username(username: string) {
    this.additionalInfo.username = username;
  }

  get hassUrl(): string {
    return this.additionalInfo.hassUrl;
  }

  set hassUrl(hassUrl: string) {
    this.additionalInfo.hassUrl = hassUrl;
  }

  get password(): string {
    return this.additionalInfo.username;
  }

  set password(password: string) {
    this.additionalInfo.password = password;
  }

  get token(): string {
    return this.additionalInfo.token;
  }

  set token(token: string) {
    this.additionalInfo.token = token;
  }

  save(): Observable<NodeTree> {
    return this.apollo.apolloNodeTreeService.saveApolloNodeTree(this.toApolloNodeTree());

  }

}


export class DqsmartNodeTreeImpl extends NodeTreeImpl {
  constructor(nodeTree: NodeTree) {
    super(nodeTree);
  }

  get hassEntity(): HassEntity {
    return this.additionalInfo?.entity as HassEntity;
  }

  get gatewayId(): string {
    return this.additionalInfo?.gatewaySource?.id;
  }

}

export const DqsmartDeviceProvider: { [key: string]: Type<DeviceControllerAbstract> } = {
  unknown: DqsmartUnknownEntity,
  onOff: DqsmartLightController,
  dimming: DqsmartLightController,
  cct: DqsmartLightController,
  rgbw: DqsmartLightController,
  rgbCct: DqsmartLightController,
  cover: DqsmartCoverController,
  dqsmartMediaPlayer: DqsmartUnknownEntity,
  socket: DqsmartUnknownEntity,
  lock: DqsmartUnknownEntity,
  doorBinarySensor: DqsmartUnknownEntity,
  moistureBinarySensor: DqsmartUnknownEntity,
  smokeBinarySensor: DqsmartUnknownEntity,
  motionBinarySensor: DqsmartUnknownEntity,
  gasBinarySensor: DqsmartUnknownEntity,
  buttonBinarySensor: DqsmartUnknownEntity,
  vibrationSensor: DqsmartUnknownEntity,
  temperatureSensor: DqsmartTemperatureController,
  illuminanceSensor: DqsmartUnknownEntity,
  aqiSensor: DqsmartUnknownEntity,
  humiditySensor: DqsmartUnknownEntity,
  siren: DqsmartUnknownEntity,
  all_lights: DqsmartUnknownEntity,
  all_scripts: DqsmartUnknownEntity,
  all_automations: DqsmartUnknownEntity,
  script: DqsmartSceneController,
  dqsmartClimate: DqsmartClimateController,
  binarySensor: DqsmartUnknownEntity,
  sensor: DqsmartUnknownEntity
};
