import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SmartDashboardV2SharedModule} from '@modules/apollo/widget/smart-dashboard-v2/smart-dashboard-v2-shared.module';
import {
  IconSceneEntityComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/scene-layout/icon-scene-entity.component';
import {
  SceneLayoutComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/scene-layout/scene-layout.component';


@NgModule({
  declarations: [
    SceneLayoutComponent,
    IconSceneEntityComponent,],
  imports: [
    CommonModule,
    SmartDashboardV2SharedModule
  ],
  exports: [

    SceneLayoutComponent,
    IconSceneEntityComponent,
  ]
})
export class SceneLayoutModule {
}
