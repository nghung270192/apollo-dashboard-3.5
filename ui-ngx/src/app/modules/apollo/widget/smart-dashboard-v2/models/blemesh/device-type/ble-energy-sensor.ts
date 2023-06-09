import {
  BaseBleSigmeshController
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/base-ble-sigmesh-controller';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {
  ApolloWidgetContext,
  ResponseMethod, TelemetryIncoming
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {ChangeDetectorRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  DeviceControllerCallbackFunction, EntityState, EntityStateImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/device/device-controller.model';
import {
  EnergySensorManagementComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management.component';
import {Observable, SubscriptionLike} from 'rxjs';
import {
  EnergySensorDaily
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management.model';
import {filter, map} from 'rxjs/operators';
import {StatusColor} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';

export type EnergyUpdateNewstData = (unicastAddress: string, data: EnergySensorDaily) => void;

export class BleEnergySensor extends BaseBleSigmeshController {
  lastData: EnergySensorDaily;
  private energySubscription: SubscriptionLike;
  latestEnergyCallback: EnergyUpdateNewstData;

  constructor(
    nodeTree: NodeTree,
    apollo: ApolloWidgetContext,
    cd: ChangeDetectorRef,
    dialog: MatDialog,
    callback: DeviceControllerCallbackFunction
  ) {
    super(nodeTree, apollo, cd, dialog, callback);
    this.updateNewData(callback);
    this.lastDataEventCallback = this.lastDataEventCallback.bind(this);
    this.lastDataEvent = this.lastDataEventCallback;
  }

  lastDataEventCallback(data: TelemetryIncoming) {
     if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach(value1 => {
        if (value1.method === ResponseMethod.sensorStatus) {
          this.lastData = {date: data.time, data: {energy: 0, power: 0, voltage: 0, current: 0}};
          if (value1 && value1.params) {
            if (value1?.params?.energy) {
              this.lastData.data.energy = value1?.params?.energy;
            }
            if (value1?.params?.current) {
              this.lastData.data.current = value1?.params?.current;
            }
            if (value1?.params?.voltage) {
              this.lastData.data.voltage = value1?.params?.voltage;
            }
            if (value1?.params?.power) {
              this.lastData.data.power = value1?.params?.power;
            }
          }
          if (this.callback) {
            this.callback(this.lastData);
          }

          if (this.latestEnergyCallback) {
            this.latestEnergyCallback(this.bleNodeViewer.unicastAddress, this.lastData);
          }

        }
      });
    }
  }

  updateNewData(callback: EnergyUpdateNewstData) {

    this.latestEnergyCallback = callback;

    /*this.energySubscription = this.observable.subscribe(value => {
      if (value && value.data && Array.isArray(value.data)) {
        value.data.forEach(value1 => {
          if (value1.method === ResponseMethod.sensorStatus) {
            this.lastData = {date: value.time, data: {energy: 0, power: 0, voltage: 0, current: 0}};
            if (value1 && value1.params) {
              if (value1?.params?.energy) {
                this.lastData.data.energy = value1?.params?.energy;
              }
              if (value1?.params?.current) {
                this.lastData.data.current = value1?.params?.current;
              }
              if (value1?.params?.voltage) {
                this.lastData.data.voltage = value1?.params?.voltage;
              }
              if (value1?.params?.power) {
                this.lastData.data.power = value1?.params?.power;
              }
            }

            console.log(this.lastData);
            if (callback) {
              callback(this.lastData);
            }

          }
        });
      }
    })
    ;*/
  }

  renderState(): EntityState {
    const entityState = new EntityStateImpl(
      this.lastData ? StatusColor.on : StatusColor.off,
      null,
      null,
      null,
      null,
      this.lastData?.data?.energy + ' (Kwh)'
    );
    return entityState.toData();
  }

  entityClick(): any {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: ['tb-dialog', 'tb-fullscreen-dialog'],
      data: {
        nodeTreeController: this,
      },
    };

    this.dialog
      .open(EnergySensorManagementComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  getEnergySensorDataTimeSeries(fromDate: Date, toDate: Date): Observable<Array<EnergySensorDaily>> {
     return super.getTimeseriesDataWithMethod(`data_bleSigmesh_${this.bleNodeViewer.unicastAddress}`,
      'sensor_status', fromDate, toDate)
      .pipe(
        map(value => {
            if (value && Array.isArray(value)) {
              return value.filter(value1 => {
                if (!!value1?.ts && !!value1?.params) {
                  return value1;
                }
              });
            }
            return null;
          }
        ),
        map(value => {
          if (value && Array.isArray(value)) {
            return value.map(value1 => ({
              date: value1?.ts,
              data: {
                energy: value1?.params?.energy,
                current: value1?.params?.current,
                voltage: value1?.params?.voltage,
                power: value1?.params?.power,
              }
            }));
          }
          return null;
        })
      );

    // return undefined;
    /*return super.getTimeseriesData(`data_bleSigmesh_${this.bleNodeViewer.unicastAddress}`, fromDate, toDate)
      .pipe(map(value => {
        console.log(value);
        if (value && Array.isArray(value)) {
          console.log(value);
          return value.filter(dataFilter => dataFilter?.value === 'sensor_status').map(value1 => {
              console.log(value1);
              return {
                date: value1?.ts,
                data: {
                  energy: value1?.params?.energy,
                  current: value1?.params?.current,
                  voltage: value1?.params?.voltage,
                  power: value1?.params?.power,
                }
              };
            }
          );
        }
      }))
      ;*/

  }

  clearHistoryEnergySensorData(fromDate?: Date, toDate?: Date) {
    return this.deleteTimeseries(`data_bleSigmesh_${this.bleNodeViewer.unicastAddress}`);
  }

  unSubscribe() {
    if (this.energySubscription) {
      this.energySubscription?.unsubscribe();
    }
    super.unSubscribe();
  }
}
