import {ApolloEntityComponent} from '@modules/apollo/widget/smart-dashboard-v1/component/share/apollo-node-tree/apollo-entity.component';
import { Observable, of } from 'rxjs';
import {EntityByIdOperation, EntityIdOneWayOperation} from '@home/models/entity/entities-table-config.models';
import {BaseData, HasId} from '@shared/models/base-data';
import { Type } from '@angular/core';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloTree} from '@modules/apollo/widget/share/models/apollo-tree.model';
import {HasUUID} from '@shared/models/id/has-uuid';

export type EntityCreateEntities<P,T> = (sourceParams: P, parent: T) => Observable<any>;

export class ApolloEntityConfig<T extends BaseData<HasId>, P, L> {

  entityComponent: Type<ApolloEntityComponent<T, P, L>>;
  paren: L;
  loadEntity: EntityByIdOperation<T> = () => of();
  createEntities: EntityCreateEntities<P,T> = () => of();
  deleteEntity: EntityIdOneWayOperation = () => of();
}
