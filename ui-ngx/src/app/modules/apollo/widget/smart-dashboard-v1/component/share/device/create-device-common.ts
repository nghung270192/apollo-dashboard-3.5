import {forkJoin, Observable} from 'rxjs';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {EventEmitter, Output} from '@angular/core';

export interface CreateDeviceCommon {
  save(): void;
}

export class CreateDeviceCommon implements CreateDeviceCommon {

  public loading = false;
  constructor() {
  }

  createNodeTrees(nodeTrees: Array<NodeTree>, apollo: ApolloWidgetContext): Observable<any> {
    const request = [];
    nodeTrees.forEach(nodeTree => {
      request.push(apollo.apolloNodeTreeService.saveApolloNodeTree(nodeTree));
    });
    return forkJoin(request);
  }

  createNodeTree(nodeTree: NodeTree, apollo: ApolloWidgetContext): Observable<any> {
    return apollo.apolloNodeTreeService.saveApolloNodeTree(nodeTree);
  }
}
