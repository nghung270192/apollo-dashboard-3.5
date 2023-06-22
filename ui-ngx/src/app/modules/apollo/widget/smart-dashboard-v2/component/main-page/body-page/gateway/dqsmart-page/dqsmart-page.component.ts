import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/dqsmart/dqsmart.model';
import {SubscriptionLike} from 'rxjs';

@Component({
  selector: 'tb-dqsmart-page',
  templateUrl: './dqsmart-page.component.html',
  styleUrls: ['./dqsmart-page.component.scss']
})
export class DqsmartPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: SubscriptionLike;
  dqSmartGateway: DqsmartGatewayNodeTreeImpl;
  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;

  constructor() {
  }

  ngOnInit(): void {

    this.dqSmartGateway = new DqsmartGatewayNodeTreeImpl(this.nodeTree, this.apollo);
    this.subscription = this.apollo.dqsmartSubjectObserver.subscribe(res => {
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    if (this.dqSmartGateway.hassUrl && this.dqSmartGateway.token) {
      this.apollo.dqsmartService.getStates(this.dqSmartGateway.hassUrl, this.dqSmartGateway.token)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
