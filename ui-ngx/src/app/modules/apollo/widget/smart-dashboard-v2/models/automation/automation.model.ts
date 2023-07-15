import {
  InputScript,
  InputScriptImpl,
  OutputScript,
  OutputScriptImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {
  HubNodeTreeImpl,
  NodeTree,
  NodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Observable} from 'rxjs';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {ApolloDeviceModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';

export interface AutomationParamsToCreateNew {
  name?: string;
  label?: string;
  model?: string;
}

export interface Automations {
  'scene': [
    {
      'id': string;
      'input': any;
      'output': any;
    }
  ];
}

export enum ComparisonType {
  LESS = 'less',
  LESS_EQUAL = 'less_equal',
  GREATE = 'greater',
  GREATE_EQUAL = 'greater_equal',
  EQUAL = 'equal'
}

export const ComparisonTypeLabelMapping: Record<ComparisonType, string> = {
  less: 'So sánh bé: <',
  less_equal: 'So sánh bé hoặc bằng: <=',
  greater: 'So sánh lớn: >',
  greater_equal: 'So sánh lớn hoặc bằng: >=',
  equal: 'So sánh bằng: ='
};

export interface AutomationI {
  id: string;
  enable: boolean;
  input: any;
  output: any;
}

export class AutomationImpl implements AutomationI {
  id: string;
  input: any;
  enable: boolean;
  output: any;


  constructor(automation: AutomationImpl) {
    this.id = automation?.id;
    this.input = automation?.input;
    this.output = automation?.output;
    this.enable = automation?.enable;
  }

  update(automation: AutomationImpl) {
    this.id = automation?.id;
    this.input = automation?.input;
    this.output = automation?.output;
    this.enable = automation?.enable;
  }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderInputFromZigbeeDeviceState(method: string, addr: number, ep: number, val: number, name: string): any {
  return {
    method,
    params: {
      addr,
      ep,
      state: {name, val}
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderInputFromLumiRemoteB1acn01(method: string, addr: number, ep: number, val: number, name: string): any {
  return {
    method,
    params: {
      addr,
      ep,
      state: {name, val}
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderInputFromLumiRemoteB286acn01(method: string, addr: number, ep: number, val: number, name: string) {
  return {
    method,
    params: {
      addr,
      ep,
      state: {name, val}
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderOutputZigbeeSetOnOff(address: string, endPoint: number, state: number) {
  return {
    method: 'set_onOff',
    params: {
      type: 'zigbee',
      address,
      DstEndPoint: endPoint,
      SrcEndPoint: 1,
      value: state
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderOutputZigbeeSetLightness(address: string, endPoint: number, lightness: number) {
  return {
    method: 'set_lightness',
    params: {
      type: 'zigbee',
      address,
      DstEndPoint: endPoint,
      SrcEndPoint: 1,
      value: lightness
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderOutputBleSetOnOff(address: string, state: number) {
  return {
    method: 'set_onOff',
    params: {
      type: 'ble_sigmesh',
      unicast: address,
      value: state
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderOutputBleSetLightness(address: string, value: number) {
  return {
    method: 'set_lightness',
    params: {
      type: 'ble_sigmesh',
      unicast: address,
      value
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderOutputBleCallScene(address: string, value: number) {
  return {
    method: 'scene_recall',
    params: {
      type: 'ble_sigmesh',
      unicast: address,
      SceneNumber: value
    }
  };
}


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderAutoInput(input: InputScript): any {
  const inputScriptImpl: InputScriptImpl = new InputScriptImpl(input);
  return renderInputFromZigbeeDeviceState(
    inputScriptImpl.fromZbNodes.model,
    inputScriptImpl.fromZbNodes.addr,
    inputScriptImpl.fromZbEndpoint,
    inputScriptImpl.fromZbValue,
    inputScriptImpl.fromZbName);
  /*switch (inputScriptImpl.fromZbNodes.model) {
    case ZigbeeModel.ZB_AQARA_WIRELESS_MINI_SWITCH_2018:
      return renderInputFromLumiRemoteB1acn01(
        inputScriptImpl.fromZbNodes.model,
        inputScriptImpl.fromZbNodes.addr,
        inputScriptImpl.fromZbEndpoint,
        inputScriptImpl.fromZbValue,
        inputScriptImpl.fromZbName);
    case ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2018:
      return renderInputFromLumiRemoteB286acn01(
        inputScriptImpl.fromZbNodes.model,
        inputScriptImpl.fromZbNodes.addr,
        inputScriptImpl.fromZbEndpoint,
        inputScriptImpl.fromZbValue,
        inputScriptImpl.fromZbName);
  }*/
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function renderAutoOutput(output: Array<OutputScript>): any {
  const data = [];
  if (output && Array.isArray(output)) {
    output.forEach(value => {
      const outputScriptImpl: OutputScriptImpl = new OutputScriptImpl(value);
      if (outputScriptImpl.toDeviceModel === ApolloDeviceModel.BLE_SIG_MESH) {
        switch (outputScriptImpl.toControlType) {
          case AutoTypeControl.LIGHTNESS:
            data.push(renderOutputBleSetLightness(outputScriptImpl.toTarget, outputScriptImpl.toValue));
            break;
          case AutoTypeControl.ONOFF:
            data.push(renderOutputBleSetOnOff(outputScriptImpl.toTarget, outputScriptImpl.toValue));
            break;
          case AutoTypeControl.SCENE:
            data.push(renderOutputBleCallScene(outputScriptImpl.toTarget, Number('0x' + outputScriptImpl.toValue)));
            break;
        }
      } else if (outputScriptImpl.toDeviceModel === ApolloDeviceModel.ZIGBEE) {
        switch (outputScriptImpl.toControlType) {
          case AutoTypeControl.LIGHTNESS:
            data.push(renderOutputZigbeeSetLightness(outputScriptImpl.toTarget, outputScriptImpl.toOptionTarget, outputScriptImpl.toValue));
            break;
          case AutoTypeControl.ONOFF:
            data.push(renderOutputZigbeeSetOnOff(outputScriptImpl.toTarget, outputScriptImpl.toOptionTarget, outputScriptImpl.toValue));
            break;
          case AutoTypeControl.SCENE:
            break;
        }
      }
    });
  }
  console.log(data);
  return data;
}


export enum AutoTypeControl {
  ONOFF = 'ONOFF',
  LIGHTNESS = 'LIGHTNESS',
  SCENE = 'SCENE'
}

export enum AutoTypeTarget {
  GROUP = 'GROUP',
}


export class AutomationNodeTree extends NodeTreeImpl {

  constructor(private nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    super(nodeTree);
  }

  createOrUpdate(): Observable<any> {
    return new Observable<any>(obs => {
      this.apollo.apolloNodeTreeService.saveApolloNodeTree(this.nodeTree).subscribe(nodeTree => {
        obs.next('Create or update to database ok');
        const nodeController: NodeTreeImpl = new NodeTreeImpl(nodeTree);
        this.apollo.apolloNodeTreeService.getApolloNodeTree(nodeController.additionalInfo?.hubNodeTreeId?.id).subscribe(
          hubNodeTree => {
            obs.next('Found tb hub');
            const hubNodeTreeImpl: HubNodeTreeImpl = new HubNodeTreeImpl(hubNodeTree);
            if (this.type === NodeTreeType.AUTOMATION) {
              this.apollo.hubService.automationService.updateOrCreate(
                hubNodeTreeImpl.tbDeviceId,
                nodeController.id.id,
                nodeController.additionalInfo.enable,
                nodeController.additionalInfo.comparison,
                renderAutoInput(nodeController.additionalInfo.inputScript),
                renderAutoOutput(nodeController.additionalInfo.outputScript)
              ).subscribe(res => {
                obs.next('Create or update scheduler successfully');
                obs.complete();
              }, error => obs.error(error));
            }
          }, error => obs.error('Not found hub tb device')
        );
      }, error => obs.error('Can\'t create or update to database'));
    });
  }


  remove(): Observable<any> {
    return new Observable<any>(observable => {

      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.additionalInfo?.hubNodeTreeId.id).subscribe(
        res => {
          const hubNodeTree: HubNodeTreeImpl = new HubNodeTreeImpl(res);
          this.apollo.hubService.automationService.remove(hubNodeTree.tbDeviceId, [this.id.id]).subscribe(
            value => {
              this.apollo.apolloNodeTreeService.deleteApolloNodeTree(this.id.id).subscribe(value1 => {
                observable.next('Removed successfully');
                observable.complete();
              }, error => observable.error({errCode: 1, message: 'Can\'t Remove node tree in database'}));

            }, error => observable.error({errCode: 2, message: 'Can\'t Remove node tree in Hub'})
          );
        }, error => observable.error({errCode: 3, message: 'Not found hub tb device'}));
    });
  }

  removeOnDatabase(): Observable<any> {
    return new Observable<any>(observable => {
      this.apollo.apolloNodeTreeService.deleteApolloNodeTree(this.id.id).subscribe(res => {
        observable.next('Removed successfully');
        observable.complete();
      }, error => observable.error({errCode: 1, message: 'Can\'t Remove node tree in database'}));
    });
  }

}
