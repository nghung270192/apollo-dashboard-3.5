import {ReportParamsI} from './report.model';

export interface AreaParam extends ReportParamsI {
  label: string;
}

export interface AreaParamsReport {
  value: number;
  label: string;
}
