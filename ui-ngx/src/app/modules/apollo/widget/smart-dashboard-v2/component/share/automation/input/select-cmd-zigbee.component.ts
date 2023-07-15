import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {
  ApolloWidgetContext,
  DataKey, TelemetryIncoming
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {ZbStateParams} from '@modules/apollo/widget/share/models/zigbee/zigbee.model';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DialogComponent} from '@shared/components/dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {DeviceId} from '@shared/models/id/device-id';
import {IWidgetSubscription, SubscriptionInfo, WidgetSubscriptionOptions} from '@core/api/widget-api.models';
import {DatasourceType, widgetType} from '@shared/models/widget.models';
import {EntityType} from '@shared/models/entity-type.models';
import {EDevCallbackEvent} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {ZbStateParamsImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/zigbee/sub-devices/zigbee-controller';

export interface DataViewDialog {
  apollo: ApolloWidgetContext;
  hubNodeTreeIdSelected: string;
}

export interface TableDatasource {
  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;
}

@Component({
  selector: 'tb-select-cmd-zigbee',
  templateUrl: './select-cmd-zigbee.component.html',
  providers: [{provide: ErrorStateMatcher, useExisting: SelectCmdZigbeeComponent}],
  styleUrls: ['./select-cmd-zigbee.component.scss']
})
export class SelectCmdZigbeeComponent extends DialogComponent<SelectCmdZigbeeComponent, null>
  implements OnInit, OnDestroy, AfterViewInit, ErrorStateMatcher {

  zbStateParams: ZbStateParams;
  zbModelParams: string;
  zbTimeUpdate: string;
  private subscription: Observable<IWidgetSubscription>;


  displayedColumns: string[] = ['zbTimeUpdate', 'address', 'endpoint', 'nameState', 'value', 'tool'];
  dataSource = new MatTableDataSource<TableDatasource>([]);


  @ViewChild(MatSort) sort: MatSort;

  constructor(protected store: Store<AppState>,
              protected router: Router,
              private fb: FormBuilder,
              @SkipSelf() private errorStateMatcher: ErrorStateMatcher,
              public datepipe: DatePipe,
              public dialogRef: MatDialogRef<SelectCmdZigbeeComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store, router, dialogRef);

  }

  ngOnInit(): void {
    if (this.data.hubNodeTreeIdSelected) {
      this.data.apollo.apolloNodeTreeService.getApolloNodeTree(this.data.hubNodeTreeIdSelected)
        .subscribe(hubNodeTree => {
          this.data.apollo.hubService.zigbeeHubService.getDevices(hubNodeTree?.additionalInfo?.tbDeviceId?.id)
            .subscribe(value => {
              if (value && value?.params) {
                let listAddress = Object.keys(value.params);
                listAddress = listAddress.map(value1 => `data_zigbee_${value1}`);
                this.subscribeForValue(hubNodeTree?.additionalInfo?.tbDeviceId, listAddress);
              }
            });
        });
    }

    /*this.subscription = this.data.apollo.apolloObserver.subscribe(res => {
      if (res && res?.model === DataKey.ZIGBEE_KEY) {
        const data = this.dataSource.data;
        data.push({
          zbStateParams: res.params,
          zbModelParams: res.key,
          zbTimeUpdate: this.datepipe.transform((new Date()), 'HH:mm:ss')
        });
        this.dataSource.data = data;
      }
    });*/
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this.errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid);
    return originalErrorState || customErrorState;
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      // this.subscription?.unsubscribe();
      this.subscription.subscribe(value => this.data.apollo.ctx.subscriptionApi.removeSubscription(value.id));
    }
  }

  save($event) {
    this.dialogRef.close({data: $event});
  }

  ngAfterViewInit(): void {


    this.dataSource.sort = this.sort;
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  parseDateCallback(data: TelemetryIncoming) {
    if (data && data?.data && Array.isArray(data?.data) && data?.data.length > 0) {
      // const params = new ZbStateParamsImpl(data.data[0]?.params as ZbStateParams);

      const tmp = this.dataSource.data;
      tmp.push({
        zbStateParams: data?.data[0].params as ZbStateParams,
        zbModelParams: data?.data[0].method,
        zbTimeUpdate: this.datepipe.transform((new Date(data?.time)), 'HH:mm:ss')
      });
      console.log(data);
      this.dataSource.data = tmp;
      this.cd.detectChanges();
    }
  }

  private subscribeForValue(deviceId: DeviceId, addresses: Array<string>): Observable<IWidgetSubscription> {

    const valueSubscriptionInfo: SubscriptionInfo[] = [];
    const subscriptionInfo: SubscriptionInfo = {
      type: DatasourceType.entity,
      entityType: EntityType.DEVICE,
      entityId: deviceId.id,
      timeseries: addresses.map(value => ({name: value}))
    };
    // subscriptionInfo.timeseries.push({name: `data_zigbee_${this.addr}`});
    valueSubscriptionInfo.push(subscriptionInfo);


    const subscriptionOptions: WidgetSubscriptionOptions = {
      callbacks: {
        onDataUpdated: (subscription, detectChanges) => this.data.apollo.ctx.ngZone.run(() => {
          this.onDataUpdated(subscription);
        })
      }
    };
    return this.data.apollo.ctx.subscriptionApi.createSubscriptionFromInfo(
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
          model = DataKey.ZIGBEE_KEY;
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
        /*        this.subject.next(ds);*/
        this.parseDateCallback(ds);
      }
    }

  }

}
