import {NetworkConfigModel} from './network.model';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';

export interface GroupModel {
  'name': string;
  'address': string;
  'parentAddress': string;
}

export interface GroupBleI {
  groups: Map<string, GroupModel>;
}

export class GroupBleImp implements GroupBleI {
  groups: Map<string, GroupModel> = new Map<string, GroupModel>();

  constructor(networkConfig?: NetworkConfigModel) {
    if (networkConfig && networkConfig?.groups && Array.isArray(networkConfig?.groups))
      {this.groups = new Map(networkConfig?.groups.map(obj => [obj.address, obj]));}
  }


  get groupArray() {
    return [...this.groups.values()];
  }


  sortGroup() {
    this.groups = new Map<string, GroupModel>([...this.groups].sort());
  }

  nextGroupAddress(): string {
    let groupAddressStart = 0xC000;
    let flag = false;

    while (!flag) {
      const addrString = groupAddressStart.toString(16).padStart(4, '0').toUpperCase();
      if (this.groups.has(addrString) == false) {
        flag = true;
      } else {
        groupAddressStart++;
      }
    }
    return groupAddressStart.toString(16).padStart(4, '0').toUpperCase();
  }

  createGroup(groupModel: GroupModel) {
    this.groups.set(groupModel.address, groupModel);
  }

  removeGroup(groupAddress: string) {
    this.groups.delete(groupAddress);
  }

  updateGroup(groupModel: GroupModel) {
    this.groups.set(groupModel.address, groupModel);
  }

  getDetailGroups(addresses: Array<string>): Array<GroupModel> {
    const groups: Array<GroupModel> = [];
    if (addresses && Array.isArray(addresses)) {

      addresses.forEach(addr => {
        groups.push(this.groups.get(addr));
      });
    }
    return groups;
  }

  getNodesFromGroup(address: string, nodeArray: Array<NodeModel>): Array<NodeModel> {
    const nodes: Array<NodeModel> = [];
    if (nodeArray && Array.isArray(nodeArray)) {
      nodeArray.forEach((node, nodeIdx) => {
        if (this.isInGroup(address, node)) {
          nodes.push(node);
        }
      });
    }
    return nodes;
  }


  getNodesFromGroups(address: Array<string>, nodeArray: Array<NodeModel>): Array<string> {
    const nodes: Array<string> = [];
    address.forEach(address => {
      nodeArray.forEach((node, nodeIdx) => {
        if (this.isInGroup(address, node)) {
          if (nodes.includes(node.unicastAddress) == false)
            {nodes.push(node.unicastAddress);}
        }
      });
    });
    return nodes;
  }

  getNodesDetailFromGroups(address: Array<string>, nodeArray: Array<NodeModel>): Array<NodeModel> {
    const nodes: Array<NodeModel> = [];
    if (nodeArray && Array.isArray(nodeArray) && address && Array.isArray(address)) {
      address.forEach(address => {
        nodeArray.forEach((node, nodeIdx) => {
          if (this.isInGroup(address, node)) {
            if (nodes.includes(node) == false)
              {nodes.push(node);}
          }
        });
      });
    }
    return nodes;
  }

  private isInGroup(groupAddress: string, node: NodeModel): boolean {
    let result = false;
    if (node || node.elements) {
      node.elements.find((element) => {
        element.models.find((model) => {
          if (model.subscribe.includes(groupAddress)) {
            result = true;
            return true;
          }
          if (model.publish?.address == groupAddress) {
            result = true;
            return true;
          }
        });
        if (result) {
          return result;
        }
      });
    }
    return result;
  }
}
