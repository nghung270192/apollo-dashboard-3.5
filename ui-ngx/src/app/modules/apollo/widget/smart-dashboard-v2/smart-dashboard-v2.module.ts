import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SmartDashboardV2Component} from './smart-dashboard-v2.component';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {ComponentModule} from './component/component.module';
import {
  DqsmartEntityialogModule
} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dialog/dqsmart-entityialog.module';

@NgModule({
  declarations: [SmartDashboardV2Component],
  imports: [
    CommonModule,
    ApolloShareModule,
    ComponentModule,
    DqsmartEntityialogModule,
  ],
  exports: [SmartDashboardV2Component],
})
export class SmartDashboardV2Module {
}
