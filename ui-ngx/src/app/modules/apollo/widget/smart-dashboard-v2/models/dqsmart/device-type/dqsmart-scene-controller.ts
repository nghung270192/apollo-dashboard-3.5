import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {MatDialog} from '@angular/material/dialog';
import {BaseDqsmartController} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/base-dqsmart-controller';
import {Observable} from 'rxjs';
import {
  DeviceControllerCallbackFunction,
  DeviceState,
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
 import {HassEntity} from 'home-assistant-js-websocket';
import {ChangeDetectorRef} from '@angular/core';

export class DqsmartSceneController extends BaseDqsmartController {

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
               cd: ChangeDetectorRef,
               dialog: MatDialog,
              callback?: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, cd, dialog, callback);
  }

  toggle(params?: any): Observable<any> {
    return super.toggle(this.renderState().rawState.onOffState);
  }


  hasToggle(): boolean {
    return true;
  }

  renderState(): DeviceState {
    return super.renderState();
  }

  updateNewState(hassEntity: HassEntity | null): void {
   }

}
