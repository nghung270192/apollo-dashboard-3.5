import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/share/area/area.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    AreaComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AreaComponent
  ]
})
export class AreaModule {
}
