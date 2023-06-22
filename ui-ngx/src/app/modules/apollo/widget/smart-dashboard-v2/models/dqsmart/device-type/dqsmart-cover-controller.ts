import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  BaseDqsmartController
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/device-type/base-dqsmart-controller';
import {Observable} from 'rxjs';
import {
  ClimateHass,
  HomeAssistantService,
  IotDevice
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {
  DeviceControllerCallbackFunction,
  DeviceState, EDevCallbackEvent
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {HassEntity, StateChangedEvent} from 'home-assistant-js-websocket';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {
  DqsmartGatewayNodeTreeImpl,
  DqsmartNodeTreeImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {
  CoverDialogControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/cover-dialog-controller.component';


export class CoverHass extends IotDevice {

  constructor(hassEntity: HassEntity) {
    super(hassEntity);
  }

  get state(): string {
    return this.hassEntity?.state;
  }
}


export class DqsmartCoverController extends BaseDqsmartController {
  coverHass: CoverHass;

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback?: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, cd, dialog, callback);
    this.apollo.apolloNodeTreeService.getApolloNodeTree(this.dqsmartNodeTreeImpl.gatewayId).subscribe(res => {
      if (res) {
        const dqsmartNodeTree = new DqsmartGatewayNodeTreeImpl(res, apollo);
        this.apollo.dqsmartService.getState(dqsmartNodeTree.hassUrl, dqsmartNodeTree.token,
          this.iotDevice.entityId).subscribe(res => {
          if (res) {
            this.coverHass = new CoverHass(res as HassEntity);
            this.callback(EDevCallbackEvent.UPDATE_NEW_STATE);
          }
        });
      }
    });

  }

  toggle(params?: any): Observable<any> {
    return super.toggle(params);
  }

  closeCover(params?: any): Observable<any> {
    return super.callServices(HomeAssistantService.closeCover,
      {
        entity_id: this.iotDevice.entityId
      });
  }

  closeCoverTilt(params?: any): Observable<any> {
    return super.callServices(HomeAssistantService.closeCoverTilt,
      {
        entity_id: this.iotDevice.entityId
      });
  }

  openCover(params?: any): Observable<any> {
    return super.callServices(HomeAssistantService.openCover,
      {
        entity_id: this.iotDevice.entityId
      });
  }

  openCoverTilt(params?: any): Observable<any> {
    return super.callServices(HomeAssistantService.openCoverTilt,
      {
        entity_id: this.iotDevice.entityId
      });
  }

  stopCover(params?: any): Observable<any> {
    return super.callServices(HomeAssistantService.stopCover,
      {
        entity_id: this.iotDevice.entityId
      });
  }

  stopCoverTilt(params?: any): Observable<any> {
    return super.callServices(HomeAssistantService.stopCoverTilt,
      {
        entity_id: this.iotDevice.entityId
      });
  }

  /*params:0-100*/
  setCoverPosition(params: any): Observable<any> {
    return super.callServices(HomeAssistantService.stopCover,
      {
        entity_id: this.iotDevice.entityId,
        position: params
      });
  }


  /*params:0-100*/
  setCoverPositionTilt(params: any): Observable<any> {
    return super.callServices(HomeAssistantService.stopCoverTilt,
      {
        entity_id: this.iotDevice.entityId,
        tilt_position: params
      });
  }

  renderState(): DeviceState {
    return {
      rawState: {
        color: this.coverHass?.state === 'open' ? 'red' : this.coverHass?.state === 'closed' ? '#1a237e' : 'black',
        onOffState: this.coverHass?.state === 'open',
      },
      renderState: this.coverHass?.state
    };
  }

  hasToggle(): boolean {
    return false;
  }


  entityClick(): any {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      data: {
        iotDevice: this
      }
    };
    let sub: any;
    sub = this.dialog.open(CoverDialogControllerComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe();
    }
  }

  updateNewState(hassEntity: HassEntity | null): void {
    this.coverHass = new ClimateHass(this.iotDevice.hassEntity);
  }
}
