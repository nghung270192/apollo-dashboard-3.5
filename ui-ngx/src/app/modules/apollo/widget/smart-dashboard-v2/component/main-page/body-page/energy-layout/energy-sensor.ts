import {
  EnergySensorDaily,
  EnergySensorDailyChart,
  EnergySensorMonthly,
  EnergySensorMonthlyChart
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

  /*  getTotalEnergy(fromDate: Date, toDate: Date = new Date()): Observable<number> {
      return new Observable<number>(subscriber => {
        if (fromDate == null || toDate == null) {
          subscriber.error('Không tìm thấy start date && end date');
        } else {
          this.energySensor.getEnergySensorDataTimeSeries(fromDate, toDate).subscribe(
            values => {
              const energy = new EnergySensorManagement(values);
              subscriber.next(energy.getTotalEnergy());
              subscriber.complete();
            }
          );
        }
      });
    }*/

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

  getEnergyDaily(fromDate: Date, toDate: Date = new Date()): Observable<Array<EnergySensorDailyChart>> {

    return new Observable<any>(subscriber => {
      if (fromDate == null || toDate == null) {
        subscriber.error('Không tìm thấy start date && end date');
      } else {
        console.log(fromDate);
        this.energySensor.getEnergySensorDataTimeSeries(fromDate, toDate).subscribe(
          values => {
            const energy = new EnergySensorManagement(values);
            subscriber.next(energy.convertDailyData());
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
        console.log(fromDate);
        this.energySensor.getEnergySensorDataTimeSeries(fromDate, toDate).subscribe(
          values => {
            const energy = new EnergySensorManagement(values);
            subscriber.next(energy.convertMonthlyData());
            subscriber.complete();
          }
        );
      }
    });
  }


  /*  getEnergyData(fromDate: Date, toDate: Date = new Date()): Observable<number> {
      return new Observable<number>(subscriber => {
        if (fromDate == null || toDate == null) {
          subscriber.error('Không tìm thấy start date && end date');
        } else {
          this.energySensor.getEnergySensorDataTimeSeries(fromDate, toDate).subscribe(
            values => {
              const energy = new EnergySensorManagement(values);
              subscriber.next(energy.getTotalEnergy());
              subscriber.complete();
            }
          );
        }
      });
    }*/

  //
  //
  // /**
  //  *
  //  * @param year: year to get data, ex 2023
  //  */
  // getDataOfYear(year: number): Array<EnergySensorMonthly> {
  //   let data: Array<EnergySensorMonthly>;
  //   if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
  //     const listMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  //     data = [];
  //     listMonth.forEach(month => {
  //       const firstDate = new Date(year, month, 1, 0, 0, 0, 0).getTime();
  //       const lastDate = new Date(year, month, getLastDayOfMonth(year, month).getDate(), 23, 59, 59, 999).getTime();
  //       const dataDaily = this.energySensorDailies.filter(value => value.date >= firstDate && value.date <= lastDate).sort(
  //         (a, b) => a.date - b.date
  //       );
  //       // const total = dataDaily.reduce((power, obj) => power + obj.data.energy, 0);
  //
  //       let total = 0;
  //       if (dataDaily && Array.isArray(dataDaily) && dataDaily.length > 1) {
  //         total = dataDaily[dataDaily.length - 1].data.energy - dataDaily[0].data.energy;
  //         total = Math.round(total * 1000) / 1000;
  //       }
  //       data.push({energyTotal: total, dataDaily});
  //     });
  //   }
  //   return data;
  // }
  //
  // /**
  //  * Get all data of month
  //  * @param year: year to get data, ex: 2023
  //  * @param month: month to get data, ex: 0-11
  //  */
  // getDataOfMonth(year: number, month: number): EnergySensorMonthly {
  //
  //   if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
  //
  //     /*Get all data per month*/
  //     const startDate = new Date(year, month, 1, 0, 0, 0, 0).getTime();
  //     const endDate = new Date(year, month, getLastDayOfMonth(year, month).getDate(), 23, 59, 59, 999).getTime();
  //     const dataDaily
  //       = this.energySensorDailies.filter(value => value.date >= startDate && value.date <= endDate).sort(
  //       (a, b) => a.date - b.date
  //     );
  //
  //     let energyTotal = 0;
  //
  //     if (dataDaily && Array.isArray(dataDaily)) {
  //       //: dataDaily.reduce((power, obj) => power + obj.data.energy, 0)
  //       if (dataDaily.length > 1) {
  //         energyTotal = (dataDaily[dataDaily.length - 1].data.energy - dataDaily[0].data.energy);
  //         energyTotal = Math.round(energyTotal * 1000) / 1000;
  //       }
  //     }
  //
  //     return {
  //       dataDaily,
  //       energyTotal,
  //     };
  //   }
  //   return null;
  // }
  //
  // getDateOfMonthToDrawChart(year: number, month: number): EnergySensorMonthlyChart {
  //   const energySensorMonthly = this.getDataOfMonth(year, month);
  //
  //   let dataDaily: Array<EnergySensorDailyChart>;
  //   if (energySensorMonthly && energySensorMonthly.dataDaily
  //     && Array.isArray(energySensorMonthly.dataDaily)
  //     && energySensorMonthly.dataDaily.length > 0) {
  //     const fromDate = new Date(energySensorMonthly.dataDaily[0].date);
  //     const toDate = new Date(energySensorMonthly.dataDaily[energySensorMonthly.dataDaily.length - 1].date);
  //     dataDaily = [];
  //
  //     for (let date = fromDate.getDate(); date <= toDate.getDate(); date++) {
  //       const dataOfDate = energySensorMonthly.dataDaily
  //         .filter(value => new Date(value.date).getDate() === date).sort(
  //           (a, b) => a.date - b.date
  //         );
  //       console.log(date, energySensorMonthly.dataDaily[energySensorMonthly.dataDaily.length - 1], energySensorMonthly.dataDaily[0]);
  //
  //       if (dataOfDate && Array.isArray(dataOfDate) && dataOfDate.length > 0) {
  //         dataDaily.push(
  //           {
  //             date: dataOfDate[dataOfDate.length - 1].date,
  //             energy: Math.round((dataOfDate[dataOfDate.length - 1].data.energy - dataOfDate[0].data.energy) * 1000) / 1000
  //           }
  //         );
  //       }
  //     }
  //   }
  //   return {energyTotal: energySensorMonthly.energyTotal, dataDaily};
  // }
  //
  //
  // /**
  //  * Get data of current month
  //  */
  // getCurrentMonthData(): EnergySensorMonthly {
  //   const today = new Date();
  //   return this.getDataOfMonth(today.getUTCFullYear(), today.getUTCMonth());
  // }
  //
  // getLastDataOfDate(): EnergySensorDaily {
  //   if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
  //     return this.energySensorDailies[0];
  //   }
  //   return null;
  // }
  //
  // getTotalEnergy(): number {
  //   let energyTotal = 0;
  //   if (this.energySensorDailies.length > 1) {
  //     energyTotal = (this.energySensorDailies[0].data.energy
  //       - this.energySensorDailies[this.energySensorDailies.length - 1].data.energy);
  //     energyTotal = Math.round(energyTotal * 1000) / 1000;
  //   }
  //   return energyTotal;
  // }
  //
  // getFirstData(): EnergySensorDaily {
  //   if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
  //     return this.energySensorDailies[this.energySensorDailies.length - 1];
  //   }
  //   return null;
  // }
  //
  // getLastData(): EnergySensorDaily {
  //   if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
  //     {
  //       return this.energySensorDailies[0];
  //     }
  //     return null;
  //   }
  // }
}
