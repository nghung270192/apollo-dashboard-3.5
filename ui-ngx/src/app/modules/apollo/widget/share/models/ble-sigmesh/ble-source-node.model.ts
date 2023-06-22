export enum BleSourceNode {
  FROM_GROUP = 'FROM_GROUP',
  FROM_NODE = 'FROM_NODE'
}


export const SourceNodeLabelMapping: Record<BleSourceNode, string> = {
  [BleSourceNode.FROM_GROUP]: 'Nhóm',
  [BleSourceNode.FROM_NODE]: 'Thiết bị',

};
