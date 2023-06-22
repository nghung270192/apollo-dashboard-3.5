import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CommonMenuComponent
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/menu/common-menu.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    CommonMenuComponent],
  exports: [
    CommonMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class MenuModule {
}
