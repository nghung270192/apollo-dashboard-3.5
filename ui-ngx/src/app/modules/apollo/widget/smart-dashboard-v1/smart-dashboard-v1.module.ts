import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SmartDashboardV1Component} from './smart-dashboard-v1.component';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {ComponentModule} from './component/component.module';
import {
  DqsmartEntityialogModule
} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/dialog/dqsmart-entityialog.module';


@NgModule({
  declarations: [
    SmartDashboardV1Component,
  ],
  imports: [
    CommonModule,
    ApolloShareModule,
    ComponentModule,
    DqsmartEntityialogModule
  ], exports: [SmartDashboardV1Component]
})
export class SmartDashboardV1Module {
}
