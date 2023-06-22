import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {BaseDqsmartController} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/base-dqsmart-controller';
import {Observable} from 'rxjs';
import {
  DeviceControllerCallbackFunction,
  DeviceState
} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device-controller.model';
import {HassEntity} from 'home-assistant-js-websocket';
import {ChangeDetectorRef} from '@angular/core';

export class DqsmartHumidityController extends BaseDqsmartController {

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              callback?: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, callback);
  }

  toggle(params?: any): Observable<any> {
    return super.toggle(this.renderState().rawState.onOffState);
  }

  hasToggle(): boolean {
    return false;
  }

  renderState(): DeviceState {
    return super.renderState();
  }
  updateNewState(hassEntity: HassEntity | null): void {
  }
}