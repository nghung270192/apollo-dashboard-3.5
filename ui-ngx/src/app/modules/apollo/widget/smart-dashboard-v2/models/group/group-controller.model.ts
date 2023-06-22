import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef, Type} from '@angular/core';
import {forkJoin, Observable, of, SubscriptionLike} from 'rxjs';
import {IotDevice} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {HassEntity} from 'home-assistant-js-websocket';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree-id';
import {GroupModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/group.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/pelab/pelab.model';
import {
  ShareControllerDialog
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/share-controller-dialog.component';
import {
  ShareControllerDialogConfig
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/share-controller-dialog-config';
import {
  BleGroupControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/ble-group-controller.component';
import {
  PelabGroupControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/group-layout/dialog/pelab-group-controller.component';
import {concatMap, delay} from 'rxjs/operators';


/*
export interface GroupControllerModel {
  setState(params: any): Observable<any>;

  setLightness(params: any): Observable<any>;

  setHsl(params: any): Observable<any>;

  callScene(params: any): Observable<any>;

  getClickDialog(): any;
}
*/


export class GroupNodeTreeImpl extends NodeTreeImpl {

  constructor(nodeTree: NodeTree) {
    super(nodeTree);
  }

  public gatewaySource(): ApolloNodeTreeId {
    return this.additionalInfo.gatewaySource;
  }

  public hubSource(): ApolloNodeTreeId {
    return this.additionalInfo.hubNodeTreeId;
  }

  public entity(): any {
    return this.additionalInfo.entity;
  }

  public getMultiple(): boolean {
    return this.additionalInfo.multiple === true;
  }
}

export abstract class GroupController extends GroupNodeTreeImpl {
  protected constructor(nodeTree: NodeTree) {
    super(nodeTree);
  }

  /*  setState = (params: any) => of(any);

    setLightness = (params: any) => of();

    setHsl = (params: any) => of();

    callScene = (params: any) => of();

    getClickDialog = (params: any) => of();*/

  abstract setState(params: any): Observable<any>;

  abstract setLightness(params: any): Observable<any>;

  abstract setHsl(params: any): Observable<any>;

  abstract callScene(params: any): Observable<any>;

  abstract openDialogController(): any;

  abstract renderName(): string;
}

export class BleGroupController extends GroupController {
  hubId = '';
  groupModel: GroupModel;
  groups: Array<string> = [];
  multiple = false;
  readonly DELAY: number = 300;

  constructor(nodeTree: NodeTree,
              public apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    super(nodeTree);
    if (this.hubSource() && this.hubSource().id) {
      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.hubSource().id).subscribe(
        res => {
          this.hubId = res?.additionalInfo?.tbDeviceId.id;
        }
      );
    }
    this.multiple = this.getMultiple();
    if (this.multiple) {
      this.groups = this.entity();
    } else {
      this.groupModel = this.entity() as GroupModel;
    }

  }

  callScene(params: any): Observable<any> {
    return undefined;
  }

  setHsl(params: any): Observable<any> {
    if (this.multiple) {
      if (this.groups && Array.isArray(this.groups)) {
        return of(...this.groups).pipe(
          concatMap(gr => this.apollo.hubService.bleHubService
            .setHsl(this.hubId, gr, params?.h, params?.s, params?.l).pipe(delay(this.DELAY)))
        );
      } else {
        return of(null);
      }
    } else {
      return this.apollo.hubService.bleHubService.setHsl(this.hubId,
        this.groupModel?.address, params?.h, params?.s, params?.l);
    }
  }

  setLightness(params: any): Observable<any> {
    if (this.multiple) {
      if (this.groups && Array.isArray(this.groups)) {
        return of(...this.groups).pipe(
          concatMap(gr => this.apollo.hubService.bleHubService.setLightness(this.hubId, gr, params).pipe(delay(this.DELAY)))
        );
      } else {
        return of(null);
      }
    } else {
      return this.apollo.hubService.bleHubService.setLightness(this.hubId, this.groupModel?.address, params);
    }
  }

  setState(params: any): Observable<any> {
    if (this.multiple) {
      if (this.groups && Array.isArray(this.groups)) {
        return of(...this.groups).pipe(
          concatMap(gr => this.apollo.hubService.bleHubService.setOnOff(this.hubId, gr, params).pipe(delay(this.DELAY)))
        );
      } else {
        return of(null);
      }
    } else {
      return this.apollo.hubService.bleHubService.setOnOff(this.hubId, this.groupModel?.address, params);
    }
  }

  openDialogController(): any {
    const config: ShareControllerDialogConfig<GroupController, any> = new ShareControllerDialogConfig<GroupController, any>();
    config.title = 'Điều khiển nhóm: ' + this.renderName();
    config.controller = this;
    config.entityComponent = BleGroupControllerComponent;

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        dialogSetting: config
      }
    };
    const sub = this.dialog.open(ShareControllerDialog, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
      });
    }
  }

  renderName(): string {
    return this.name;
  }

}

