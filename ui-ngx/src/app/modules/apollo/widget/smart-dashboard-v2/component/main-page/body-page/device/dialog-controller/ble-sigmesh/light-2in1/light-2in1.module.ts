import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LightRadarTogetherComponent} from './light-radar-together.component';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  ToolbarSharedModule
} from '../../toolbar-shared/toolbar-shared.module';


@NgModule({
  declarations: [
    LightRadarTogetherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    ToolbarSharedModule
  ],
  exports: [
    LightRadarTogetherComponent
  ]
})
export class Light2in1Module {
}
