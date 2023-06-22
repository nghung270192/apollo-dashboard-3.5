import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CreateSceneFromApolloComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/scene/create-scene-from-apollo.component';
import {
  CreateSceneFromDqsmartComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/scene/create-scene-from-dqsmart.component';
import {
  SceneCreateOrUpdateComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/scene/scene-create-or-update.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {InputModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/input/input.module';


@NgModule({
  declarations: [
    CreateSceneFromApolloComponent,
    CreateSceneFromDqsmartComponent,
    SceneCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    InputModule
  ],
  exports: [
    CreateSceneFromApolloComponent,
    CreateSceneFromDqsmartComponent,
    SceneCreateOrUpdateComponent
  ]
})
export class SceneModule {
}
