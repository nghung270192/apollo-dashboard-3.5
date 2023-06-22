import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarSharedComponent} from './toolbar-shared.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    ToolbarSharedComponent
  ],
  exports: [
    ToolbarSharedComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
    FlexLayoutModule
  ]
})
export class ToolbarSharedModule {
}
