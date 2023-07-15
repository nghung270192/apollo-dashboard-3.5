import {ApolloTreeService} from '@modules/apollo/widget/smart-dashboard-v2/services/apollo-tree.service';
import {WidgetContext} from '@home/models/widget-component.models';
import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {ApolloNodeTreeService} from '@modules/apollo/widget/smart-dashboard-v2/services/apollo-node-tree.service';
import {HubService} from '@modules/apollo/widget/smart-dashboard-v2/services/hub.service';
import {IWidgetSubscription, SubscriptionInfo, WidgetSubscriptionOptions} from '@core/api/widget-api.models';
import {DatasourceType, widgetType} from '@shared/models/widget.models';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {NodeTreeInfoBase} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {DeviceId} from '@shared/models/id/device-id';
import {BehaviorSubject, observable, Observable, of} from 'rxjs';
import {EntityType} from '@shared/models/entity-type.models';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {DqsmartService} from '@modules/apollo/widget/share/services/dqsmart.service';
import {HomeAssistantGateway} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/home-assistant.model';
import {HubController} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-hub/apollo-hub';
import {ApolloService} from '@modules/apollo/widget/smart-dashboard-v2/services/apollo.service';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {getCurrentAuthUser} from '@core/auth/auth.selectors';
import {Authority} from '@shared/models/authority.enum';
import {PelabService} from '@modules/apollo/widget/share/services/pelab.service';
import {concatMap, map, mergeMap} from 'rxjs/operators';
import {EventTask} from '@modules/apollo/widget/smart-dashboard-v2/models/common-type.model';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/pelab/pelab.model';
import {ZbStateParams} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {AttributeScope} from "@shared/models/telemetry/telemetry.models";


export enum DataKey {
  BLE_SIGMESH_KEY = 'data_bleSigmesh',
  ZIGBEE_KEY = 'data_zigbee',
  UNKNOW_KEY = 'unknown'
}

export enum ResponseMethod {
  onOffStatus = 'onOffStatus',
  lightnessStatus = 'lightnessStatus',
  hslStatus = 'HSL_status',
  ctlStatus = 'CTL_status',
  sensorStatus = 'sensor_status',
  vendor_status = 'vendor_status',
  disconnectedEvent = 'disconnectedEvent',
  status = 'status',
}

export enum StatusType {
  bleOnOff = 'BleOnOff',
  bleLightness = 'BleLightness',
  zigbeeStatus = 'BleStatus',
  unknown = 'unknown'
}

export interface OnOffParams {
  address: string;
  value: number;
}

export interface EnergySensorParams {
  address: string;
  energy: number;
  power: number;
  current: number;
  voltage: number;
}

export interface LightnessParams {
  address: string;
  value: number;
}

export interface LightnessParams {
  address: string;
  value: number;
}

export interface HSLParams {
  address: string;
  'Lightness': number;
  'Hue': number;
  'Saturation': number;
}

export interface CTLParams {
  address: string;
  'Warm': number;
  'White': number;
}

export type ParamsStatus = OnOffParams & LightnessParams & EnergySensorParams
  & ZbStateParams & HSLParams & CTLParams & { [key: string]: any };

export interface TelemetryIncoming {
  entityId?: string;
  entityName?: string;
  time?: number;
  unicastAddress?: string;
  model?: DataKey;
  data?: [{ method: ResponseMethod; params: ParamsStatus }];
}

export interface StatePublish {
  model: DataKey;
  key: StatusType;
  params: any;
}

export interface BleState {
  'onOffStatus'?: number;
  'time'?: number;
  'status'?: boolean;
  'lightnessStatus'?: number;
  'HSL_status'?: {
    'Lightness'?: number;
    'Hue'?: number;
    'Saturation'?: number;
  };
}


export class BleStateImpl implements BleState {
  Lightness: number;
  Hue: number;
  Saturation: number;
  lightnessStatus: number;
  onOffStatus: number;
  status: boolean;
  time: number;

  constructor(bleState?: BleState) {
    if (bleState) {
      this.Hue = bleState?.HSL_status?.Hue;
      this.Lightness = bleState?.HSL_status?.Lightness;
      this.Saturation = bleState?.HSL_status?.Saturation;
      this.lightnessStatus = bleState?.lightnessStatus;
      this.onOffStatus = bleState?.onOffStatus;
      this.status = bleState?.status;
      this.time = bleState?.time;
    }
  }

