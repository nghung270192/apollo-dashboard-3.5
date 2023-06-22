import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  GatewaySetting
} from '@modules/apollo/widget/smart-dashboard-v2/component/main-page/body-page/gateway/setting/gateway-setting.model';
import {NodeTree} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-widget-context.model';
import {GatewayModel} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity-type.model';
import {PelabGatewayNodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v2/models/pelab/pelab.model';

@Component({
  selector: 'tb-pelab-setting',
  templateUrl: './pelab-setting.component.html',
  styleUrls: ['./pelab-setting.component.scss']
})
export class PelabSettingComponent implements OnInit, GatewaySetting, OnChanges {

  username: string;
  hostname: string;
  password: string;
  token: string;
  apiKey: string;
  loading = false;


  @Input() name = '';
  @Input() nodeTree: NodeTree;
  @Input() addTrigger: boolean;
  @Input() apollo: ApolloWidgetContext;
  @Output() saveDone: EventEmitter<any> = new EventEmitter<any>();

  pelabGateway: PelabGatewayNodeTreeImpl;
  status = '';

  constructor() {
  }

  ngOnInit(): void {

    this.pelabGateway = new PelabGatewayNodeTreeImpl(this.nodeTree, this.apollo);
    if (this.pelabGateway && this.pelabGateway?.additionalInfo) {
      this.username = this.pelabGateway.username;
      this.token = this.pelabGateway.token;
      this.password = this.pelabGateway.password;
      this.apiKey = this.pelabGateway.apiKey;
      this.hostname = this.pelabGateway.hostname;
    }
  }

  save(): void {
    this.pelabGateway.model = GatewayModel.PELAB_LORA;
    this.pelabGateway.hostname = this.hostname;
    this.pelabGateway.username = this.username;
    this.pelabGateway.password = this.password;
    this.pelabGateway.token = this.token;
    this.pelabGateway.apiKey = this.apiKey;

    this.loading = true;
    this.pelabGateway.save().subscribe(res => {
      this.loading = false;
      this.saveDone.emit();
    });
  }

  check() {
    this.apollo.pelabService.login(this.hostname, this.apiKey, {
      Username: this.username,
      Password: this.password
    }).subscribe(res => {
      if (res) {
        this.status = 'API running.';
      }
    }, error => this.status = 'API not work');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.addTrigger && changes.addTrigger.isFirstChange()===false && changes.addTrigger?.previousValue != changes.addTrigger?.currentValue) {
      this.save();
      console.log('create event');
    }
  }
}
