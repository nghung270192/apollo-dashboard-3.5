import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CtlControllerComponent} from './ctl-controller.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [CtlControllerComponent],
  imports: [
    CommonModule,

    SharedModule,
  ],
  exports: [
    CtlControllerComponent
  ]
})
export class CtlControllerModule {
}
