import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {ApolloShareModule} from '@modules/apollo/widget/share/apollo-share.module';
import {
  CreateGroupFromApolloComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/group/create-group-from-apollo.component';
import {
  CreateGroupFromDqsmartComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/group/create-group-from-dqsmart.component';
import {
  CreatePelabGroupComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/group/create-pelab-group.component';
import {
  GroupCreateOrUpdateComponent
} from '@modules/apollo/widget/smart-dashboard-v2/component/share/group/group-create-or-update.component';
import {InputModule} from '@modules/apollo/widget/smart-dashboard-v2/component/share/input/input.module';



@NgModule({
  declarations: [
    CreateGroupFromApolloComponent,
    CreateGroupFromDqsmartComponent,
    CreatePelabGroupComponent,
    GroupCreateOrUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApolloShareModule,
    InputModule,
  ],
  exports:[
    CreateGroupFromApolloComponent,
    CreateGroupFromDqsmartComponent,
    CreatePelabGroupComponent,
    GroupCreateOrUpdateComponent
  ]
})
export class GroupModule { }