  update(bleState: BleState) {
    this.Hue = bleState?.HSL_status?.Hue;
    this.Lightness = bleState?.HSL_status?.Lightness;
    this.Saturation = bleState?.HSL_status?.Saturation;
    this.lightnessStatus = bleState?.lightnessStatus;
    this.onOffStatus = bleState?.onOffStatus;
    this.status = bleState?.status;
    this.time = bleState?.time;
  }

  toData(): BleState {
    return {
      HSL_status: {
        Hue: this.Hue,
        Lightness: this.Lightness,
        Saturation: this.Saturation
      },
      lightnessStatus: this.lightnessStatus,
      onOffStatus: this.onOffStatus,
      status: this.status,
      time: this.time
    };
  }
}

export class ApolloWidgetContext {

  apolloSubject = new BehaviorSubject({model: null, key: null, params: null, updateTime: null});
  apolloObserver = this.apolloSubject.asObservable();

  dqsmartSubject = new BehaviorSubject({model: null, newState: null});
  dqsmartSubjectObserver = this.dqsmartSubject.asObservable();

  apolloService: ApolloService = new ApolloService();
  pelabService: PelabService;
  apolloTreeService: ApolloTreeService;
  apolloNodeTreeService: ApolloNodeTreeService;
  hubService: HubService;
  apolloTree: ApolloTree;
  dqsmartService: DqsmartService;

  isAdmin = false;
  isMobile = false;

  hubNodeTrees: Map<string, HubController> = new Map<string, HubController>([]);

  bleNodeState: Map<string, BleStateImpl> = new Map<string, BleStateImpl>([]);

  pelabGateway: Map<string, PelabGatewayNodeTreeImpl> = new Map<string, PelabGatewayNodeTreeImpl>([]);

  dqsmartGateway: Map<string, DqsmartGatewayNodeTreeImpl> = new Map<string, DqsmartGatewayNodeTreeImpl>([]);

  private subscription: Array<IWidgetSubscription> = [];


  constructor(
    public ctx: WidgetContext, public store: Store<AppState>) {
    const authUser = getCurrentAuthUser(this.store);
    if (authUser.authority === Authority.TENANT_ADMIN) {
      this.isAdmin = true;
    }
    this.isMobile = ctx.isMobile;
    this.apolloTreeService = new ApolloTreeService(ctx.http, ctx.assetService, ctx.attributeService);
    this.apolloNodeTreeService = new ApolloNodeTreeService(ctx, ctx.http, ctx.attributeService);
    this.pelabService = new PelabService(ctx.http);
    this.dqsmartService = new DqsmartService(ctx.http);
    this.hubService = new HubService(ctx.deviceService);
    // this.onDataUpdated = this.onDataUpdated.bind(this);
    /*    this.subscribeForValue = this.subscribeForValue.bind(this);
        this.processDataSource = this.processDataSource.bind(this);*/
  }


  hubInit(hubNodeTrees: Array<NodeTree>): Observable<any> {
    return new Observable<any>(subscriber => {

      this.hubNodeTrees = new Map<string, HubController>([]);
      /*      if (this.subscription && Array.isArray(this.subscription)) {
              this.subscription.forEach(sub => {
                this.ctx.subscriptionApi.removeSubscription(sub.id);
              });
              this.subscription = [];
            }*/
      if (hubNodeTrees && Array.isArray(hubNodeTrees) && hubNodeTrees.length > 0) {
        hubNodeTrees.forEach(hub => {
          const newHubController = new HubController(hub, this);
          this.ctx.attributeService.getEntityAttributes(new DeviceId(newHubController.tbDeviceId), AttributeScope.SERVER_SCOPE, ['active'], {
            ignoreErrors: true, ignoreLoading: true, resendRequest: false
          })
            .subscribe(value => {
              if (value && value.length > 0 && !!value[0]?.value) {
                this.hubNodeTrees.set(hub.id.id, newHubController);
                newHubController.bleGetAllStatus([]).subscribe(res => {
                }, error => console.log(error));
              }
            });


        });

        /*of(hubNodeTrees).pipe(
          //duyet tung hub
          mergeMap(hubs => hubs.map(
            hub => {
              const newHubController = new HubController(hub, this);
              this.hubNodeTrees.set(hub.id.id, newHubController);
              console.log(hubNodeTrees);
              const info: NodeTreeInfoBase = hub.additionalInfo;
              const getAllStatus = newHubController.bleGetAllStatus([]);
              getAllStatus.subscribe(res => {
                /!*if (res && res?.params && res?.params?.data_bleSigmesh) {
                  Object.entries(res?.params?.data_bleSigmesh).map(value => this.bleNodeState.set(value[0],
                    new BleStateImpl(value[1] as BleState)));
                  newHubController = this.hubNodeTrees.get(hub.id.id);
                  newHubController.isOnline = true;
                  this.hubNodeTrees.set(hub.id.id, newHubController);
                  console.log(newHubController);
                  this.apolloService.eventTaskSubject.next(EventTask.REQUEST_UPDATE_NEW_STATE);
                } else {
                  subscriber.error('data_bleSigmesh not found');
                }*!/
              }, error => console.log(error));
              /!*if (info?.tbDeviceId) {
                return { sub: this.subscribeForValue(info.tbDeviceId), controller: newHubController };
              } else {
                return null;
              }*!/
            }
          ))
        );*//*.subscribe(res => {
          if (res && res?.controller && res.sub) {
            res.sub.subscribe(sub => this.subscription.push(sub));
            subscriber.next();
            subscriber.complete();
          }
        }, error => subscriber.error(error));*/
        subscriber.next();
        subscriber.complete();
      } else {
        subscriber.next();
        subscriber.complete();
      }
    });
  }

