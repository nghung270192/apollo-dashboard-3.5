import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  DataViewDialogControllerI,
  DialogControllerDirective
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/dialog-controller.directive';
import {
  BaseBleSigmeshController
} from '@modules/apollo/widget/smart-dashboard-v2/models/blemesh/device-type/base-ble-sigmesh-controller';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'tb-base-node-controller',
  templateUrl: './base-node-controller.component.html',
  styleUrls: ['./base-node-controller.component.scss']
})
export class BaseNodeControllerComponent
  extends DialogControllerDirective<BaseNodeControllerComponent, BaseBleSigmeshController>
  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BaseNodeControllerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataViewDialogControllerI<BaseBleSigmeshController>,
    private cd: ChangeDetectorRef,
  ) {
    super(dialogRef, data);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
