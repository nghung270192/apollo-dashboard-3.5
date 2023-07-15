import {BaseData} from '@shared/models/base-data';
import {TenantId} from '@shared/models/id/tenant-id';
import {CustomerId} from '@shared/models/id/customer-id';
import {ApolloNodeTreeId} from './apollo-node-tree-id';
import {ApolloTreeId} from '@modules/apollo/widget/share/models/apollo-tree-id';
import {
  NodeTreeInfoBase,
  NodeTreeInfoBaseImpl
} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {NodeTreeType} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';


export interface NodeTree extends BaseData<ApolloNodeTreeId> {
  tenantId?: TenantId;
  customerId?: CustomerId;
  parentId?: ApolloNodeTreeId;
  apolloTreeId?: ApolloTreeId;
  type?: NodeTreeType;
  path?: string;
  // device-type?:Array<NodeTree>;
  model?: string;
  additionalInfo?: NodeTreeInfoBase;
}




export class NodeTreeImpl implements NodeTree {
  additionalInfo: NodeTreeInfoBaseImpl;
  apolloTreeId?: ApolloTreeId;
  createdTime?: number;
  customerId?: CustomerId;
  id: ApolloNodeTreeId;
  label: string;
  model?: string;
  name: string;
  parentId?: ApolloNodeTreeId;
  tenantId?: TenantId;
  type?: NodeTreeType;


  constructor(nodeTree?: NodeTree) {
    if (nodeTree) {
      this.additionalInfo = new NodeTreeInfoBaseImpl(nodeTree?.additionalInfo);
      this.apolloTreeId = nodeTree?.apolloTreeId;
      this.createdTime = nodeTree?.createdTime;
      this.customerId = nodeTree?.customerId;
      this.id = nodeTree?.id;
      this.label = nodeTree?.label;
      this.model = nodeTree?.model;
      this.name = nodeTree?.name;
      this.parentId = nodeTree?.parentId;
      this.tenantId = nodeTree?.tenantId;
      this.type = nodeTree?.type;
    }

  }


  public toApolloNodeTree(): NodeTree {
    const nodeTree: NodeTree = {
      additionalInfo: this.additionalInfo.toData(),
      apolloTreeId: this.apolloTreeId,
      customerId: this.customerId,
      label: this.label,
      model: this.model,
      name: this.name,
      parentId: this.parentId,
      tenantId: this.tenantId,
      id: this.id,
      createdTime: this.createdTime,
      type: this.type
    };

    return nodeTree;
  }


  uuid(): string {
    return this.id.id;
  }

}

export class HubNodeTreeImpl extends NodeTreeImpl {
  private _tbDeviceId = '';

  constructor(nodeTree?: NodeTree) {
    super(nodeTree);
    this._tbDeviceId = this.additionalInfo?.tbDeviceId?.id;
  }

  get tbDeviceId(): string {
    return this._tbDeviceId;
  }

}
