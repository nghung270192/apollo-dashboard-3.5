import {GatewayControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Observable, of} from 'rxjs';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/pelab/pelab.model';
import {map} from 'rxjs/operators';

export class PelabGateway extends GatewayControllerAbstract {
  private gateway: PelabGatewayNodeTreeImpl;
  username: string;
  hostname: string;
  password: string;
  token: string;
  apiKey: string;

  constructor(nodeTree: NodeTree, apollo: ApolloWidgetContext) {
    super(nodeTree, apollo);
    this.gateway = this.apollo.pelabGateway.get(nodeTree.id.id);

  }

  isApiRunning(): Observable<boolean> {
    return of(!!this.gateway);
  }

  isOnline(): Observable<boolean> {
    return this.isApiRunning();
  }

}
