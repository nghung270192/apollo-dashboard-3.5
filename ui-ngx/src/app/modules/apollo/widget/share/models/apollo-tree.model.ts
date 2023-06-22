import {BaseData} from '@shared/models/base-data';
 import {TenantId} from '@shared/models/id/tenant-id';
import {CustomerId} from '@shared/models/id/customer-id';
import {ApolloTreeId} from './apollo-tree-id';

export interface ApolloTree extends BaseData<ApolloTreeId> {
  tenantId?: TenantId;
  customerId?: CustomerId;
  name: string;
  type: string;
  label: string;
  additionalInfo?: any;
}
