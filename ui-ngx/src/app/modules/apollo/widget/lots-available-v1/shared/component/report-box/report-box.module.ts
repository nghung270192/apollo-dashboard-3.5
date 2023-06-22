import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportBoxComponent } from './report-box.component';
import {SharedModule} from '@shared/shared.module';



@NgModule({
  declarations: [
    ReportBoxComponent
  ],
  exports: [
    ReportBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ReportBoxModule { }
