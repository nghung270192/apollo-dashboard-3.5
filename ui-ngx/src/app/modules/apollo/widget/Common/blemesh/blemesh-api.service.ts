// import {Inject, Injectable} from '@angular/core';
// import {DeviceService} from '@core/http/device.service';
// import {RequestConfig} from '@core/http/http-utils';
// import {Observable} from 'rxjs';
// import {
//   ApiAppVendorDataSet
// } from '@modules/apollo/widget/Common/blemesh/blemesh.model';
// import {
//   AppKeySigModelParamsGet, AppKeyVendorModelParamsGet,
//   BindKeyParamGet, ProxyParamsGet, ProxyParamsSet,
//   PublicationParamsGet,
//   PublicationParamsSet,
//   SubcribeDeleteAllParams,
//   SubcribeParamsSet, UnBindkeyModelParams, UnBindKeyParamSet
// } from '@modules/apollo/widget/Common/blemesh/model/network.model';
//
// import {BlemeshOnOff} from '@modules/apollo/widget/Common/blemesh/model/onoff.model';
// import {Datasource} from '@shared/models/widget.models';
// import {BlemeshLightness} from '@modules/apollo/widget/Common/blemesh/model/lightness.model';
// import {BleMeshMessage, getTid} from '@modules/apollo/widget/Common/blemesh/hub-pro-mini-blemesh-message';
// import {
//   LightControlAutoParams,
//   RadarSensorI, swap2BytesToString,
//   VendorLightOpcodeList,
//   VendorMotionOpcodeList
// } from '@modules/apollo/widget/Common/blemesh/apollo-vendor.model';
// // import {DeviceState} from '@modules/apollo/widget/Common/data-raw.model';
// import {SceneService} from '@modules/apollo/widget/Common/blemesh/scene.service';
// import {
//   BindkeyModelParams,
//
//   BindKeyParamSet,
//   RelayParamsGet,
//   RelayParamSet,
//   NetworkTransmitParamGet,
//   NetworkTransmitParamSet,
// } from '@modules/apollo/widget/Common/blemesh/model/network.model';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ApolloRpcServive {
//   deviceId: string;
//
//   requestConfig: RequestConfig = {
//     ignoreLoading: false,
//     ignoreErrors: true,
//     resendRequest: false
//   };
//
//   constructor(@Inject('DeviceID') deviceId: string, public deviceService: DeviceService) {
//     this.deviceService = deviceService;
//     this.deviceId = deviceId;
//   }
//
//   send(requestBody: any): Observable<any> {
//     console.log(requestBody, this.deviceId);
//     return this.deviceService.sendTwoWayRpcCommand(this.deviceId, requestBody, this.requestConfig);
//   }
// }
//
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class MotionSensorService extends ApolloRpcServive {
//   deviceId: string;
//   requestConfig: RequestConfig = {
//     ignoreLoading: false,
//     ignoreErrors: true,
//     resendRequest: false
//   };
//
//
//   constructor(@Inject('DeviceID') deviceId: string, public deviceService: DeviceService) {
//     super(deviceId, deviceService);
//     this.deviceService = deviceService;
//     this.deviceId = deviceId;
//   }
//
//   delaySet(address: string, companyId: string, motionData: RadarSensorI): Observable<any> {
//
//     const requestBody: ApiAppVendorDataSet = {
//       method: 'app_vendor_data_pro',
//       params: {
//         'company id': companyId,
//         address,
//         opcode: VendorMotionOpcodeList.delaySet.opcode,
//         message: getTid() + swap2BytesToString(motionData.motionSensor.delay * 10)
//       }
//     };
//     return this.send(requestBody);
//   }
//
//
//   levelSet(address: string, companyId: string, motionData: RadarSensorI): Observable<any> {
//
//     const levelLow = Math.floor(motionData.motionSensor.levelLow * 65535 / 100);
//     const levelHigh = Math.floor(motionData.motionSensor.levelHigh * 65535 / 100);
//
//     const requestBody: ApiAppVendorDataSet = {
//       method: 'app_vendor_data_pro',
//       params: {
//         'company id': companyId,
//         address,
//         opcode: VendorMotionOpcodeList.levelSet.opcode,
//         message: getTid() + swap2BytesToString(levelLow) + swap2BytesToString(levelHigh)
//       }
//     };
//     return this.send(requestBody);
//   }
//
//
//   brightnessSet(address: string, companyId: string, motionData: RadarSensorI): Observable<any> {
//     const requestBody: ApiAppVendorDataSet = {
//       method: 'app_vendor_data_pro',
//       params: {
//         'company id': companyId,
//         address,
//         opcode: VendorMotionOpcodeList.brightnessSet.opcode,
//         message: getTid() + swap2BytesToString(motionData.motionSensor.brightness)
//       }
//     };
//     return this.send(requestBody);
//   }
//
//
//   allInfoGet(address: string, companyId: string): Observable<any> {
//
//     const requestBody: ApiAppVendorDataSet = {
//       method: 'app_vendor_data_pro',
//       params: {
//         'company id': companyId,
//         address,
//         opcode: VendorMotionOpcodeList.allInfoGet.opcode,
//         message: ''
//       }
//     };
//     return this.send(requestBody);
//   }
//
//   /*hlkDistanceGet(address:string, companyId:string):Observable<any>{
//
//     let requestBody:ApiAppVendorDataSet = {
//       method:"app_vendor_data_pro",
//       params:{
//         "company id":companyId,
//         address:address,
//         opcode: VendorMotionOpcodeList.hlkDistanceGet.opcode,
//         message: ""
//       }
//     }
//     return this.send(requestBody);
//   }
//
//   hlkDistanceSet(address:string, companyId:string, motionData:RadarSensorI):Observable<any>{
//     let requestBody:ApiAppVendorDataSet = {
//       method:"app_vendor_data_pro",
//       params:{
//         "company id":companyId,
//         address:address,
//         opcode: VendorMotionOpcodeList.hlkDistanceSet.opcode,
//         message: getTid() +motionData?.hlkSensor?.hlkDistance.toString(16).padStart(2, "0")
//       }
//     }
//     return this.send(requestBody);
//   }
//
//
//   hlkTimeGet(address:string, companyId:string):Observable<any>{
//
//     let requestBody:ApiAppVendorDataSet = {
//       method:"app_vendor_data_pro",
//       params:{
//         "company id":companyId,
//         address:address,
//         opcode: VendorMotionOpcodeList.hlkTimeGet.opcode,
//         message: ""
//       }
//     }
//     return this.send(requestBody);
//   }
//
//   hlkTimeSet(address:string, companyId:string, motionData:RadarSensorI):Observable<any>{
//     let requestBody:ApiAppVendorDataSet = {
//       method:"app_vendor_data_pro",
//       params:{
//         "company id":companyId,
//         address:address,
//         opcode: VendorMotionOpcodeList.hlkTimeSet.opcode,
//         message: getTid() + swap2BytesToString(motionData?.hlkSensor?.hlkTime)
//       }
//     }
//     return this.send(requestBody);
//   }*/
// }
//
// export class LightControl extends ApolloRpcServive {
//   deviceId: string;
//
//   constructor(@Inject('DeviceID') deviceId: string, public deviceService: DeviceService) {
//     super(deviceId, deviceService);
//     this.deviceService = deviceService;
//     this.deviceId = deviceId;
//   }
//
//   lightControlSet(address: string, companyId: string, data: LightControlAutoParams): Observable<any> {
//     const requestBody: ApiAppVendorDataSet = {
//       method: 'app_vendor_data_pro',
//       params: {
//         'company id': companyId,
//         address,
//         opcode: VendorLightOpcodeList.lightControlSet.opcode,
//         message: getTid() + swap2BytesToString(data.levelHigh) + swap2BytesToString(data.levelLow) + swap2BytesToString(data.delay)
//       }
//     };
//     return this.send(requestBody);
//   }
//
// }
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BlemeshApiService extends ApolloRpcServive {
//
//   motionSensorService: MotionSensorService;
//   lightVendor: LightControl;
//
//   public Timeout = 5000;
//   public blemeshCreateMessage: BleMeshMessage = new BleMeshMessage();
//   public sceneService: SceneService;
//   requestConfig: RequestConfig = {
//     ignoreLoading: false,
//     ignoreErrors: true,
//     resendRequest: false
//   };
//   deviceId = '';
//
//   constructor(@Inject('DeviceID') deviceId: string, public deviceService: DeviceService) {
//     super(deviceId, deviceService);
//     this.deviceId = deviceId;
//     this.deviceService = deviceService;
//     this.motionSensorService = new MotionSensorService(deviceId, deviceService);
//     this.lightVendor = new LightControl(deviceId, deviceService);
//     this.sceneService = new SceneService(deviceId, deviceService);
//   }
//
//   onOffSet(params: BlemeshOnOff): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.onOffSet(params, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   turnOn(address: string): Observable<any> {
//     const data: BlemeshOnOff = {value: DeviceState.on, address};
//     return this.onOffSet(data);
//   }
//
//   turnOff(address: string): Observable<any> {
//     const data: BlemeshOnOff = {value: DeviceState.off, address};
//     return this.onOffSet(data);
//   }
//
//   onOffGet(params: BlemeshOnOff): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.onOffGet(params, this.Timeout);
//     return this.send(requestBody);
//   }
//
//
//   lightnessSet(params: BlemeshLightness): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.lightnessSet(params, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   lightnessGet(params: BlemeshLightness): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.lightnessGet(params, this.Timeout);
//     return this.deviceService.sendTwoWayRpcCommand(this.deviceId, requestBody, this.requestConfig);
//   }
//
//   setLightness(address: string, lightness: number): Observable<any> {
//     const params: BlemeshLightness = {
//       value: lightness,
//       address
//     };
//     return this.lightnessSet(params);
//
//   }
//
//   relayGet(data: RelayParamsGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.relayGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   relaySet(data: RelayParamSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.relaySet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   proxyGet(data: ProxyParamsGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.proxyGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   proxySet(data: ProxyParamsSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.proxySet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   keysSet(data: BindKeyParamSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.keysSet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   keysGet(data: BindKeyParamGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.keysGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   keysRemove(data: UnBindKeyParamSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.keysRemove(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   networkTransmitGet(data: NetworkTransmitParamGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.networkTransmitGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   networkTransmitSet(data: NetworkTransmitParamSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.networkTransmitSet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   subscribeSet(data: SubcribeParamsSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.subscribeSet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   subscribeClearAll(data: SubcribeDeleteAllParams): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.subscribeClearAll(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   publishSet(data: PublicationParamsSet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.publicationSet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   publishGet(data: PublicationParamsGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.publicationGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   appKeySigModelGet(data: AppKeySigModelParamsGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.appKeySigModelGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   appKeyVendorModelGet(data: AppKeyVendorModelParamsGet): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.appKeyVendorModelGet(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   appKeyModelDelete(data: UnBindkeyModelParams): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.appKeyModelDelete(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   bindKeyModelSet(data: BindkeyModelParams): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.bindKeyModel(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
//   sceneCall(data: BindkeyModelParams): Observable<any> {
//     const requestBody = this.blemeshCreateMessage.sceneCall(data, this.Timeout);
//     return this.send(requestBody);
//   }
//
// }
//
//
