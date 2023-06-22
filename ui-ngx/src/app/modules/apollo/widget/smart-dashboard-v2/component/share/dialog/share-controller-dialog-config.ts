import {ApolloEntityComponent} from '@modules/apollo/widget/smart-dashboard-v2/component/share/apollo-node-tree/apollo-entity.component';
import { Observable, of } from 'rxjs';
import {EntityByIdOperation, EntityIdOneWayOperation} from '@home/models/entity/entities-table-config.models';
import {BaseData, HasId} from '@shared/models/base-data';
import { Type } from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';

export class ShareControllerDialogConfig<T,D>{

  entityComponent: Type<D>;
  controller: T;
  title: string;
}
