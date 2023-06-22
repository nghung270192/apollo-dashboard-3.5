import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarSharedComponent} from './toolbar-shared.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    ToolbarSharedComponent
  ],
  exports: [
    ToolbarSharedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ToolbarSharedModule {
}
