import {NgModule} from '@angular/core';
import {
  ApolloTreeSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/apollo-tree-setting.component';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {SharedModule} from '@shared/shared.module';
import {CommonModule} from '@angular/common';
import {MenuModule} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/menu/menu.module';
import {BodyPageModule} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/body-page.module';
import {MainPageComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/main-page.component';
import {
  WidgetSettingComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/widget-setting.component';
import {ComponentShared} from '@modules/apollo/widget/smart-dashboard-v2/component/share/smart-dashboard-shared.module';


@NgModule({
  declarations: [ApolloTreeSettingComponent,
    WidgetSettingComponent,
    MainPageComponent,],
  imports: [
    BodyPageModule,
    ApolloShareModule,
    ComponentShared,
    SharedModule,
    CommonModule,
    MenuModule,
  ],
  exports: [
    ApolloTreeSettingComponent,
    MainPageComponent,
  ]
})
export class MainModule {
}
