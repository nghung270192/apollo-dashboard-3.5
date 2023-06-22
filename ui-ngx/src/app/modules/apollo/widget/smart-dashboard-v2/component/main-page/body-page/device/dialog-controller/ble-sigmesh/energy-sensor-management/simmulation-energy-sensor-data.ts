import {addDays} from 'date-fns';
import {
  EnergySensorDaily,
} from './energy-sensor-management.model';

import {randomInteger} from './energy-sensor-management';


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function GenerateEnergySensorDaily(date: number): EnergySensorDaily {
  return {
    data: {
      current: randomInteger(1, 10) / 10,
      energy: randomInteger(50, 100),
      power: randomInteger(50, 100),
      voltage: randomInteger(200, 230),
    },
    date
  };
}

export const TodayEnergySensorData = (): EnergySensorDaily => GenerateEnergySensorDaily(new Date().getTime());

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function GENERATE_ENERGEY_DATA(): Array<EnergySensorDaily> {
  const startDate = new Date('2021-01-01');
  const endDate = new Date();
  let currentDate = startDate;
  const data: Array<EnergySensorDaily> = [];
  while (currentDate <= endDate) {
    data.push(GenerateEnergySensorDaily(currentDate.getTime()));
    currentDate = addDays(currentDate, 1);
  }
  return data;
};