  /*
    private processDataSource(datasource: Array<TelemetryIncoming>) {

      if (datasource && Array.isArray(datasource)) {
        of(datasource).pipe(map(dts => dts.map(
          dt => {
            if (dt.data && Array.isArray(dt.data)) {
              if (dt.model === DataKey.BLE_SIGMESH_KEY) {
                of(dt.data).pipe(
                  /!*Duyet tung tin nhan tra ve*!/
                  map(value => value.map(value1 => {
                    //kiem tra model cua tin nhan, ble, zigbee..
                    if (value1.params) {
                      //neu la su kien disconnect
                      if (value1.method === ResponseMethod.disconnectedEvent) {
                        if (value1?.params && value1.params.address && Array.isArray(value1.params.address)) {
                          Object.values(value1.params.address).map(value2 => {
                            const bleState = this.bleNodeState.get(value2 as string);
                            if (bleState) {
                              bleState.update({
                                ...bleState.toData(), status: false
                              });
                              this.bleNodeState.set(value2 as string, bleState);
                            }
                          }
                          );
                        }
                      } else { //cac tin nhan status

                        if (value1.params?.address) {
                          let bleState = this.bleNodeState.get(value1.params?.address);
                          if (!bleState) {
                            bleState = new BleStateImpl();
                          }
                          if (bleState) {
                            switch (value1.method) {
                              case ResponseMethod.hslStatus:
                                bleState.update({
                                  ...bleState.toData(), status: true, HSL_status: {
                                    Lightness: value1?.params?.Lightness,
                                    Hue: value1?.params?.Hue,
                                    Saturation: value1?.params?.Saturation
                                  }
                                });
                                break;
                              case ResponseMethod.lightnessStatus:
                                bleState.update({
                                  ...bleState.toData(), status: true, lightnessStatus: value1?.params?.value,
                                });
                                break;
                              case ResponseMethod.onOffStatus:
                                bleState.update({
                                  ...bleState.toData(), status: true, onOffStatus: value1?.params?.value,
                                });
                                break;
                            }
                            this.bleNodeState.set(value1.params?.address, bleState);
                          }
                        }
                      }
                    }
                  }))
                ).subscribe();
              } else {
                of(dt.data).pipe(
                  /!*Duyet tung tin nhan tra ve*!/
                  map(value => value.map(value1 => {
                    this.apolloSubject.next({
                      model: dt.model,
                      key: value1.method,
                      params: value1.params,
                      updateTime: dt.time
                    });
                  }))).subscribe();
              }

            }
          }
        ))).subscribe(
          res => {
            this.apolloService.eventTaskSubject.next(EventTask.REQUEST_UPDATE_NEW_STATE);
          });
        /!*datasource.forEach(dt => {
          if (dt.data && Array.isArray(dt.data)) {
            of(dt.data).pipe(
              map(value => value.map(value1 => {
                if (value1.params?.address) {
                  let bleState = this.bleNodeState.get(value1.params?.address);
                   if (bleState) {
                    switch (value1.method) {
                      case ResponseMethod.hslStatus:
                        bleState.update({
                          ...bleState.toData(), "HSL_status": {
                            "Lightness": value1?.params?.Lightness,
                            "Hue": value1?.params?.Hue,
                            "Saturation": value1?.params?.Saturation
                          }
                        });
                        break;
                      case ResponseMethod.lightnessStatus:
                        bleState.update({
                          ...bleState.toData(), "lightnessStatus": value1?.params?.value,
                        });
                        break;
                      case ResponseMethod.onOffStatus:
                        bleState.update({
                          ...bleState.toData(), "onOffStatus": value1?.params?.value,
                        });
                        break;
                    }
                    this.bleNodeState.set(value1.params?.address, bleState);
                  }
                }
              }))
            ).subscribe(
              res => {
                if (res) console.log(this.bleNodeState);
              }
            );
          }
        });*!/
      }
    }

    private onDataUpdated(subscription: IWidgetSubscription) {
      const data = subscription.data;

      if (data && Array.isArray(data)) {
        const arr = [];
        for (const dt of data) {
          let model = DataKey.UNKNOW_KEY;
          let unicastAddress = '';

          if (dt && dt.dataKey && dt.dataKey?.name) {
            if (dt.dataKey?.name.includes(DataKey.BLE_SIGMESH_KEY)) {
              model = DataKey.BLE_SIGMESH_KEY;
              unicastAddress = dt.dataKey?.name.substring(-4);
            } else if (dt.dataKey?.name.includes(DataKey.ZIGBEE_KEY)) {
              model = DataKey.BLE_SIGMESH_KEY;
              unicastAddress = dt.dataKey?.name.substring(-4);
            }
          }


          const ds: TelemetryIncoming = {
            entityId: dt.datasource.entityId,
            entityName: dt.datasource.entityName,
            time: dt.data[0][0],
            model,
            unicastAddress,
            data: JSON.parse(dt.data[0][1])
          };
          this.processDataSource([ds]);
        }
      }

    }

    private subscribeForValue(deviceId: DeviceId): Observable<IWidgetSubscription> {

      const valueSubscriptionInfo: SubscriptionInfo[] = [];
      const subscriptionInfo: SubscriptionInfo = {
        type: DatasourceType.entity,
        entityType: EntityType.DEVICE,
        entityId: deviceId.id,
        timeseries: []
      };
      Object.values(DataKey).forEach(key => {
        subscriptionInfo.timeseries.push({ name: key });
      });
      valueSubscriptionInfo.push(subscriptionInfo);


      const subscriptionOptions: WidgetSubscriptionOptions = {
        callbacks: {
          onDataUpdated: (subscription, detectChanges) => this.ctx.ngZone.run(() => {
            this.onDataUpdated(subscription);
          })
        }
      };
      return this.ctx.subscriptionApi.createSubscriptionFromInfo(
        widgetType.latest, valueSubscriptionInfo, subscriptionOptions, false, true);

    }
  */

