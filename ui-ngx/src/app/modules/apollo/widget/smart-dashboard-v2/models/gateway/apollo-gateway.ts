import {GatewayControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from "@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model";
import {Observable, of} from "rxjs";

export class ApolloGateway extends GatewayControllerAbstract {
  constructor(nodeTree: NodeTree, apollo: ApolloWidgetContext) {
    super(nodeTree, apollo);
  }

  isApiRunning(): Observable<boolean>  {
    return of(false);
  }

  isOnline(): Observable<boolean>  {
    return of(false);
  }

}
