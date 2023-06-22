export enum ApolloEntityTypeModel {
  NodeTreeType = 'NodeTreeType',
  GatewayModel = 'GatewayModel',
  HubModel = 'HubModel',
  HubSource = 'HubSource',
  SourceNode = 'SourceNode',
  ApolloDeviceModel = 'ApolloDeviceModel',
  ApolloDeviceSource = 'ApolloDeviceSource',
  ApolloSceneSource = 'ApolloSceneSource',
}

export enum NodeTreeType {
  ROOT = 'ROOT',
  AREA = 'AREA',
  GATEWAY = 'GATEWAY',
  DEVICE = 'DEVICE',
  HUB = 'HUB',
  GROUP = 'GROUP',
  SCENE = 'SCENE',
  SCHEDULER = 'SCHEDULER',
  AUTOMATION = 'AUTOMATION'
}


export const NodeTreeTypeLabelMapping: Record<NodeTreeType, string> = {
  [NodeTreeType.ROOT]: 'Root',
  [NodeTreeType.AREA]: 'Khu vực',
  [NodeTreeType.GATEWAY]: 'Gateway',
  [NodeTreeType.DEVICE]: 'Thiết bị',
  [NodeTreeType.HUB]: 'HUB',
  [NodeTreeType.GROUP]: 'Nhóm',
  [NodeTreeType.SCENE]: 'Ngữ cảnh',
  [NodeTreeType.SCHEDULER]: 'Hẹn giờ',
  [NodeTreeType.AUTOMATION]: 'Tự động'
};

export enum GatewayModel {
  APOLLO = 'APOLLO',
  DQSMART = 'DQSMART',
  PELAB_LORA = 'PELAB_LORA',
  // YELIGHT = "YELIGHT",
  // XIAOMI = "XIAOMI",
  // TUYA = "TUYA",
  // SONOFF = "SONOFF",
  // UNKNOWN = "UNKNOWN"
}

export const GatewayModelLabelMapping: Record<GatewayModel, string> = {
  [GatewayModel.APOLLO]: 'APOLLO',
  [GatewayModel.DQSMART]: 'DQSMART',
  [GatewayModel.PELAB_LORA]: 'PELAB_LORA',
  // [EntityModel.YELIGHT]: "YELIGHT",
  // [EntityModel.XIAOMI]: "XIAOMI",
  // [EntityModel.TUYA]: "TUYA",
  // [EntityModel.SONOFF]: "SONOFF",
  // [EntityModel.UNKNOWN]: "UNKNOWN"
};

/*
export enum HubModel {
  APOLLO_HUB_BLE_MESH = 'APOLLO_HUB_BLE_MESH',
  APOLLO_HUB_ZIGBEE = 'APOLLO_HUB_ZIGBEE',
  APOLLO_HUB_BLE_ZIGBEE = 'APOLLO_HUB_BLE_ZIGBEE',
}

export const HubModelLabelMapping: Record<HubModel, string> = {
  [HubModel.APOLLO_HUB_BLE_MESH]: 'APOLLO HUB BLE',
  [HubModel.APOLLO_HUB_ZIGBEE]: 'APOLLO HUB ZIGBEE',
  [HubModel.APOLLO_HUB_BLE_ZIGBEE]: 'APOLLO HUB BLE-ZIGBEE'
};


export enum HubSource {
  GATEWAY = 'GATEWAY',
  DEVICES = 'DEVICES'
}

export const HubSourceLabelMapping: Record<HubSource, string> = {
  [HubSource.GATEWAY]: 'GATEWAY',
  [HubSource.DEVICES]: 'TB DEVICES',
};
*/
