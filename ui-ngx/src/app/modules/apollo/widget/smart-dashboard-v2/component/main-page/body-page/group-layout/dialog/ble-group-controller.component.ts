import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ProductModel} from '@modules/apollo/widget/share/models/ble-sigmesh/ble-product.id';
import {BleGroupController} from '@modules/apollo/widget/smart-dashboard-v2/models/group/group-controller.model';
import {
  ShareControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/dialog/share-controller-component.directive';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';


@Component({
  selector: 'tb-group-controller',
  templateUrl: './ble-group-controller.component.html',
  styleUrls: ['./ble-group-controller.component.scss']
})
export class BleGroupControllerComponent extends ShareControllerComponent<BleGroupController> implements OnInit {
  elementIndex = 0;

  constructor(protected store: Store<AppState>,
              @Inject('controller') public controller: BleGroupController,
              private cd: ChangeDetectorRef) {
    super(store, controller);
  }


  productModel = ProductModel.light;
  ProductModel = ProductModel;

  ngOnInit(): void {
    console.log(this.controller);
  }

  lightnessChange(event) {
    if (this.controller) {
      this.controller.setLightness(event).subscribe(res => {
      });
    }
  }

  stateChange(event) {

  }

  hslChange(event) {
    if (this.controller) {
      this.controller.setHsl(event).subscribe(res => {
      });
    }
  }
}
