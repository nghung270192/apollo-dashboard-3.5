import {Component} from '@angular/core';

export interface AreaParam {
  total: number;
  used: number;
  remain: number;
  disconnect: number;
}

export interface AreaParamsReport {
  value: number;
  label: string;
  color: string;
}

@Component({
  selector: 'tb-params-report',
  templateUrl: './params-report.component.html',
  styleUrls: ['./params-report.component.scss']
})
export class ParamsReportComponent {
  params: { [key: string]: AreaParamsReport } = {
    total: {label: 'Tổng vị trí', value: 0, color: 'black'},
    used: {label: 'Đã sử dụng', value: 0, color: 'red'},
    remain: {label: 'Còn trống', value: 0, color: 'green'},
    disconnect: {label: 'Mất kết nối', value: 0, color: 'gray'},
  };

  paramArray = Object.values(this.params);

}
