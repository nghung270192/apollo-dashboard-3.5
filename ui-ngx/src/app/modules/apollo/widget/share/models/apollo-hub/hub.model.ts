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
