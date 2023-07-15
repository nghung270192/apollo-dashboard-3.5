import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {Observable} from "rxjs";

export interface GatewayParamsToCreateNew {
  name?: string;
  label?: string;
  model?: string;
}

export abstract class GatewayControllerAbstract {
  constructor(public nodeTree: NodeTree, public apollo: ApolloWidgetContext) {
  }

  abstract isOnline(): Observable<boolean>;

  abstract isApiRunning(): Observable<boolean>;

}

