import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {
  GatewaySetting
} from '@modules/apollo/widget/smart-dashboard-v1/component/main-page/body-page/gateway/setting/gateway-setting.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-entity-type.model';
import {DqsmartGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/dqsmart/dqsmart.model';

@Component({
  selector: 'tb-dqsmart-setting',
  templateUrl: './dqsmart-setting.component.html',
  styleUrls: ['./dqsmart-setting.component.scss']
})
export class DqsmartSettingComponent implements OnInit, GatewaySetting, OnChanges {

  username: string;
  password: string;
  token: string;
  hassUrl: string;
  loading = false;

  status = '';

  @Input() name = '';
  @Input() nodeTree: NodeTree;
  @Input() addTrigger: boolean;
  @Input() apollo: ApolloWidgetContext;
  @Output() saveDone: EventEmitter<any> = new EventEmitter<any>();

  GatewayModel = GatewayModel;
  dqsmartGateway: DqsmartGatewayNodeTreeImpl;

  constructor() {
  }

  ngOnInit(): void {
    this.dqsmartGateway = new DqsmartGatewayNodeTreeImpl(this.nodeTree, this.apollo);
    this.username = this.dqsmartGateway.username;
    this.token = this.dqsmartGateway.token;
    this.password = this.dqsmartGateway.password;
    this.hassUrl = this.dqsmartGateway.hassUrl;
  }

  save(): void {
    this.dqsmartGateway.name = this.name;
    this.dqsmartGateway.model = GatewayModel.DQSMART;
    this.dqsmartGateway.username = this.username;
    this.dqsmartGateway.password = this.password;
    this.dqsmartGateway.token = this.token;
    this.dqsmartGateway.hassUrl = this.hassUrl;

    this.loading = true;
    this.dqsmartGateway.save().subscribe(res => {
      this.loading = false;
      this.saveDone.emit();
    });
  }

  check() {
    this.apollo.dqsmartService.checkApi(this.hassUrl, this.token).subscribe(res => {
      if (res?.message == 'API running.') {
        this.status = 'API running.';
      }
    }, error => this.status = 'API not work');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange() == false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.save();
      console.log('create event');
    }
  }
}
