import {Type} from '@angular/core';
import {GatewayControllerAbstract} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/gateway.model';
import {ApolloGateway} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/apollo-gateway';
import {DqsmartGateway} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/dqsmart-gateway';
import {PelabGateway} from '@modules/apollo/widget/smart-dashboard-v2/models/gateway/pelab-gateway';

export const GatewayProvider: { [key: string]: Type<GatewayControllerAbstract> } = {
  APOLLO: ApolloGateway,
  DQSMART: DqsmartGateway,
  PELAB_LORA: PelabGateway
};
