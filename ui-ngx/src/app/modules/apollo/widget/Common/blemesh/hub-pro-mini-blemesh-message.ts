// import {BlemeshOnOff} from '@modules/apollo/widget/Common/blemesh/model/onoff.model';
// import {DeviceState} from '@modules/apollo/widget/share/models/ble-sigmesh/product-id-model';
// import {BlemeshLightness} from '@modules/apollo/widget/Common/blemesh/model/lightness.model';
// import {
//   ApiAppKeySigModelParamsGet, ApiAppKeyVendorModelParamsGet,
//   ApiGetBindKeySet,
//   ApiProxyGet,
//   ApiProxySet,
//   ApiPublicationGet,
//   ApiPublicationSet,
//   ApiSubcribeDeleteAll,
//   ApiSubcribeSet, ApiUnBindkeyModelSet,
//   ApiUnBindKeyParamSet,
//   AppKeySigModelParamsGet, AppKeyVendorModelParamsGet,
//   BindKeyParamGet,
//   ProxyParamsGet,
//   ProxyParamsSet,
//   PublicationParamsGet,
//   PublicationParamsSet,
//   SubcribeDeleteAllParams,
//   SubcribeParamsSet, UnBindkeyModelParams,
//   UnBindKeyParamSet
// } from '@modules/apollo/widget/Common/blemesh/model/network.model';
//
// import {BlemeshApiRequestBodyI,  SigmeshModel} from '@modules/apollo/widget/Common/blemesh/blemesh.model';
//
// import {
//   BindKeyParamSet, ApiBindKeySet, ApiNetworkTransmitGet, ApiNetworkTransmitSet, NetworkTransmitParamGet, NetworkTransmitParamSet
//   ,ApiRelayGet,
//   RelayParamsGet,
//   RelayParamSet, ApiRelaySet,
// } from '@modules/apollo/widget/Common/blemesh/model/network.model';
//
//
// import {ApiBindkeyModelSet, BindkeyModelParams} from '@modules/apollo/widget/Common/blemesh/model/network.model';
//
//
// export function getHexString(len: number): string {
//   let output = '';
//   for (let i = 0; i < len; ++i) {
//     output += (Math.round(Math.random() * 15))  .toString(16);
//   }
//   return output.toUpperCase();
// }
//
// export function getHex(len: number): number {
//   let output = '';
//   for (let i = 0; i < len; ++i) {
//     output += (Math.round(Math.random() * 15))  .toString(16);
//   }
//   return Number('0x' + output);
// }
//
// export function getTid(): string {
//   return getHexString(2);
// }
//
// export function booleanToString(value: boolean): string {
//   return (value)?'01':'00';
// }
//
// export class BleMeshMessage {
//
//   public onOffSet(data: BlemeshOnOff, timeout: number): BlemeshApiRequestBodyI {
//     const message: BlemeshApiRequestBodyI = {
//       method:'app_data_pro',
//       params:{
//         address:data.address,
//         opcode:SigmeshModel.genericOnOffServer.set,
//         message:  ((data.value==DeviceState.on)?'01':'00')+ getTid()
//       },
//       timeout
//     };
//     return message;
//   }
//   public onOffGet(data: BlemeshOnOff, timeout: number): BlemeshApiRequestBodyI {
//     const message: BlemeshApiRequestBodyI = {
//       method:'app_data_pro',
//       params:{
//         address:data.address,
//         opcode:SigmeshModel.genericOnOffServer.get,
//         message:''
//       },
//       timeout
//     };
//     return message;
//   }
//
//   public lightnessSet(data: BlemeshLightness, timeout: number): BlemeshApiRequestBodyI {
//     const low = (Math.floor(data.value * 65535/100))  & 0xFF;
//     const hight = ((Math.floor(data.value * 65535/100))  >> 8) & 0xFF;
//     const message = low.toString(16).padStart(2, '0') + hight.toString(16).padStart(2, '0') + getTid();
//
//     const requestBody: BlemeshApiRequestBodyI = {
//       method:'app_data_pro',
//       params:{
//         address:data.address,
//         opcode:SigmeshModel.lightnessServer.lightness.set,
//         message
//       },
//       timeout
//     };
//     return requestBody;
//   }
//
//   public lightnessGet(data: BlemeshLightness, timeout: number): BlemeshApiRequestBodyI {
//     const message: BlemeshApiRequestBodyI = {
//       method:'app_data_pro',
//       params:{
//         address:data.address,
//         opcode:SigmeshModel.lightnessServer.lightness.get,
//         message:''
//       },
//       timeout
//     };
//     return message;
//   }
//
//   public relaySet(data: RelayParamSet, timeout: number): any {
//     const message: ApiRelaySet = {
//       method:'config_relay_set_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public relayGet(data: RelayParamsGet, timeout: number): any {
//     const message: ApiRelayGet = {
//       method:'config_relay_get_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public keysSet(data: BindKeyParamSet, timeout: number): any {
//     const message: ApiBindKeySet = {
//       method:'appkey_bind_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public proxyGet(data: ProxyParamsGet, timeout: number): any {
//     const message: ApiProxyGet = {
//       method:'config_gatt_proxy_get_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public proxySet(data: ProxyParamsSet, timeout: number): any {
//     const message: ApiProxySet = {
//       method:'config_gatt_proxy_set_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public keysGet(data: BindKeyParamGet, timeout: number): any {
//     const message: ApiGetBindKeySet = {
//       method:'appkey_get_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public appKeySigModelGet(data: AppKeySigModelParamsGet, timeout: number): any {
//     const message: ApiAppKeySigModelParamsGet = {
//       method:'get_appkey_sig_model_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public appKeyVendorModelGet(data: AppKeyVendorModelParamsGet, timeout: number): any {
//     const message: ApiAppKeyVendorModelParamsGet = {
//       method:'get_appkey_vendor_model_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//   public appKeyModelDelete(data: UnBindkeyModelParams, timeout: number): any {
//     const message: ApiUnBindkeyModelSet = {
//       method:'unbind_appkey_model_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//   public keysRemove(data: UnBindKeyParamSet, timeout: number): any {
//     const message: ApiUnBindKeyParamSet = {
//       method:'appkey_unbind_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public networkTransmitSet(data: NetworkTransmitParamSet, timeout: number): any {
//     const message: ApiNetworkTransmitSet = {
//       method:'config_network_transmit_set_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//   public networkTransmitGet(data: NetworkTransmitParamGet, timeout: number): any {
//     const message: ApiNetworkTransmitGet = {
//       method:'config_network_transmit_get_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public subscribeSet(data: SubcribeParamsSet, timeout: number): any {
//     const message: ApiSubcribeSet = {
//       method:'config_subscribe_model_add_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public subscribeClearAll(data: SubcribeDeleteAllParams, timeout: number): any {
//     const message: ApiSubcribeDeleteAll = {
//       method:'config_subscribe_model_delete_all_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public publicationSet(data: PublicationParamsSet, timeout: number): any {
//     const message: ApiPublicationSet = {
//       method:'config_publication_add_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public publicationGet(data: PublicationParamsGet, timeout: number): any {
//     const message: ApiPublicationGet = {
//       method:'config_publication_get_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public bindKeyModel(data: BindkeyModelParams, timeout: number): any {
//     const message: ApiBindkeyModelSet = {
//       method:'bind_appkey_model_pro',
//       params:data,
//       timeout
//     };
//     return message;
//   }
//
//   public sceneCall(data: any, timeout: number): any {
//     const low = (Math.floor(data.scene))  & 0xFF;
//     const hight = ((Math.floor(data.scene))  >> 8) & 0xFF;
//     const message: BlemeshApiRequestBodyI = {
//       method:'app_data_pro',
//       params:{
//         address:data.address,
//         opcode:SigmeshModel.sceneServer.recall,
//         message:low.toString(16).padStart(2, '0') + hight.toString(16).padStart(2, '0') + getTid()
//       },
//       timeout
//     };
//     return message;
//   }
// }
