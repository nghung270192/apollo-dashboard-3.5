import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeviceControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v1/models/device/device.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {PageComponent} from '@shared/components/page.component';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';

export interface DataViewDialog {
  entityController: DeviceControllerAbstract;
  apollo: ApolloWidgetContext;
}

@Component({
  selector: 'tb-light-controller',
  templateUrl: './common-light-controller.component.html',
  styleUrls: ['./common-light-controller.component.scss']
})
export class CommonLightControllerComponent extends PageComponent implements OnInit, AfterViewInit {
   lightness = 0;
  state = false;
  hasLightness: boolean;
  hasHsl: boolean;
  hasCTL: boolean;

  maxElementIndex: Array<number> = [];

  constructor(protected store: Store<AppState>,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CommonLightControllerComponent>,
              private cd: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: DataViewDialog) {
    super(store);


  }


  ngOnInit(): void {
    if (this.data.entityController && this.data.entityController.getMaxIndex) {
      this.maxElementIndex = Array.from({length: this.data.entityController.getMaxIndex()}, (_, i) => i + 1);
      this.cd.detectChanges();
    }
  }

  lightnessChange(event, elementIndex) {
    if (this.data?.entityController && this.data.entityController.setLightness) {
      this.data.entityController.setLightness({lightness: event, index: elementIndex}).subscribe(res => {
      });
    }
  }

  setState(event, value, elementIndex) {
    if (this.data?.entityController) {
      console.log(value);
      this.data.entityController.setState({
        state: value,
        index: elementIndex
      }).subscribe(value1 => console.log(value1));
    }
  }

  hslChange(event, elementIndex) {
    if (this.data?.entityController && this.data.entityController.setHsl) {
      this.data.entityController.setHsl({hsl: event, index: elementIndex}).subscribe(res => {
      });
    }
  }

  ngAfterViewInit(): void {

    this.cd.detectChanges();
  }

  cancel() {
    this.dialogRef.close();
  }

}
