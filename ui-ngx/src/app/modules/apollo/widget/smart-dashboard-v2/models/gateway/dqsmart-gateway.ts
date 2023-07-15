import {GatewayControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

export class DqsmartGateway extends GatewayControllerAbstract {
  private gateway: DqsmartGatewayNodeTreeImpl;

  constructor(nodeTree: NodeTree, apollo: ApolloWidgetContext) {
    super(nodeTree, apollo);
    this.gateway = this.apollo.dqsmartGateway.get(nodeTree.id.id);
  }

  isApiRunning(): Observable<boolean> {
    return of(!!this.gateway);
  }

  isOnline(): Observable<boolean> {
    return this.isApiRunning();
  }

}
