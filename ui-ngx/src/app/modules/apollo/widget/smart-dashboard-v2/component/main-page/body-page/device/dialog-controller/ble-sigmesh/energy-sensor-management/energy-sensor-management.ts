import {addDays} from 'date-fns';
import {
  EnergySensorDaily, EnergySensorDailyChart,
  EnergySensorMonthly, EnergySensorMonthlyChart
} from './energy-sensor-management.model';


export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}

export class EnergySensorManagement {
  constructor(private energySensorDailies: Array<EnergySensorDaily>) {
    if (energySensorDailies) {
      this.energySensorDailies = this.energySensorDailies
        .sort((a, b) => b.date - a.date);
    }
  }

  /**
   *
   * @param rawData
   * return EnergySensorDaily;
   */
  getLastRawDataOfDate(rawData: Array<EnergySensorDaily>): EnergySensorDaily {
    if (rawData && Array.isArray(rawData) && rawData.length > 0) {
      return rawData[rawData.length - 1];
    }
    return null;
  }

  /**
   * Get last energy of one date
   */
  getLastRawDataOfEachDate(): Array<EnergySensorDailyChart> {
    const TimeOneDate = 1000 * 60 * 60 * 24;
    const dataDailyRaw: Array<EnergySensorDailyChart> = [];
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      const res = this.energySensorDailies
        .sort((a, b) => a.date - b.date);

      //get time from list data
      const fromDate = res[0].date;
      const toDate = res[res.length - 1].date;
      for (let date = fromDate; date <= toDate; date) {
        const filterData = this.energySensorDailies
          .filter(value => new Date(value.date).toDateString() === new Date(date).toDateString()).sort(
            (a, b) => a.date - b.date
          );

        const lastData = this.getLastRawDataOfDate(filterData);

        if (lastData) {
          dataDailyRaw.push(
            {
              date: lastData.date,
              energy: lastData.data.energy
            }
          );
        }

        const newDate = new Date(date);
        newDate.setDate(new Date(date).getDate() + 1);
        date = newDate.getTime();

      }

      return dataDailyRaw;
    }
  }

  calculateEnergyDaily(fromDate: Date, toDate: Date): Array<EnergySensorDailyChart> {
    const dataDailyRaw = this.getLastRawDataOfEachDate();

    const dataDaily: Array<EnergySensorDailyChart> = [];

    for (let date = fromDate; date <= toDate; date) {
      const energy = this.getEnergyOfDate(date);
      dataDaily.push({
        energy,
        date: date.getTime()
      });
      const newDate = new Date(date);
      newDate.setDate(new Date(date).getDate() + 1);
      date = newDate;

    }

    /*    if (dataDailyRaw.length >= 2) {
          for (let index = 0; index < dataDailyRaw.length - 1; index++) {
            const energy = dataDailyRaw[index + 1].energy - dataDailyRaw[index].energy;
            dataDaily.push({
              energy: energy > 0 ? energy : 0,
              date: dataDailyRaw[index + 1].date
            })
            ;
          }
        }*/

    /*      for (let date = fromDate.getDate(); date <= toDate.getDate(); date++) {
            const dataOfDate = this.energySensorDailies
              .filter(value => new Date(value.date).getDate() === date).sort(
                (a, b) => a.date - b.date
              );

            if (dataOfDate && Array.isArray(dataOfDate) && dataOfDate.length > 0) {
              dataDailyRaw.push(
                {
                  date: dataOfDate[dataOfDate.length - 1].date,
                  energy: dataOfDate[dataOfDate.length - 1].data.energy
                }
              );
            }
          }*/

    return dataDaily;

    return null;
  }

  calculateEnergyMonthly(): Array<EnergySensorDailyChart> {
    const dataDailyRaw = this.getLastRawDataOfEachDate();
    const dataDaily: Array<EnergySensorDailyChart> = [];

    if (dataDailyRaw && Array.isArray(dataDailyRaw) && dataDailyRaw.length >= 2) {
      const startDate = new Date(dataDailyRaw[0].date);
      const endDate = new Date(dataDailyRaw[dataDailyRaw.length - 1].date);

      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      for (let year = startYear; year <= endYear; year++) {
        const monthStart = (year === startYear) ? startMonth : 0;
        const monthEnd = (year === endYear) ? endMonth : 11;

        for (let month = monthStart; month <= monthEnd; month++) {
          // Do something for each month and year
          const energy = this.getEnergyOfMonth(year, month);
          dataDaily.push({date: new Date(year, month, 1).getTime(), energy});
        }
      }
    }
    return dataDaily;

  }

  /**
   *
   * @param year: year to get data, ex 2023
   */
  getDataOfYear(year: number): Array<EnergySensorMonthly> {
    let data: Array<EnergySensorMonthly>;
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      const listMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      data = [];
      listMonth.forEach(month => {
        const firstDate = new Date(year, month, 1, 0, 0, 0, 0).getTime();
        const lastDate = new Date(year, month, getLastDayOfMonth(year, month).getDate(), 23, 59, 59, 999).getTime();
        const dataDaily = this.energySensorDailies.filter(value => value.date >= firstDate && value.date <= lastDate).sort(
          (a, b) => a.date - b.date
        );
        // const total = dataDaily.reduce((power, obj) => power + obj.data.energy, 0);

        let total = 0;
        if (dataDaily && Array.isArray(dataDaily) && dataDaily.length > 1) {
          total = dataDaily[dataDaily.length - 1].data.energy - dataDaily[0].data.energy;
          total = Math.round(total * 1000) / 1000;
        }
        data.push({energyTotal: total, dataDaily});
      });
    }
    return data;
  }

  getFirstEnergyDataOfDate(date: Date) {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      /*Get all data of current date*/
      const dataDaily = this.energySensorDailies
        .filter(value => {
          const dateFilter = new Date(value?.date);
          if (dateFilter.getFullYear() === date.getFullYear()
            && dateFilter.getMonth() === date.getMonth()
            && dateFilter.getDate() === date.getDate()) {
            return value;
          }
        }).sort(
          (a, b) => a.date - b.date
        );
      if (dataDaily && Array.isArray(dataDaily) && dataDaily.length > 0) {
        return dataDaily[0];
      }
    }
  }

  getLastEnergyDataOfDate(date: Date) {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      /*Get all data of current date*/
      const dataDaily = this.energySensorDailies
        .filter(value => {
          const dateFilter = new Date(value?.date);
          if (dateFilter.getFullYear() === date.getFullYear()
            && dateFilter.getMonth() === date.getMonth()
            && dateFilter.getDate() === date.getDate()) {
            return value;
          }
        }).sort(
          (a, b) => a.date - b.date
        );
      if (dataDaily && Array.isArray(dataDaily) && dataDaily.length > 0) {
        return dataDaily[dataDaily.length - 1];
      }
    }
  }

  getEnergyOfDate(date: Date) {
    //request: this.energySensorDailies mush have pre month data and current data;
    //calculate pre date

    const preDate = new Date(date);
    preDate.setDate(preDate.getDate() - 1);

    //get last energy of pre month
    const energyPreDate = this.getLastEnergyDataOfDate(preDate);
    //get last energy of current month
    const lastDataOfDate = this.getLastEnergyDataOfDate(date);
    if (energyPreDate) {
      if (lastDataOfDate && lastDataOfDate.data.energy > energyPreDate.data.energy) {
        return lastDataOfDate.data.energy - energyPreDate.data.energy;
      } else {
        return 0;
      }
    } else {
      //get energy of first date of current month
      const firstDateOfDate = this.getFirstEnergyDataOfDate(date);
      if (firstDateOfDate && lastDataOfDate && lastDataOfDate.data.energy > firstDateOfDate.data.energy) {
        return lastDataOfDate.data.energy - firstDateOfDate.data.energy;
      } else {
        return 0;
      }
    }
  }

  getRawDataOnLastDateOfMonth(year: number, month: number) {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      /*Get all data per month*/
      const startDate = new Date(year, month, 1, 0, 0, 0, 0);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999).getTime();
      const dataDaily = this.energySensorDailies
        .filter(value => {
          const date = new Date(value?.date);
          if (date.getFullYear() === year && date.getMonth() === month) {
            return value;
          }
        }).sort(
          (a, b) => a.date - b.date
        );
      if (dataDaily && Array.isArray(dataDaily) && dataDaily.length > 0) {
        return dataDaily[dataDaily.length - 1];
      }
    }
  }

  getRawDataOnFirstDateOfMonth(year: number, month: number) {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      /*Get all data per month*/
      const startDate = new Date(year, month, 1, 0, 0, 0, 0);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999).getTime();
      const dataDaily = this.energySensorDailies
        .filter(value => {
          const date = new Date(value?.date);
          if (date.getFullYear() === year && date.getMonth() === month) {
            return value;
          }
        }).sort(
          (a, b) => a.date - b.date
        );
      if (dataDaily && Array.isArray(dataDaily) && dataDaily.length > 0) {
        return dataDaily[0];
      }
    }
  }

  getEnergyOfMonth(year: number, month: number) {
    //request: this.energySensorDailies mush have pre month data and current data;
    //calculate pre month

    const preMonth = new Date(year, month, 0).getMonth();
    const preYear = new Date(year, month, 0).getFullYear();

    //get last energy of pre month
    const energyOfPreMonth = this.getRawDataOnLastDateOfMonth(preYear, preMonth);
    //get last energy of current month
    const energyOfCurrentMonth = this.getRawDataOnLastDateOfMonth(year, month);
    if (energyOfPreMonth) {
      if (energyOfCurrentMonth && energyOfCurrentMonth.data.energy > energyOfPreMonth.data.energy) {
        return energyOfCurrentMonth.data.energy - energyOfPreMonth.data.energy;
      } else {
        return null;
      }
    } else {
      //get energy of first date of current month
      const energyFirstDateOfCurrentMonth = this.getRawDataOnFirstDateOfMonth(year, month);
      if (energyFirstDateOfCurrentMonth && energyOfCurrentMonth && energyOfCurrentMonth.data.energy > energyFirstDateOfCurrentMonth.data.energy) {
        return energyOfCurrentMonth.data.energy - energyFirstDateOfCurrentMonth.data.energy;
      } else {
        return null;
      }
    }
  }

  /**
   * Get all data of month
   *
   * @param year: year to get data, ex: 2023
   * @param month: month to get data, ex: 0-11
   */
  getDataOfMonth(year: number, month: number): EnergySensorMonthly {

    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {

      /*Get all data per month*/
      const startDate = new Date(year, month, 1, 0, 0, 0, 0).getTime();
      const endDate = new Date(year, month, getLastDayOfMonth(year, month).getDate(), 23, 59, 59, 999).getTime();

      const preMonth = new Date(year, month, 0).getMonth();
      const preYear = new Date(year, month, 0).getFullYear();
      /*      if (preMonth > 0) {
              preMonth = preMonth - 1;
            } else {
              preMonth = 11;
              preYear = preYear - 1;
            }*/


      const lastDateOfPreMonth = this.getRawDataOnLastDateOfMonth(preYear, preMonth);
      const lastDateOfMonth = this.getRawDataOnLastDateOfMonth(year, month);


      const dataDaily
        = this.energySensorDailies.filter(value => value.date >= startDate && value.date <= endDate).sort(
        (a, b) => a.date - b.date
      );

      let energyTotal = 0;

      if (dataDaily && Array.isArray(dataDaily)) {
        //: dataDaily.reduce((power, obj) => power + obj.data.energy, 0)
        if (dataDaily.length > 1) {
          energyTotal = (dataDaily[dataDaily.length - 1].data.energy - dataDaily[0].data.energy);
          energyTotal = Math.round(energyTotal * 1000) / 1000;
        }
      }

      return {
        dataDaily,
        energyTotal,
      };
    }
    return null;
  }

  getDateOfMonthToDrawChart(year: number, month: number): EnergySensorMonthlyChart {
    const energySensorMonthly = this.getDataOfMonth(year, month);

    let dataDaily: Array<EnergySensorDailyChart>;
    if (energySensorMonthly && energySensorMonthly.dataDaily
      && Array.isArray(energySensorMonthly.dataDaily)
      && energySensorMonthly.dataDaily.length > 0) {
      const fromDate = new Date(energySensorMonthly.dataDaily[0].date);
      const toDate = new Date(energySensorMonthly.dataDaily[energySensorMonthly.dataDaily.length - 1].date);
      dataDaily = [];

      for (let date = fromDate.getDate(); date <= toDate.getDate(); date++) {
        const dataOfDate = energySensorMonthly.dataDaily
          .filter(value => new Date(value.date).getDate() === date).sort(
            (a, b) => a.date - b.date
          );

        if (dataOfDate && Array.isArray(dataOfDate) && dataOfDate.length > 0) {
          dataDaily.push(
            {
              date: dataOfDate[dataOfDate.length - 1].date,
              energy: Math.round((dataOfDate[dataOfDate.length - 1].data.energy - dataOfDate[0].data.energy) * 1000) / 1000
            }
          );
        }
      }
    }
    return {energyTotal: energySensorMonthly.energyTotal, dataDaily};
  }


  /**
   * Get data of current month
   */
  getCurrentMonthData(): EnergySensorMonthly {
    const today = new Date();
    return this.getDataOfMonth(today.getUTCFullYear(), today.getUTCMonth());
  }

  getLastDataOfDate(): EnergySensorDaily {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      return this.energySensorDailies[0];
    }
    return null;
  }

  getTotalEnergy(): number {
    let energyTotal = 0;
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 1) {
      const res = this.energySensorDailies
        .sort((a, b) => b.date - a.date);
      energyTotal = (res[0].data.energy
        - res[this.energySensorDailies.length - 1].data.energy);
      energyTotal = Math.round(energyTotal * 1000) / 1000;
    }
    return energyTotal;
  }

  getFirstData(): EnergySensorDaily {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      const res = this.energySensorDailies
        .sort((a, b) => a.date - b.date);
      return res[0];
    }
    return null;
  }

  getLastData(): EnergySensorDaily {
    if (this.energySensorDailies && Array.isArray(this.energySensorDailies) && this.energySensorDailies.length > 0) {
      const res = this.energySensorDailies
        .sort((a, b) => b.date - a.date);
      return res[0];
    }
    return null;
  }
}
