import {BaseData} from '@shared/models/base-data';
import {ApolloNodeTreeId} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree-id';
import {TenantId} from '@shared/models/id/tenant-id';
import {CustomerId} from '@shared/models/id/customer-id';
import {ApolloTreeId} from '@modules/apollo/widget/share/models/apollo-tree-id';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';

export interface NodeTreeV1<T> extends BaseData<ApolloNodeTreeId> {
  tenantId?: TenantId;
  customerId?: CustomerId;
  parentId?: ApolloNodeTreeId;
  apolloTreeId?: ApolloTreeId;
  type?: NodeTreeType;
  path?: string;
  model?: string;
  additionalInfo?: T;
}
