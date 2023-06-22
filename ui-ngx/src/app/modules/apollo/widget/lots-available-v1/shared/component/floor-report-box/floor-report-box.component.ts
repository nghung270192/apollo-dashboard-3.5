import {Component, Input} from '@angular/core';
import {EventCallback} from '@modules/apollo/widget/lots-available-v1/shared/models/lots-available.model';

@Component({
  selector: 'tb-floor-report-box',
  templateUrl: './floor-report-box.component.html',
  styleUrls: ['./floor-report-box.component.scss']
})
export class FloorReportBoxComponent {
  @Input() label: string;
  @Input() value: any;


  @Input() eventCallback: EventCallback;

  openNew() {
    if (this.eventCallback) {
      this.eventCallback.openNew({a: 'asdf'});
    }
  }
}
