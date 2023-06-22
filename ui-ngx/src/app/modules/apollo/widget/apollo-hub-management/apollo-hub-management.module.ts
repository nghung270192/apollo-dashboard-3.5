import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApolloHubManagementComponent} from './apollo-hub-management.component';
import {SharedModule} from '@shared/shared.module';
import { HubSettingComponent } from './hub-setting.component';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';


@NgModule({
  declarations: [
    ApolloHubManagementComponent,
    HubSettingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule
  ], exports: [
    ApolloHubManagementComponent]
})
export class ApolloHubManagementModule {
}