export class ZigbeeGroupController extends GroupController {

  constructor(nodeTree: NodeTree,
              private apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    super(nodeTree);
  }

  callScene(params: any): Observable<any> {
    return undefined;
  }

  setHsl(params: any): Observable<any> {
    return undefined;
  }

  setLightness(params: any): Observable<any> {
    return undefined;
  }

  setState(params: any): Observable<any> {
    return undefined;
  }

  openDialogController(): any {
  }

  renderName(): string {
    return this.name;
  }


}

export class DqsmartGroupController extends GroupController {
  renderName(): string {
    return this.name;
  }

  iotDevice: IotDevice;

  public subscription: SubscriptionLike;
  dqsmartNodeTree: DqsmartGatewayNodeTreeImpl;

  constructor(nodeTree: NodeTree,
              private apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    super(nodeTree);

    this.iotDevice = new IotDevice(this.additionalInfo.entity as HassEntity);

    this.apollo.apolloNodeTreeService.getApolloNodeTree(this.gatewayId()).subscribe(res => {
      if (res) {
        this.dqsmartNodeTree = new DqsmartGatewayNodeTreeImpl(res, apollo);

        /*        this.apollo.dqsmartService.getState(this.dqsmartNodeTree.hassUrl, this.dqsmartNodeTree.token,
                  this.iotDevice.entityId).subscribe(res => {
                  if (res) {
                    this.iotDevice = new IotDevice(res);
                    this.cd.detectChanges();
                  }
                })*/
      }
    });
  }

  callScene(params: any): Observable<any> {
    return undefined;
  }

  setHsl(params: any): Observable<any> {
    return undefined;
  }

  setLightness(params: any): Observable<any> {
    return undefined;
  }

  setState(params: any): Observable<any> {
    return undefined;
  }

  openDialogController(): any {
  }

  hassEntity(): HassEntity {
    return this.additionalInfo?.entity as HassEntity;
  }

  gatewayId(): string {
    return this.additionalInfo?.gatewaySource?.id;
  }

}

export class PelabGroupController extends GroupController {
  gateway: PelabGatewayNodeTreeImpl;

  constructor(nodeTree: NodeTree,
              private apollo: ApolloWidgetContext,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
    super(nodeTree);
    // const group: GroupNodeTreeImpl = new GroupNodeTreeImpl(nodeTree);
    if (this.gatewaySource() && this.gatewaySource().id) {
      this.apollo.apolloNodeTreeService.getApolloNodeTree(this.gatewaySource().id).subscribe(
        res => {
          this.gateway = new PelabGatewayNodeTreeImpl(res, apollo);
        }
      );
    }
  }

  callScene(params: any): Observable<any> {
    return undefined;
  }

  setHsl(params: any): Observable<any> {
    return undefined;
  }

  setLightness(params: any): Observable<any> {
    if (this.additionalInfo?.entity && Array.isArray(this.additionalInfo?.entity)) {
      return this.gateway?.setState(params, true, false, this.additionalInfo?.entity);
    }
    return undefined;
  }

  setState(params: any): Observable<any> {
    if (this.additionalInfo?.entity && Array.isArray(this.additionalInfo?.entity)) {
      return this.gateway?.setState(!!params ? 100 : 0, !!params, false, this.additionalInfo?.entity);
    }
    return undefined;
  }

  openDialogController(): any {

    const config: ShareControllerDialogConfig<GroupController, any> = new ShareControllerDialogConfig<GroupController, any>();
    config.title = 'Điều khiển Pelab Group';
    config.controller = this;
    config.entityComponent = PelabGroupControllerComponent;

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        dialogSetting: config
      }
    };
    const sub = this.dialog.open(ShareControllerDialog, dialogConfig).afterClosed();
    if (sub) {
      sub.subscribe(res => {
      });
    }
  }

  renderName(): string {
    return this.name;
  }


}

export const providerGroupNodeTreeControllerClass: { [key: string]: Type<GroupController> } = {
  'APOLLO_BLE SIG MESH': BleGroupController,
  APOLLO_ZIGBEE: ZigbeeGroupController,
  DQSMART: DqsmartGroupController,
  PELAB_LORA: PelabGroupController
};
