import {NodeTree, NodeTreeImpl} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-node-tree.model';
import {ApolloWidgetContext} from '@modules/apollo/widget/smart-dashboard-v1/models/apollo-widget-context.model';
import {Observable} from 'rxjs';
import {PelabEntity} from '@modules/apollo/widget/share/models/pelab/pelab.model';

export class PelabGatewayNodeTreeImpl extends NodeTreeImpl {
  private _token;

  constructor(nodeTree: NodeTree, private apollo: ApolloWidgetContext) {
    super(nodeTree);
    if (this.additionalInfo.hostname && this.additionalInfo.apiKey && this.additionalInfo.password
      && this.additionalInfo.username)
    //todo: read token in cookie, if not => login or not
      {apollo.pelabService.login(this.additionalInfo.hostname, this.additionalInfo.apiKey, {
        Password: this.additionalInfo.password,
        Username: this.additionalInfo.username
      }).subscribe(res => {
        this.token = res.token;
      });}
  };

  get hostname(): string {
    return this.additionalInfo.hostname;
  }

  set hostname(hostname: string) {
    this.additionalInfo.hostname = hostname;
  }

  get username(): string {
    return this.additionalInfo.username;
  }

  set username(username: string) {
    this.additionalInfo.username = username;
  }

  get password(): string {
    return this.additionalInfo.username;
  }

  set password(password: string) {
    this.additionalInfo.password = password;
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  get apiKey(): string {
    return this.additionalInfo.apiKey;
  }

  set apiKey(apiKey: string) {
    this.additionalInfo.apiKey = apiKey;
  }

  save(): Observable<NodeTree> {
    return this.apollo.apolloNodeTreeService.saveApolloNodeTree(this.toApolloNodeTree());
  }

  getDevices(): Observable<Array<PelabEntity>> {
    return this.apollo.pelabService.loginAndGetDevices(this.hostname,
      this.apiKey, {Username: this.username, Password: this.password});
  }

  setState(dimming: number, power: boolean, IsUsingSensor: boolean, address: Array<string>): Observable<any> {
    return this.apollo.pelabService.manualControl(this.hostname, this.apiKey, {
      DeviceAddressStr: address,
      Dimming: dimming,
      IsUsingSensor,
      Power: power,
      Token: this.token
    });
  }

  getDevice(address: string): Observable<PelabEntity> {
    return this.apollo.pelabService.getDevice(this.hostname, this.apiKey, address, this.token);
  }
}
