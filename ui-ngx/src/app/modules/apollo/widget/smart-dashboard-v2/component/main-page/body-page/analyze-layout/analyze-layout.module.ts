import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AnalyzeLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/analyze-layout/analyze-layout.component';
import {SharedModule} from '@shared/shared.module';
import {TreeAnalyzeComponent} from './tree-analyze.component';
import {DeviceHistoryAnalyzeComponent} from './device-history-analyze.component';


@NgModule({
  declarations: [AnalyzeLayoutComponent, TreeAnalyzeComponent, DeviceHistoryAnalyzeComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AnalyzeLayoutComponent, TreeAnalyzeComponent, DeviceHistoryAnalyzeComponent
  ]
})
export class AnalyzeLayoutModule {
}
