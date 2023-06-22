// import {Inject, Injectable} from '@angular/core';
// import {Datasource} from '@shared/models/widget.models';
// import {DeviceService} from '@core/http/device.service';
// import {ApolloRpcServive} from '@modules/apollo/widget/Common/blemesh/blemesh-api.service';
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SceneService {
//
//   constructor(@Inject('DeviceID') private deviceId: string, public deviceService: DeviceService) {
//     this.deviceId=deviceId;
//     this.deviceService=deviceService;
//   }
//
//   call(unicast: string, scenes: number) {
//     /*    var data = {
//           "method": "app_data_pro",
//           "params": {
//             "address": unicast,
//             "opcode": "829E",
//             "message": util.swap2BytesToString(scenes)
//           }
//       }
//
//       delete(unicast:string, scenes:number){
//
//       }*/
//   }
//
// }
// /*
// delete:(unicast, scenes)=>{
//   var data = {
//     "method": "app_data_pro",
//     "params": {
//       "address": unicast,
//       "opcode": "829E",
//       "message": util.swap2BytesToString(scenes)
//     }
//   }
//   hubApi.send(data.method, data.params);
// },
//   call:(unicast,scenes)=>{
//   var data = {
//     "method": "app_data_pro",
//     "params": {
//       "address": unicast,
//       "opcode": "8242",
//       "message": util.swap2BytesToString(scenes) + util.getHexStr(2)
//     }
//   }
//   hubApi.send(data.method, data.params);
//
// }
// */
