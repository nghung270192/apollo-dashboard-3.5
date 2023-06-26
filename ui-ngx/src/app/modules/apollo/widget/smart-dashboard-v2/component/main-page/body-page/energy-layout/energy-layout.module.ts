import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnergyLayoutComponent} from './energy-layout.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  BleSigmeshModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/ble-sigmesh/ble-sigmesh.module';
import {
  ToolbarSharedModule
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/device/dialog-controller/toolbar-shared/toolbar-shared.module';


@NgModule({
  declarations: [
    EnergyLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    BleSigmeshModule,
    ToolbarSharedModule,
  ],
  exports: [
    EnergyLayoutComponent
  ]
})
export class EnergyLayoutModule {
}
