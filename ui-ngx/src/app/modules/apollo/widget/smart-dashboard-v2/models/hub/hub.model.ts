import {HubModel, HubSource} from "@modules/apollo/widget/share/models/apollo-hub/hub.model";

export interface HubParamsSource {
  name?: string;
  label?: string;
  model?: HubModel;
  hubSource: HubSource;
}