  dqSmartInit(gateway: Array<NodeTree>): Observable<any> {
    for (const gw of gateway) {
      const dqsGateway: DqsmartGatewayNodeTreeImpl = new DqsmartGatewayNodeTreeImpl(gw, this);
      this.dqsmartService.checkApi(dqsGateway.hassUrl, dqsGateway.token)
        .pipe(map(value => value?.message === 'API running.')).subscribe(
        value => {
          if (value) {
            this.dqsmartGateway.set(dqsGateway.id.id, dqsGateway);
            const hass = new HomeAssistantGateway(dqsGateway.hassUrl, dqsGateway.token);
            hass.connect().subscribe(res => {
              hass.subscribe().subscribe(value1 => this.dqsmartPublishState(value1));
            });
          }
        }
      );
    }
    return of(null);
  }

  private dqsmartPublishState(state: any) {
    this.dqsmartSubject.next({model: GatewayModel.DQSMART, newState: state});
  }

  pelabInit(gateway: Array<NodeTree>): Observable<any> {
    if (gateway && Array.isArray(gateway)) {
      gateway.forEach(gwNode => {
        const gw = new PelabGatewayNodeTreeImpl(gwNode, this);

        return this.pelabService.login(gw.hostname, gw.apiKey, {
          Username: gw.username,
          Password: gw.password
        }).pipe(map(value => !!value)).subscribe(
          value => {
            if (value) {
              this.pelabGateway.set(gwNode.id.id, gw);
            }
          }
        );

      });
    }
    return of(null);
  }
}
