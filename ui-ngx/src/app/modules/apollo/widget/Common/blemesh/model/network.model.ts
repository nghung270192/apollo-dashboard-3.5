// import {PeriodStep} from '@modules/apollo/widget/Common/blemesh/blemesh.model';
//
// export interface ConfigNetworkParams {
//   'local unicast': string;
//   'netkey': string[];
//   'appkey': string[];
// }
// export interface ConfigNetworkParamsResponse {
//   'local unicast': {
//     'addr': string;
//     'status': string;
//   };
//   'netkey'?: [
//     {
//       'key': string;
//       'status': string;
//     }];
//   'appkey'?: [{
//     'key': string;
//     'status': string;
//   }
//   ];
// }
//
//
// //### 10 Gửi lệnh get config relay
// //### 10.1 Gửi lệnh get config relay response
// //### 11 Gửi lệnh set config relay
// //### 11.1 Gửi lệnh set config relay response
// export interface RelayParamsGet{
//   'key': string;
//   'unicast': string;
// }
// export interface ApiRelayGet {
//   'method': 'config_relay_get_pro';
//   'params': RelayParamsGet;
//
//   timeout: number;
// }
// export interface RelayParamSet{
//   'key': string;
//   'unicast': string;
//   'relay': string;  /*hex s0.1.2*/
//   'RelayRetransmitCount': string; /*hex string 1byte*/
//   'RelayRetransmitIntervalSteps': string; /*hex string 1byte*/
// }
// export interface ApiRelaySet  {
//   'method': 'config_relay_set_pro';
//   'params': RelayParamSet;
//   timeout: number;
// }
// export interface ApiRelayResponse {
//   method: string;
//   'params': {
//     'unicast': string;
//     'Relay':  string;
//     'RelayRetransmitCount':  string;
//     'RelayRetransmitIntervalSteps': string;
//   };
// }
//
// //### 15 Bind appkey cho thiết bị
// //### 15.1 Bind appkey cho thiết bị response
// export interface BindKeyParamSet{
//   'unicast':  string;
//   'key':  string;
//   'netkey index':  string;
//   'appkey index':  string;
//   'appkey':  string;
// }
// export interface ApiBindKeySet {
//   'method': 'appkey_bind_pro';
//   'params': BindKeyParamSet;
//   timeout: number;
// }
// export interface ApiBindKeyResponse  {
//   'method'?: 'appkey_bind';
//   'params'?: {
//     'status'?: '00';
//     'unicast'?: '0002';
//   };
// }
//
// //### 16 Xóa appkey đã bind cho thiết bị
// //### 16.1 Hub trả lời lệnh xóa appkey thiết bị đã bind
// export interface UnBindKeyParamSet{
//   'unicast':  string;
//   'key':  string;
//   'netkey index':  string;
//   'appkey index':  string;
// }
// export interface ApiUnBindKeyParamSet {
//   'method': 'appkey_unbind_pro';
//   'params': UnBindKeyParamSet;
//   timeout: number;
// }
// export interface UnBindKeyParamResponse  {
//   'method'?: 'appkey_unbind';
//   'params'?: {
//     'status'?: '00';
//     'unicast'?: '0002';
//   };
// }
//
// //### 17 Get appkey đã bind cho thiết bị
// //### 17.1 Hub trả lời lệnh get appkey
// export interface BindKeyParamGet{
//   'unicast':  string;
//   'key':  string;
//   'netkey index':  string;
// }
// export interface ApiGetBindKeySet {
//   'method': 'appkey_get_pro';
//   'params': BindKeyParamGet;
//   timeout: number;
// }
// export interface ApiGetBindKeyResponse  {
//   'method'?: 'appkey_list';
//   'params'?: {
//     'status'?: string;
//     'unicast'?: string;
//     'appkeys': Array<string>;
//   };
// }
//
//
// //### 12 Gửi lệnh get config network transmit
// //### 12.1 Gửi lệnh get config network transmit response
// //### 13 Gửi lệnh set config network transmit
// //### 13.1 Gửi lệnh set config network transmit response
// export interface NetworkTransmitParamGet{
//   'key': string;
//   'unicast': string;/*hex string 2bytes*/
// }
// export interface NetworkTransmitParamSet{
//   'key': string;
//   'unicast': string;/*hex string 2bytes*/
//   'Network Transmit Count': string;/*hex string 1byte*/
//   'Network Transmit Interval Steps': string;/*hex string 1byte*/
// }
// export interface ApiNetworkTransmitGet  {
//   method: 'config_network_transmit_get_pro';
//   'params': NetworkTransmitParamGet;
//   timeout: number;
// }
// export interface ApiNetworkTransmitSet {
//   method: 'config_network_transmit_set_pro';
//   'params': NetworkTransmitParamSet;
//   timeout: number;
// }
// export interface ApiNetworkTransmitResponse{
//   method?: string;
//   'params'?: {
//     'unicast'?:  string;
//     'Network Transmit Count'?: string;
//     'Network Transmit Interval Steps'?: string;
//   };
// }
//
//
// //### 18 Bind key cho model trong element của thiết bị
// //### 18.1 Bind key cho model trong element của thiết bị response
// export interface BindkeyModelParams{
//   'unicast': string;
//   'key': string;
//   'element address': string;
//   'model identifier': string;
//   'appKey index': string;
// }
// export interface ApiBindkeyModelSet{
//   'method': 'bind_appkey_model_pro';
//   'params': BindkeyModelParams;
//   timeout: number;
// }
// export interface ApiBindkeyModelSetResponse{
//   'method': 'bind_key_model';
//   'params': {
//     'status': string;
//     'element': string;
//   };
// }
//
//
// //### 19 Xóa appkey model đã bind
// //### 19.1 Hub trả lời lệnh xóa appkey model đã bind
// export interface UnBindkeyModelParams{
//   'unicast': string;
//   'key': string;
//   'element address': string;
//   'model identifier': string;
//   'appKey index': string;
// }
// export interface ApiUnBindkeyModelSet{
//   'method': 'unbind_appkey_model_pro';
//   'params': BindkeyModelParams;
//   timeout: number;
// }
// export interface ApiUnBindkeyModelSetResponse{
//   'method': 'unbind_key_model';
//   'params': {
//     'status': string;
//     'element': string;
//     'model identifier': string;
//     'appKey index': string;
//   };
// }
//
// //### 20 Get appkey đã bind cho SIG model
// //### 20.1 Hub trả lời lệnh get appkey sig model
// export interface AppKeySigModelParamsGet{
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'model identifier': string;
// }
// export interface ApiAppKeySigModelParamsGet {
//   'method': 'get_appkey_sig_model_pro';
//   'params': ProxyParamsGet;
//   timeout: number;
// }
// export interface ApiAppKeySigModelParamsResponse {
//   method: 'sig_appkey_list';
//   'params': {
//     'status': string;
//     'unicast': string;
//     'element_address': string;
//     'model_identifier': string;
//     'appkeys': Array<string>;
//   };
// }
//
//
// //### 21 Get appkey đã bind cho VENDOR model
// //### 21.1 Hub trả lời lệnh get appkey vendor model
// export interface AppKeyVendorModelParamsGet{
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'model identifier': string;
// }
// export interface ApiAppKeyVendorModelParamsGet {
//   'method': 'get_appkey_vendor_model_pro';
//   'params': ProxyParamsGet;
//   timeout: number;
// }
// export interface ApiAppKeyVendorModelParamsResponse {
//   method: 'vendor_appkey_list';
//   'params': {
//     'status': string;
//     'unicast': string;
//     'element_address': string;
//     'model_identifier': string;
//     'appkeys': Array<string>;
//
//   };
// }
//
//
// //### 1 Set Publish cho Model
// //### 1.1 Set Publish cho Model response (không thay đổi)
// //### 2 Get Publish đã set cho Model
// //### 2.1 Get Publish đã set cho Model response (không thay đổi)
// export interface PublicationParamsSet{
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'publish address': string;
//   'appkey index': string;
//   'model identifier': string;
//   'period step': string;
//   'period resolution': string;
//   'RetransmitCount': string;
//   'RetransmitIntervalSteps': string;
//   'ttl': string;
// }
// export interface ApiPublicationSet {
//   'method': 'config_publication_add_pro';
//   'params': PublicationParamsSet;
//   timeout: number;
// }
// export interface PublicationParamsGet{
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'model identifier': string;
// }
// export interface ApiPublicationGet {
//   'method': 'config_publication_get_pro';
//   'params': PublicationParamsGet;
//   timeout: number;
// }
// export interface ApiPublicationResponse {
//   method: 'node_publication_add';
//   'params': {
//     'status': string;
//     'element addr'?: string;
//     'publish addr'?: string;
//     'appkey index'?: string;
//     'credential flag'?: string;
//     'publish ttl'?: string;
//     'preriod resolution'?: PeriodStep;
//     'preriod step'?: string;
//     'retransmit count'?: string;
//     'retransmit interval steps'?: string;
//     'model identifier'?: string;
//   };
// }
//
// //### 3 Set Subscription Group cho Model
// //### 3.1 Set Subscription Group cho Model response (không thay đổi)
// export interface SubcribeParamsSet{
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'subscribe address': string;
//   'model identifier': string;
// }
// export interface ApiSubcribeSet {
//   'method': 'config_subscribe_model_add_pro';
//   'params': SubcribeParamsSet;
//   timeout: number;
// }
// export interface ApiSubcribeResponse{
//   'method': 'node_supscription_add';
//   'params': {
//     'status':  string;
//     'element address'?: string;
//     'addr'?:  string;
//     'model identifier'?:  string;
//   };
// }
//
// //### 4 Delete Subscription Group đã set cho Model
// //### 4.1 Delete Subscription Group đã set cho Model response (không thay đổi)
// export interface SubcribeDeleteParams {
//
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'subscribe address': string;
//   'model identifier': string;
// }
// export interface ApiSubcribeDeleteSe {
//   'method': 'config_subscribe_model_delete_pro';
//   'params': SubcribeDeleteParams;
//   timeout: number;
// }
// export interface ApiSubcribeDeleteResponse{
//   'method': 'node_supscription_delete';
//   'params': {
//     'status': string;
//     'element address'?: string;
//     'addr'?: string;
//     'model identifier'?: string;
//   };
// }
//
// //### 5 Delete toàn bộ địa chỉ Subscription Group đã set cho Model
// //### 5.1 Delete toàn bộ địa chỉ Subscription Group đã set cho Model response (không thay đổi)
// export interface SubcribeDeleteAllParams {
//   'key': string;
//   'unicast': string;
//   'element address': string;
//   'model identifier': string;
// }
// export interface ApiSubcribeDeleteAll {
//   'method': 'config_subscribe_model_delete_all_pro';
//   'params': SubcribeDeleteAllParams;
//   timeout: number;
// }
// export interface ApiSubcribeDeleteAllResponse {
//   'method': 'node_supscription_delete_all';
//   'params': {
//     'status': string;
//     'element address'?: string;
//     'model identifier'?: string;
//   };
// }
//
// //### 22 Set proxy pro
// //### 22.1 Hub trả lời lệnh set proxy
// //### 23 Get proxy pro
// //### 23.1 Hub trả lời lệnh get proxy
// export interface ProxyParamsSet{
//   'key': string;
//   'unicast': string;
//   'gatt proxy': string;
// }
// export interface ApiProxySet {
//   'method': 'config_gatt_proxy_set_pro';
//   'params': ProxyParamsSet;
//   timeout: number;
// }
//
// export interface ApiProxySetResponse {
//   method: 'gatt_proxy_get';
//   'params': {
//     'status': string;
//     'GATT Proxy'?: string;
//
//   };
// }
//
//
// export interface ProxyParamsGet{
//   'key': string;
//   'unicast': string;
// }
// export interface ApiProxyGet {
//   'method': 'config_gatt_proxy_get_pro';
//   'params': ProxyParamsGet;
//   timeout: number;
// }
// export interface ApiProxyGetResponse {
//   method: 'gatt_proxy_get';
//   'params': {
//     'status': string;
//     'GATT Proxy'?: string;
//
//   };
// }
