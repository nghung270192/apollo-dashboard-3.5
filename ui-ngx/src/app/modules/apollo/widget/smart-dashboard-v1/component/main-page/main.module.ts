import {NgModule} from '@angular/core';
import {BodyPageModule} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/body-page.module';
import {ApolloTreeSettingComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/apollo-tree-setting.component';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {SharedModule} from '@shared/shared.module';
import {CommonModule} from '@angular/common';
import {MenuModule} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/menu/menu.module';


@NgModule({
  declarations: [ApolloTreeSettingComponent],
  imports: [
    BodyPageModule,
    ApolloShareModule,
    SharedModule,
    CommonModule,
    MenuModule
  ],
  exports: [
    ApolloTreeSettingComponent,
    BodyPageModule
  ]
})
export class MainModule {
}
