import {Component, Input} from '@angular/core';


@Component({
  selector: 'tb-report-box',
  templateUrl: './report-box.component.html',
  styleUrls: ['./report-box.component.scss']
})
export class ReportBoxComponent {
  @Input() label: string;
  @Input() value: any;
  @Input() size = 'big';

}
