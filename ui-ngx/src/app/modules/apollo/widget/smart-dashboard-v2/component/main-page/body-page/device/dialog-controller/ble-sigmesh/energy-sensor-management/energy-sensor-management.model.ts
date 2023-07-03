export interface EnergySensorParameters {
  current: number;
  voltage: number;
  power: number;
  energy: number;
}

export interface EnergySensorDaily {
  data: EnergySensorParameters;
  date: number;
}

export interface EnergySensorMonthly {
  energyTotal: number;
  dataDaily: Array<EnergySensorDaily>;
}

export interface EnergySensorYearly {
  date: Array<EnergySensorMonthly>;

}

export interface EnergySensorDailyChart {
  date: number | Date | string;
  energy: number;
}

export interface EnergySensorMonthlyChart {
  energyTotal: number;
  dataDaily: Array<EnergySensorDailyChart>;
}
