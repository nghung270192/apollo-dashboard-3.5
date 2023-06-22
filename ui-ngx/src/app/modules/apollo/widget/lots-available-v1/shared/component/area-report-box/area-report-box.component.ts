import {Component, Input, OnInit} from '@angular/core';
 import {AreaParamsReport} from '../../models/area.model';
import {EventCallback} from '@modules/apollo/widget/lots-available-v1/shared/models/lots-available.model';



@Component({
  selector: 'tb-area-report-box',
  templateUrl: './area-report-box.component.html',
  styleUrls: ['./area-report-box.component.scss']
})
export class AreaReportBoxComponent implements OnInit {

  params: { [key: string]: AreaParamsReport } = {
    total: {label: 'Tổng', value: 0},
    used: {label: 'Đã sử dụng', value: 0},
    remain: {label: 'Còn trống', value: 0},
    disconnect: {label: 'Mất kết nối', value: 0},
  };

  paramArray = Object.values(this.params);


  @Input() eventCallback: EventCallback;

  ngOnInit(): void {
  }


  openNew() {
    if (this.eventCallback) {
      this.eventCallback.openNew({id: 'from area report box'});
    }
  }
}
