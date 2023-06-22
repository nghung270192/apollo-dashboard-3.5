import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device.model';
import {HubNodeTreeImpl, NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  DeviceControllerCallbackFunction,
  DeviceState,
  EDevCallbackEvent,
  ElementToUnicast,
  renderBleLightState
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {Observable, of, Subject, SubscriptionLike} from 'rxjs';
import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {ModelIcon} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {
  ApolloWidgetContext,
  DataKey, TelemetryIncoming
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProductModel} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';
import {BleNodeViewer} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-node-viewer';
import {DataSortOrder} from '@shared/models/telemetry/telemetry.models';
import {DeviceId} from '@shared/models/id/device-id';
import {map} from 'rxjs/operators';
import {IWidgetSubscription, SubscriptionInfo, WidgetSubscriptionOptions} from '@core/api/widget-api.models';
import {DatasourceType, widgetType} from '@shared/models/widget.models';
import {EntityType} from '@shared/models/entity-type.models';

export interface BleNewestState {
  data: Array<{
    method: string;
    params: any;
  }>;
  ts: number;
}

export interface BleNewestStateFilter {
  method: string;
  params: any;
  ts: number;
}

export class BaseBleSigmeshController extends DeviceControllerAbstract {
  toggle?(params?: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  bleNodeViewer: BleNodeViewer = new BleNodeViewer();
  hubNodeTree: HubNodeTreeImpl;

  event: EventEmitter<EDevCallbackEvent>;
  /*  private _onOff: any = null;
    private _lightness: number = null;*/
  private subscription: SubscriptionLike;

  subject: Subject<TelemetryIncoming> = new Subject<TelemetryIncoming>();
  observable = this.subject.asObservable();

  constructor(nodeTree: NodeTree,
              public apollo: ApolloWidgetContext,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              public callback: DeviceControllerCallbackFunction) {
    super(nodeTree);

    if (this.additionalInfo && this.additionalInfo?.entity) {
      this.bleNodeViewer = new BleNodeViewer(nodeTree?.additionalInfo?.entity as NodeModel);
      // this.updateNewState();
    }

    if (this.additionalInfo && this.additionalInfo?.hubNodeTreeId) {
      apollo.hubNodeTrees.get(this.additionalInfo?.hubNodeTreeId.id);
      apollo.apolloNodeTreeService.getApolloNodeTree(this.additionalInfo?.hubNodeTreeId.id).subscribe(
        value => {
          this.hubNodeTree = new HubNodeTreeImpl(value);
        }
      );
    }
  }

  subscribe(): void {
    this.subscribeForValue(new DeviceId(this.hubNodeTree.tbDeviceId));
    /*  this.subscription = this.apollo.apolloService.eventTaskSubject.subscribe((event) => {
          if (event === EventTask.REQUEST_UPDATE_NEW_STATE) {
            this.updateNewState();
          }
        }); */
  }

  unSubscribe(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  renderDeviceTypeIcon(): string {
    return ModelIcon.blemesh;
  }

  /*get onOff(): number {
    return this._onOff;
  }

  set onOff(value: number) {
    this._onOff = value;
  }

  get lightness(): number {
    return this._lightness;
  }

  set lightness(value: number) {
    this._lightness = value;
  }*/

  /*sceneCall(params: any): boolean {
    return false;
  }

  setLightness(params: any): Observable<any> {

    return this.apollo.hubService.bleHubService.setLightness(this.hubNodeTree?.tbDeviceId,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), params?.lightness);
  }

  getLightness(params: any): Observable<any> {
    return of(this._lightness);
  }

  setHsl(params: any) {
    return this.apollo.hubService.bleHubService.setHsl(this.hubNodeTree?.tbDeviceId,
      ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), params?.hsl?.h, params?.hsl?.s, params?.hsl?.l);
  }

  renderState(): DeviceState {
    return renderBleLightState(this.onOff, this.lightness);
  }*/

  /*  toggle(params: any = {index: 0}): Observable<any> {
      /!*if (this.lightness) {
        return this.apollo.hubService.bleHubService.setLightness(this.nodeInfo?.tbDeviceId.id, this.bleNodeViewer?.unicastAddress, 0);
      } else {
        return this.apollo.hubService.bleHubService.setLightness(this.nodeInfo?.tbDeviceId.id, this.bleNodeViewer?.unicastAddress, 100);
      }*!/

      if (this.onOff) {
        return this.apollo.hubService.bleHubService.setOnOff(this.hubNodeTree?.tbDeviceId,
          ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), 0);
      } else {
        return this.apollo.hubService.bleHubService.setOnOff(this.hubNodeTree?.tbDeviceId,
          ElementToUnicast(this.bleNodeViewer?.unicastAddress, params?.index), 1);
      }
    }*/

  renderState(): DeviceState {
    return null;
  }

  renderIcon(): string {
    return this.bleNodeViewer?.renderIcon;
  }

  renderName(): string {
    return this.bleNodeViewer?.unicastAddress + ' ' + this.bleNodeViewer?.name;
  }

  hasToggle(): boolean {
    return this.bleNodeViewer?.product?.model === ProductModel.light;
  }

  entityClick(): any {
    /*    const dialogConfig: MatDialogConfig = {
          disableClose: false,
          panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
          data: {
            nodeTreeController: this,
          }
        };
        if (this.bleNodeViewer?.product?.model === ProductModel.light) {
          this.dialog.open(LightControllerComponent, dialogConfig).afterClosed().subscribe();
        }*/
  }

  getSettingDialog(): any {
  }

  renderIconUrlOnMap(): string {
    return this.bleNodeViewer?.renderIconUrl;

  }

  getTimeseriesData(key: string, fromDate: Date, toDate: Date): Observable<Array<BleNewestState>> {
    return this.apollo
      .ctx
      .attributeService
      .getEntityTimeseries(new DeviceId(this.hubNodeTree.tbDeviceId),
        [key],
        fromDate.getTime(),
        toDate.getTime(),
        10000,
        null,
        1000,
        DataSortOrder.ASC,
        null,
        null
      ).pipe(
        map(value => {
          if (value && value[key] && Array.isArray(value[key])) {
            return value[key]
              .map(value1 => ({data: [...JSON.parse(value1?.value)], ts: value1?.ts}))
              ;
          }
        }));
  }

  getTimeseriesDataWithMethod(key: string, method: string, fromDate: Date, toDate: Date): Observable<Array<BleNewestStateFilter>> {
    return this.getTimeseriesData(key, fromDate, toDate).pipe(
      map(value => {
        if (value && Array.isArray(value)) {
          return value.map(
            value1 => {
              if (value1 && value1?.data && Array.isArray(value1.data)) {
                const data = value1.data.find(value2 => value2.method === method);
                if (data) {
                  return ({...data, ts: value1.ts});
                }
              }
            }
          );
        }
      }));

  }

  getLastestTimeseriesData(key: string) {
    return this.apollo
      .ctx
      .attributeService
      .getEntityTimeseriesLatest(new DeviceId(this.hubNodeTree.tbDeviceId),
        [key]
      ).pipe(
        map(value => {
          if (value && value[key] && Array.isArray(value[key])) {
            return value[key]
              .map(value1 => value1.value = ({...JSON.parse(value1?.value), ts: value1?.ts}));
          } else {
            return undefined;
          }
        }));
  }

  private subscribeForValue(deviceId: DeviceId): Observable<IWidgetSubscription> {

    const valueSubscriptionInfo: SubscriptionInfo[] = [];
    const subscriptionInfo: SubscriptionInfo = {
      type: DatasourceType.entity,
      entityType: EntityType.DEVICE,
      entityId: deviceId.id,
      timeseries: []
    };
    subscriptionInfo.timeseries.push({name: `data_bleSigmesh_${this.bleNodeViewer.unicastAddress}`});
    valueSubscriptionInfo.push(subscriptionInfo);


    const subscriptionOptions: WidgetSubscriptionOptions = {
      callbacks: {
        onDataUpdated: (subscription, detectChanges) => this.apollo.ctx.ngZone.run(() => {
          this.onDataUpdated(subscription);
        })
      }
    };
    return this.apollo.ctx.subscriptionApi.createSubscriptionFromInfo(
      widgetType.latest, valueSubscriptionInfo, subscriptionOptions, false, true);

  }

  private onDataUpdated(subscription: IWidgetSubscription) {
    const data = subscription.data;

    if (data && Array.isArray(data)) {
      const arr = [];
      for (const dt of data) {
        let model = DataKey.UNKNOW_KEY;
        let unicastAddress = '';

        if (dt && dt.dataKey && dt.dataKey?.name) {
          model = DataKey.BLE_SIGMESH_KEY;
          unicastAddress = dt.dataKey?.name.substring(-4);
        }

        const ds: TelemetryIncoming = {
          entityId: dt.datasource.entityId,
          entityName: dt.datasource.entityName,
          time: dt.data[0][0],
          model,
          unicastAddress,
          data: JSON.parse(dt.data[0][1])
        };
        console.log(ds);
        this.subject.next(ds);
      }
    }

  }

}
