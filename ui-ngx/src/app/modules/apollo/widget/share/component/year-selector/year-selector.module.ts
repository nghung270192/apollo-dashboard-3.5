import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YearSelectorComponent} from '@modules/apollo/widget/share/component/year-selector/year-selector.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [YearSelectorComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    YearSelectorComponent
  ]
})
export class YearSelectorModule {
}
