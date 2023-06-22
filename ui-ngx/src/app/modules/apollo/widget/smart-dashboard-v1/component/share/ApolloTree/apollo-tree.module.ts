import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
 import {SharedModule} from '@shared/shared.module';
import {ApolloTreeComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/share/ApolloTree/apollo-tree.component';


@NgModule({
  declarations: [ApolloTreeComponent
     ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ApolloTreeComponent
  ]
})
export class ApolloTreeModule {
}
