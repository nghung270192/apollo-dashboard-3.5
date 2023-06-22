import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
 import {SubscriptionLike} from 'rxjs';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/pelab/pelab.model';
import {PelabEntity} from '@modules/apollo/widget/share/models/pelab/pelab.model';

@Component({
  selector: 'tb-pelab-page',
  templateUrl: './pelab-page.component.html',
  styleUrls: ['./pelab-page.component.scss']
})
export class PelabPageComponent implements OnInit, AfterViewInit, OnDestroy {
  // private subscription: SubscriptionLike;
  columnsAnalyze: Array<string> = ['No', 'Name','Address', 'Status', 'Power', 'Energy'];
  pelabGateway: PelabGatewayNodeTreeImpl;

  datasource: Array<PelabEntity> = [];

  @Input() apollo: ApolloWidgetContext;
  @Input() nodeTree: NodeTree;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.pelabGateway = new PelabGatewayNodeTreeImpl(this.nodeTree, this.apollo);
  }

  ngAfterViewInit(): void {
    this.pelabGateway.getDevices().subscribe(res=>{this.datasource = res;
       this.cd.detectChanges();});
  }

  ngOnDestroy(): void {

  }

  editDevice($event){

  }

  removeDevice($event, device){

  }
}
