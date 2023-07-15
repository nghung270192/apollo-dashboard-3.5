import {
  EnergySensorDaily,
  EnergySensorDailyChart,
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management.model';
import {BleEnergySensor} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/ble-energy-sensor';
import {Observable} from 'rxjs';
import {
  EnergySensorManagement
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/energy-sensor-management/energy-sensor-management';

export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}

export class EnergySensor {
  constructor(public energySensor: BleEnergySensor) {
    this.energySensor = energySensor;
  }

  getLastEnergy(fromDate: Date, toDate: Date = new Date()): Observable<EnergySensorDaily> {
    return new Observable<EnergySensorDaily>(subscriber => {
      if (fromDate == null || toDate == null) {
        subscriber.error('Không tìm thấy start date && end date');
      } else {
        this.energySensor.getEnergySensorDataTimeSeries(fromDate, toDate).subscribe(
          values => {
            const energy = new EnergySensorManagement(values);
            subscriber.next(energy.getLastData());
            subscriber.complete();
          }
        );
      }
    });
  }

  getTotalEnergy(fromDate: Date, toDate: Date = new Date()): Observable<any> {
    return new Observable<any>(subscriber => {
      if (fromDate == null || toDate == null) {
        subscriber.error('Không tìm thấy start date && end date');
      } else {
        this.energySensor.getEnergySensorDataTimeSeries(fromDate, toDate).subscribe(
          values => {
            const energy = new EnergySensorManagement(values);
            subscriber.next({
              unicastAddress: this.energySensor.bleNodeViewer.unicastAddress,
              total: energy.getTotalEnergy()
            });
            subscriber.complete();
          }
        );
      }
    });
  }

  /**
   *
   * @param fromDate
   * @param toDate
   */
  getEnergyDaily(fromDate: Date, toDate: Date = new Date()): Observable<Array<EnergySensorDailyChart>> {

    //convert fromDate
    const fDate = new Date(fromDate);
    const tDate = new Date(toDate);
    tDate.setHours(23, 59, 59, 999);

    fDate.setDate(fromDate.getDate() - 1);
    fDate.setHours(0, 0, 0, 0);

    return new Observable<any>(subscriber => {
      if (fromDate == null || toDate == null) {
        subscriber.error('Không tìm thấy start date && end date');
      } else {
        console.log(fromDate, toDate);
        this.energySensor.getEnergySensorDataTimeSeries(fDate, tDate).subscribe(
          values => {
            const energy = new EnergySensorManagement(values);
            subscriber.next(energy.calculateEnergyDaily(fromDate, toDate));
            subscriber.complete();
          }
        );
      }
    });
  }

  getEnergyMonthly(fromDate: Date, toDate: Date = new Date()): Observable<Array<EnergySensorDailyChart>> {

    return new Observable<any>(subscriber => {
      if (fromDate == null || toDate == null) {
        subscriber.error('Không tìm thấy start date && end date');
      } else {
        const startDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 0);
        this.energySensor.getEnergySensorDataTimeSeries(startDate, toDate).subscribe(
          values => {
            const energy = new EnergySensorManagement(values);
            subscriber.next(energy.calculateEnergyMonthly());
            subscriber.complete();
          }
        );
      }
    });
  }

}
