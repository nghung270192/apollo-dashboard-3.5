import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ClimateDialogControllerComponent
} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/dialog/climate-dialog-controller.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [ClimateDialogControllerComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DqsmartEntityialogModule {
}
