import {NetworkConfigModel} from './network.model';

export interface Features {
  'friend': number;
  'lowPower': number;
  'proxy': number;
  'relay': number;
}

export interface Netkey {
  'index': number;
  'updated': boolean;
}

export interface AppKey {
  'index': number;
  'updated': boolean;
}

export interface Period {
  'numberOfSteps': number;
  'resolution': number;
}

export interface Retransmit {
  'count': number;
  'interval': number;
}

export interface Publish {
  'address': string;
  'index': number;
  'ttl': number;
  'period': Period;
  'retransmit': Retransmit;
  'credentials': number;
}

export interface Model {
  'modelId': string;
  'bind': Array<number>;
  'subscribe': Array<string>;
  'publish'?: Publish;
}

export interface TransmitTime {
  'count': number;
  'interval': number;
}

export interface Element {
  'name'?: string;
  'index'?: number;
  'location'?: string;
  'models'?: Array<Model>;
}

export interface NodeModel {
  'UUID': string;
  'name': string;
  'deviceKey': string;
  'unicastAddress': string;
  'security': string;
  'configComplete': boolean;
  'cid'?: string;
  'pid'?: string | any;
  'crpl'?: string;
  'defaultTTL': number;
  'features': Features;
  'secureNetworkBeacon'?: boolean;
  'networkTransmit'?: TransmitTime;
  'relayRetransmit'?: TransmitTime;
  'netKeys': Array<Netkey>;
  'appKeys': Array<AppKey>;
  'elements': Array<Element>;
  'excluded': boolean;
}

export class BleNode implements NodeModel {

  UUID: string;
  appKeys: Array<AppKey>;
  cid: string;
  configComplete: boolean;
  crpl: string;
  defaultTTL: number;
  deviceKey: string;
  elements: Array<Element>;
  excluded: boolean;
  features: Features;
  name: string;
  netKeys: Array<Netkey>;
  networkTransmit: TransmitTime;
  pid: any;
  relayRetransmit: TransmitTime;
  secureNetworkBeacon: boolean;
  security: string;
  unicastAddress: string;


  constructor(node: NodeModel) {
    if (node) {
      this.UUID = node?.UUID;
      this.appKeys = node?.appKeys;
      this.cid = node?.cid;
      this.configComplete = node?.configComplete;
      this.crpl = node?.crpl;
      this.defaultTTL = node?.defaultTTL;
      this.deviceKey = node?.deviceKey;
      this.elements = node?.elements;
      this.excluded = node?.excluded;
      this.features = node?.features;
      this.name = node?.name;
      this.netKeys = node?.netKeys;
      this.networkTransmit = node?.networkTransmit;
      this.pid = node?.pid;
      this.relayRetransmit = node?.relayRetransmit;
      this.secureNetworkBeacon = node?.secureNetworkBeacon;
      this.security = node?.security;
      this.unicastAddress = node?.unicastAddress;
    }
  }

}


export interface NodeBleI {
  nodes: Map<string, NodeModel>;
}

export class BleNodesImpl implements NodeBleI {
  nodes: Map<string, NodeModel> = new Map<string, NodeModel>();

  constructor(networkConfig?: NetworkConfigModel) {
    if (networkConfig && networkConfig?.nodes && Array.isArray(networkConfig?.nodes)) {
      this.nodes = new Map(networkConfig?.nodes.map(obj => [obj.unicastAddress, obj]));
    }
  }

  get nodeArray(): Array<NodeModel> {
    return [...this.nodes.values()];
  }

  getNodeArrayFromUnicastAddresses(nodesAddress: Array<string>): Array<NodeModel> {
    const nodes: Array<NodeModel> = [];
    if (nodesAddress && Array.isArray(nodesAddress)) {

      nodesAddress.forEach(res => {
        nodes.push(this.nodes.get(res));
      });
    }
    return nodes;
  }

}
