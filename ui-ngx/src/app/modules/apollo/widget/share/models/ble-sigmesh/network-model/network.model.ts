import {NetkeyBleI, NetkeyBleImp, NetkeyModel} from './netkey.model';
import {AppkeyBleImp, AppkeyModel} from './appkey.model';
import {ProvisionerBleImp, ProvisionerModel} from './provisioner.model';
import {NodeBleI, BleNodesImpl, NodeModel} from './node.model';
import {SceneBleImp, SceneModel} from './scene.model';
import {GroupBleImp, GroupModel} from './group.model';


export interface NetworkExclusions {
  'ivIndex': 0;
  'addresses': string[];
}

export interface NetworkInfor {
  '$schema'?: string;
  'id'?: string;
  'version'?: string;
  'meshUUID'?: string;
  'meshName'?: string;
  'timestamp'?: string;
  'partial'?: boolean;
  'networkExclusions'?: Array<NetworkExclusions>;

  [key: string]: any;
}

export interface NetworkConfigModel extends NetworkInfor {
  'netKeys': Array<NetkeyModel>;
  'appKeys': Array<AppkeyModel>;
  'provisioners'?: Array<ProvisionerModel>;
  'nodes': Array<NodeModel>;
  'groups': Array<GroupModel>;
  'scenes': Array<SceneModel>;
}

export const defaultNetworkConfig: NetworkConfigModel = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  id: 'http://www.bluetooth.com/specifications/assigned-numbers/mesh-profile/cdb-schema.json#',
  version: '1.0.0',
  meshUUID: '2777BA3B-1855-4FFD-BB64-E408C9D18932',
  meshName: 'nRF Mesh Network',
  timestamp: '2022-10-06T22:07:29+07:00',
  partial: false,
  netKeys: [
    {
      name: 'Network Key 1',
      index: 0,
      key: 'A2D93C9EE9AA4CD6608C1DBF872EA854',
      phase: 0,
      minSecurity: 'insecure',
      timestamp: '2022-10-06T22:07:29+07:00'
    }
  ],
  appKeys: [
    {
      name: 'Application Key 1',
      index: 0,
      boundNetKey: 0,
      key: '244718460236DE0AC42E7153BE4D13C2'
    },
    {
      name: 'Application Key 2',
      index: 1,
      boundNetKey: 0,
      key: '0F7A41BB4CFA8410C46B2B3B58F181A5'
    },
    {
      name: 'Application Key 3',
      index: 2,
      boundNetKey: 0,
      key: '9A0E00E2578166C95F782816CA731151'
    }
  ],
  provisioners: [
    {
      provisionerName: 'nRF Mesh Provisioner',
      UUID: '13599739-7439-4F5B-9607-B610DF9C5229',
      allocatedUnicastRange: [
        {
          lowAddress: '0001',
          highAddress: '199A'
        }
      ],
      allocatedGroupRange: [
        {
          lowAddress: 'C000',
          highAddress: 'CC9A'
        }
      ],
      allocatedSceneRange: [
        {
          firstScene: '0001',
          lastScene: '3333'
        }
      ]
    }
  ],
  nodes: [
    {
      UUID: '13599739-7439-4F5B-9607-B610DF9C5229',
      name: 'nRF Mesh Provisioner',
      deviceKey: 'B1FD0C5B0F3CB3E27BD1D93B9E5C5429',
      unicastAddress: '0001',
      security: 'insecure',
      configComplete: false,
      features: {
        friend: 2,
        lowPower: 2,
        proxy: 2,
        relay: 2
      },
      defaultTTL: 5,
      netKeys: [
        {
          index: 0,
          updated: false
        }
      ],
      appKeys: [
        {
          index: 0,
          updated: false
        },
        {
          index: 1,
          updated: false
        },
        {
          index: 2,
          updated: false
        }
      ],
      elements: [
        {
          name: 'Element: 0x0001',
          index: 0,
          location: '0000',
          models: [
            {
              modelId: '0001',
              bind: [],
              subscribe: []
            }
          ]
        }
      ],
      excluded: false
    }
  ],
  groups: [],
  scenes: [],
  networkExclusions: []
};

export type myCallbackInterface = (event: string, value: any) => void;

export class BleNetwork {
  netKeys: NetkeyBleImp;
  appKeys: AppkeyBleImp;
  provisioners?: ProvisionerBleImp;
  nodes: BleNodesImpl;
  groups: GroupBleImp;
  scenes: SceneBleImp;

  constructor(public network: NetworkConfigModel) {
    this.netKeys = new NetkeyBleImp(network);
    this.appKeys = new AppkeyBleImp(network);
    this.provisioners = new ProvisionerBleImp(network);
    this.nodes = new BleNodesImpl(network);
    this.groups = new GroupBleImp(network);
    this.scenes = new SceneBleImp(network);
  }

  /*
  constructor(networkConfig:NetworkConfigModel ){
    super(networkConfig)
    this.networkConfig.appKeys.forEach(key=>{
      this.appKeys.set(key.index,key);
    })
    this.networkConfig.netKeys.forEach(key=>{
      this.netKeys.set(key.index,key);
    })
  }

  getNetworkConfig():NetworkConfigModel{
    this.networkConfig.netKeys = [...this.netKeys.values()];
    this.networkConfig.appKeys= [...this.appKeys.values()];
    this.networkConfig.provisioners= [...this.provisioners.values()];
    this.networkConfig.nodes= [...this.nodes.values()];
    this.networkConfig.groups= [...this.groups.values()];
    this.networkConfig.scenes= [...this.scenes.values()];
    return this.networkConfig;
  }
*/

}


