import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloTreeId} from '@modules/apollo/widget/share/models/apollo-tree-id';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree-id';
import {DeviceId} from '@shared/models/id/device-id';
import {HubSource} from '@modules/apollo/widget/share/models/apollo-hub/hub.model';

import {ApolloDeviceModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {ZigbeeDevice} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {
  AutoTypeControl,
  ComparisonType
} from '@modules/apollo/widget/smart-dashboard-v2/models/automation/automation.model';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';

export const defaultCenterLocationOpenStreetMap: MapLocation = {
  lat: 15.892163974623484,
  lng: 108.26889038085939,
  label: 'Việt Nam'
};


export enum MapType {
  openStreetMap = 'open_stree_map',
  imageMap = 'image_map'
}

export enum StatusColor {
  on = 'red',
  off = '#1a237e',
  unknown = '#6e6e6e'
}

export enum ModelIcon {
  blemesh = 'bluetooth',
  wifi = 'wifi',
  zigbee = 'zigbee',
  lorawan = 'lorawan'
}

export interface MapLocation {
  lng: number;
  lat: number;
  label: string;
}

export const MapTypeMappingLable: Record<MapType, string> = {
  image_map: 'Image Map',
  open_stree_map: 'Open Street Map'

};

export interface SceneInfo {
  entity?: any;
  hubNodeTreeId?: ApolloNodeTreeId;
  sceneTarget?: string;


}

export interface PelabInfo extends SceneInfo {
  username?: string;
  hostname?: string;
  password?: string;
  token?: string;
  apiKey?: string;
}

export interface DqsmartInfo extends PelabInfo {
  hassUrl?: string;
  username?: string;
  password?: string;
  token?: string;
}

export interface SchedulerInfo extends DqsmartInfo {
  id?: string;
  enable?: boolean;
  hubNodeTreeId?: ApolloNodeTreeId;
  inputScript?: InputScript;
  outputScript?: OutputScript;
}

export interface InputScript {
  fromDeviceModel?: ApolloDeviceModel;
  fromZbNodes?: ZigbeeDevice;
  fromZbEndpoint?: number;
  fromZbValue?: any;
  fromZbName?: string;
  fromTimes?: string;
  fromWeekDays?: Array<number>;
}

export class InputScriptImpl implements InputScript {
  fromDeviceModel: ApolloDeviceModel;
  fromZbEndpoint: number;
  fromZbValue: any;
  fromZbNodes: ZigbeeDevice;
  fromZbName: string;
  fromTimes: string;
  fromWeekDays: Array<number>;


  constructor(inputScript: InputScript) {
    this.fromDeviceModel = inputScript?.fromDeviceModel;
    this.fromZbEndpoint = inputScript?.fromZbEndpoint;
    this.fromZbValue = inputScript?.fromZbValue;
    this.fromZbNodes = inputScript?.fromZbNodes;
    this.fromZbName = inputScript?.fromZbName;
    this.fromTimes = inputScript?.fromTimes;
    this.fromWeekDays = inputScript?.fromWeekDays;
  }
}

export interface OutputScript {
  toDeviceModel?: ApolloDeviceModel;
  toControlType?: AutoTypeControl;
  toBleScene?: string;
  toBleGroup?: string;
  toBleTarget?: string;
  toBleValue?: any;
}

export class OutputScriptImpl implements OutputScript {
  toBleGroup: string = null;
  toBleScene: string = null;
  toBleTarget: string = null;
  toControlType: AutoTypeControl = null;
  toDeviceModel: ApolloDeviceModel = null;
  toBleValue: any = null;

  constructor(public outputScript: OutputScript) {
    this.toBleGroup = outputScript?.toBleGroup;
    this.toBleScene = outputScript?.toBleScene;
    this.toControlType = outputScript?.toControlType;
    this.toDeviceModel = outputScript?.toDeviceModel;
    this.toBleValue = outputScript?.toBleValue;
  }

  toData(): OutputScript {
    return {
      toBleGroup: this.toBleGroup,
      toBleScene: this.toBleScene,
      toControlType: this.toControlType,
      toDeviceModel: this.toDeviceModel,
      toBleValue: this.toBleValue

    };
  }
}

export interface AutomationInfo {
  id?: string;
  enable?: boolean;
  comparison?: ComparisonType;
  hubNodeTreeId?: ApolloNodeTreeId;
  inputScript?: InputScript;
  outputScript?: OutputScript;
}

export interface TbDeviceId extends SchedulerInfo {
  tbDeviceId?: DeviceId;
  hubNodeTreeId?: ApolloNodeTreeId;
}

export interface NodeInfo extends TbDeviceId {
  model?: string;
  bleSceneAddress?: string;
  entity?: any;
}

export interface HubInfo {
  hubSource?: HubSource;
  gatewaySource?: ApolloNodeTreeId;
  bleNetKeys?: Array<string>;
  bleAppKeys?: Array<string>;
  bleGroups?: Array<string>;
  bleNodes?: Array<string>;
  bleScenes?: Array<string>;
  bleUnicastAddress?: string;
  zbGroups?: Array<string>;
  zbNodes?: Array<string>;
  zbScenes?: Array<string>;
}

export interface MapInfo extends NodeInfo {
  mapType?: MapType;
  iconBlock?: string;
  iconOnMap?: string;
  isShow?: boolean;
  urlImageMap?: string;
  mapImageLocation?: MapLocation;
  mapStreetLocation?: MapLocation;
}

export interface GroupInfor {
  model?: string;
  multiple?: boolean;
  entity?: any;
  hubNodeTreeId?: ApolloNodeTreeId;
}

export interface IconInfo extends MapInfo {
  urlIcon?: string;
  backgroundIcon?: string;
}

/*export interface NodeTreeInfoBase extends IconInfo {
}*/

export type NodeTreeInfoBase = HubInfo & IconInfo & GroupInfor & ZigbeeNodeTreeInfoBase & AutomationInfo;

export interface ZigbeeNodeTreeInfoBase {
  gatewaySource?: ApolloNodeTreeId;
  entity?: any;
}


export class NodeTreeInfoBaseImpl implements NodeTreeInfoBase {
  id: string;
  bleAppKeys: Array<string>;
  bleGroups: Array<string>;
  bleNetKeys: Array<string>;
  bleNodes: Array<string>;
  bleScenes: Array<string>;
  bleUnicastAddress: string;
  gatewaySource: ApolloNodeTreeId;
  hubSource: HubSource;
  iconBlock: string;
  iconOnMap: string;
  isShow: boolean;
  mapImageLocation: MapLocation;
  mapStreetLocation: MapLocation;
  mapType: MapType;
  tbDeviceId: DeviceId;
  urlIcon: string;
  urlImageMap: string;
  zbGroups: Array<string>;
  zbNodes: Array<string>;
  zbScenes: Array<string>;
  backgroundIcon?: string;
  entity?: any;
  model: string;
  bleSceneAddress: string;
  inputScript: InputScript;
  outputScript: OutputScript;
  enable: boolean;
  hubNodeTreeId: ApolloNodeTreeId;

  constructor(info: NodeTreeInfoBase) {
    this.bleAppKeys = info?.bleAppKeys;
    this.bleGroups = info?.bleGroups;
    this.bleNetKeys = info?.bleNetKeys;
    this.bleNodes = info?.bleNodes;
    this.bleScenes = info?.bleScenes;
    this.bleUnicastAddress = info?.bleUnicastAddress;
    this.gatewaySource = info?.gatewaySource;
    this.hubSource = info?.hubSource;
    this.iconBlock = info?.iconBlock;
    this.iconOnMap = info?.iconOnMap;
    this.isShow = info?.isShow;
    this.mapImageLocation = info?.mapImageLocation;
    this.mapStreetLocation = info?.mapStreetLocation;
    this.mapType = info?.mapType;
    this.tbDeviceId = info?.tbDeviceId;
    this.urlIcon = info?.urlIcon;
    this.urlImageMap = info?.urlImageMap;
    this.zbGroups = info?.zbGroups;
    this.zbNodes = info?.zbNodes;
    this.zbScenes = info?.zbScenes;
    this.backgroundIcon = info?.backgroundIcon;
    this.entity = info?.entity;
    this.model = info?.model;
    this.bleSceneAddress = info?.bleSceneAddress;
    this.inputScript = info?.inputScript;
    this.outputScript = info?.outputScript;
    this.enable = info?.enable;
    this.hubNodeTreeId = info?.hubNodeTreeId;
    this.apiKey = info?.apiKey;
    this.password = info?.password;
    this.token = info?.token;
    this.username = info?.username;
    this.hassUrl = info?.hassUrl;
    this.sceneTarget = info?.sceneTarget;
    this.id = info?.id;
    this.hostname = info?.hostname;
    this.comparison = info?.comparison;
    this.multiple = info?.multiple;

  }

  public toData(): NodeTreeInfoBase {
    return {
      entity: this.entity,
      bleAppKeys: this.bleAppKeys,
      bleGroups: this.bleGroups,
      bleNetKeys: this.bleNetKeys,
      bleNodes: this.bleNodes,
      bleScenes: this.bleScenes,
      bleUnicastAddress: this.bleUnicastAddress,
      gatewaySource: this.gatewaySource,
      hubSource: this.hubSource,
      iconBlock: this.iconBlock,
      iconOnMap: this.iconOnMap,
      isShow: this.isShow,
      mapImageLocation: this.mapImageLocation,
      mapStreetLocation: this.mapStreetLocation,
      mapType: this.mapType,
      tbDeviceId: this.tbDeviceId,
      urlIcon: this.urlIcon,
      urlImageMap: this.urlImageMap,
      zbGroups: this.zbGroups,
      zbNodes: this.zbNodes,
      zbScenes: this.zbScenes,
      backgroundIcon: this.backgroundIcon,
      model: this.model,
      bleSceneAddress: this.bleSceneAddress,
      inputScript: this.inputScript,
      outputScript: this.outputScript,
      enable: this.enable,
      hubNodeTreeId: this.hubNodeTreeId,
      apiKey: this.apiKey,
      password: this.password,
      token: this.token,
      username: this.username,
      hassUrl: this.hassUrl,
      sceneTarget: this.sceneTarget,
      id: this.id,
      hostname: this.hostname,
      comparison: this.comparison,
      multiple: this.multiple,
    };
  }

  apiKey: string;
  password: string;
  token: string;
  username: string;
  hostname: string;
  hassUrl: string;
  sceneTarget: string;
  comparison: ComparisonType;
  multiple: boolean;
}

export class RootNodeTree implements NodeTree {
  apolloTreeId: ApolloTreeId;
  type: NodeTreeType = NodeTreeType.ROOT;
  name = 'ROOT';

  constructor(apolloTreeId: ApolloTreeId) {
    this.apolloTreeId = apolloTreeId;
  }

}

export class NodeTreeEntity implements NodeTree {

  additionalInfo: any;
  apolloTreeId: ApolloTreeId;
  parentId: ApolloNodeTreeId;
  type: NodeTreeType;
  name: string;

  constructor(name: string,
              apolloTreeId: ApolloTreeId,
              parentId: ApolloNodeTreeId,
              type: NodeTreeType,
              additionalInfo: any) {
    this.additionalInfo = additionalInfo;
    this.apolloTreeId = apolloTreeId;
    this.parentId = parentId;
    this.type = type;
    this.name = name;
  }

}
