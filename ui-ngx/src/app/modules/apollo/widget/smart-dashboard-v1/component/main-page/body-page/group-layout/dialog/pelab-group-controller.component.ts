import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  PelabGroupController
} from '@modules/apollo/widget/smart-dashboard-v1/models/group/group-controller.model';
import {
  AutoControlSettingDTOsImpl,
  PelabAutoControlImpl,
  PelabManualControlImpl
} from '@modules/apollo/widget/share/models/pelab/pelab.model';
import {
  ShareControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/share/dialog/share-controller-component.directive';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';

export enum PelabModeControl {
  manual = 'manual',
  auto = 'auto',
}

@Component({
  selector: 'tb-pelab-group-controller',
  templateUrl: './pelab-group-controller.component.html',
  styleUrls: ['./pelab-group-controller.component.scss']
})
export class PelabGroupControllerComponent extends ShareControllerComponent<PelabGroupController> implements OnInit {
  elementIndex = 0;
  modeControl: PelabModeControl = PelabModeControl.manual;
  manualDimming = 0;
  loading = false;

  PelabModeControl = PelabModeControl;

  readonly MAX_SCHEDULER = 6;
  manualControl: PelabManualControlImpl = new PelabManualControlImpl();
  autoControl: PelabAutoControlImpl = new PelabAutoControlImpl();


  constructor(protected store: Store<AppState>,
              @Inject('controller') public controller: PelabGroupController,
              private cd: ChangeDetectorRef) {
    super(store, controller);
  }

  ngOnInit(): void {
    for (let i = 1; i <= 6; i++) {
      this.autoControl.AutoControlSettingDTOs.push(new AutoControlSettingDTOsImpl());
    }

    console.log(this.autoControl);
  }

  lightnessChange(event) {
    if (this.controller) {
      this.controller.setLightness(event).subscribe(res => {
      });
    }
  }

  stateChange(event) {

  }

  update() {
    console.log(this.manualControl);
  }

}
