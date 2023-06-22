import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {ComponentSharedModule} from '@modules/apollo/widget/share/component/component-shared.module';


@NgModule({
  declarations: [],
  exports: [
    ComponentSharedModule
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentSharedModule

  ]
})
export class ApolloShareModule {
}
