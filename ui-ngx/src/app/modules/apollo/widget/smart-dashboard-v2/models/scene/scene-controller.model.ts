import {SceneController} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/scene.model';
import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Type} from '@angular/core';
import {NodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {Observable, SubscriptionLike} from 'rxjs';
import {
  HomeAssistantService,
  IotDevice
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {
  DqsmartGatewayNodeTreeImpl,
  DqsmartNodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {HassEntity} from 'home-assistant-js-websocket';
import {HubController} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';


export interface SceneNodeTreeController {
  call(params?: any): Observable<any>;
}


export class BleSceneController implements SceneNodeTreeController {
  bleScene: SceneController = new SceneController();
  hubController: HubController;

  private targetScene = '';

  constructor(nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(nodeTree);
    this.hubController = apollo.hubNodeTrees.get(nodeTreeImpl.additionalInfo.hubNodeTreeId.id);
    this.bleScene.update(nodeTreeImpl.additionalInfo.entity);
    if (nodeTreeImpl.additionalInfo.sceneTarget)
      {this.targetScene = nodeTreeImpl.additionalInfo.sceneTarget;}

  }

  call(): Observable<any> {
    return this.hubController.bleCallScene(this.targetScene, this.bleScene.number);
  }

}

export class ZigbeeSceneController implements SceneNodeTreeController {
  additionalInfo: NodeTreeInfoBase;
  hubController: HubController;

  constructor(nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(nodeTree);
    this.hubController = apollo.hubNodeTrees.get(nodeTreeImpl.additionalInfo.hubNodeTreeId.id);
  }

  call(params?: any): Observable<any> {
    const address: string = params?.address || 'FFFF';
    return undefined;
  }

}

export class DqsmartSceneController extends DqsmartNodeTreeImpl implements SceneNodeTreeController {
  iotDevice: IotDevice;

  public subscription: SubscriptionLike;
  dqsmartNodeTree: DqsmartGatewayNodeTreeImpl;

  constructor(nodeTree: NodeTree,
              private apollo: ApolloWidgetContext) {
    super(nodeTree);
    this.iotDevice = new IotDevice(this.hassEntity);

    this.apollo.apolloNodeTreeService.getApolloNodeTree(this.gatewayId).subscribe(res => {
      if (res) {
        this.dqsmartNodeTree = new DqsmartGatewayNodeTreeImpl(res, apollo);

      }
    });
  }

  call(params?: any): Observable<any> {
    return this.apollo.dqsmartService.callServices(
      this.dqsmartNodeTree.hassUrl, this.dqsmartNodeTree.token, this.iotDevice.domain, HomeAssistantService.turnOn,
      {entity_id: this.iotDevice.entityId}
    );
  }

}

export class PelabSceneController implements SceneNodeTreeController {
  additionalInfo: NodeTreeInfoBase;

  constructor(nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    const nodeTreeImpl: NodeTreeImpl = new NodeTreeImpl(nodeTree);
    this.additionalInfo = nodeTreeImpl.additionalInfo;
  }

  call(params?: any): Observable<any> {
    return undefined;
  }

}

export const providerSceneNodeTreeControllerClass: { [key: string]: Type<SceneNodeTreeController> } = {
  'APOLLO_BLE SIG MESH': BleSceneController,
  APOLLO_ZIGBEE: ZigbeeSceneController,
  DQSMART: DqsmartSceneController,
  PELAB_LORA: PelabSceneController
};
