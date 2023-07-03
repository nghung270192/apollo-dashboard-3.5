import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {ComponentShared} from '@modules/apollo/widget/smart-dashboard-v2/component/share/smart-dashboard-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    ComponentShared,
  ],
  exports: [
    SharedModule,
    ApolloShareModule,
    ComponentShared,
  ]
})
export class SmartDashboardV2SharedModule {
}
