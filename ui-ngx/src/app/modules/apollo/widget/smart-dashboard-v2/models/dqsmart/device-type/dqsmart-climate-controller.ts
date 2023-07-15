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
  EntityState, EDevCallbackEvent
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {HassEntity, StateChangedEvent} from 'home-assistant-js-websocket';
import {
  ClimateDialogControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dialog/climate-dialog-controller.component';

import {StatusColor} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';

export class DqsmartClimateController extends BaseDqsmartController {

  climateHass: ClimateHass;

  constructor(nodeTree: NodeTree,
              apollo: ApolloWidgetContext,
              cd: ChangeDetectorRef,
              dialog: MatDialog,
              callback?: DeviceControllerCallbackFunction) {
    super(nodeTree, apollo, cd, dialog, callback);
    this.climateHass = new ClimateHass(this.dqsmartNodeTreeImpl.hassEntity);
  }


  //@override
  toggle(params?: any): Observable<any> {
    if (this.climateHass.operatureMode === 'off') {
      return this.climateSetOperationMode('cool');
    } else {
      return this.climateSetOperationMode('off');
    }
  }


  //@override
  renderState(): EntityState {
    return {
      rawState: {
        color: this.climateHass.state !== 'off' ? StatusColor.on : StatusColor.off,
        onOffState: this.climateHass.state !== 'off',
      },
      renderState: this.climateHass.temperature +
        ' ' + this.climateHass.fanMode + ' ' + this.climateHass.operatureMode
    };
  }

  //@override
  hasToggle(): boolean {
    return true;
  }

  //@override
  entityClick(): any {

    console.log('and is called here');
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        entityController: this
      }
    };
    const sub = this.dialog.open(ClimateDialogControllerComponent, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe();
    }
  }

  //@implement
  updateNewState(hassEntity: HassEntity | null): void {
     this.climateHass = new ClimateHass(this.iotDevice.hassEntity);
  }


  climateSetFanMode(params: any): Observable<any> {
    return super.callServices(HomeAssistantService.setFanMode,
      {entity_id: this.iotDevice.entityId, fan_mode: params});
  }

//this.ListOperationMode = ['off', 'cool', 'dry', 'fan_only'];
  climateSetOperationMode(params: any): Observable<any> {
    return super.callServices(HomeAssistantService.setOpMode,
      {
        entity_id: this.iotDevice.entityId,
        operation_mode: params
      });
  }

  climateSetTemperature(params: any): Observable<any> {
    return super.callServices(HomeAssistantService.setTemp,
      {
        entity_id: this.iotDevice.entityId,
        operation_mode: params?.operationMode,
        target_temp_high: params?.temperatureHigh,
        target_temp_low: params?.temperatureLow,
        temperature: params?.temperature,
      });
  }
}
