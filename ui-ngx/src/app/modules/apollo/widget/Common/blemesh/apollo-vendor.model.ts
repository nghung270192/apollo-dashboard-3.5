// import {getTid} from '@modules/apollo/widget/Common/blemesh/hub-pro-mini-blemesh-message';
//
//
//
// export interface VendorOpcode {
//   opcode: string;
//   name: string;
//   description: string;
//   [key: string]: any;
// }
// export const VendorMotionOpcodeList = {
//   delayGet: {opcode: 'C0', name: 'DELAY_GET', description: 'thêm mô tả'},
//   delaySet: {opcode: 'C1', name: 'DELAY_SET', description: 'thêm mô tả'},
//  delaySetUnacknowledgedd: {
//     opcode: 'C2',
//     name: 'DELAY_SET_UNACKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   relayStatus: {opcode: 'C3', name: 'DELAY_STATUS', description: 'thêm mô tả'},
//
//
//   hlkParamsGet: {opcode: 'F0', name: 'HLK_DISTANCE_GET', description: 'thêm mô tả'},
//   hlkParamsSet: {opcode: 'F1', name: 'HLK_DISTANCE_SET', description: 'thêm mô tả'},
//   hlkParamsSetUnacknowledgedd: {
//     opcode: 'F2',
//     name: 'HLK_DISTANCE_SET_UNACKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   hlkParamsStatus: {opcode: 'F3', name: 'HLK_DISTANCE_STATUS', description: 'thêm mô tả'},
//
//
//
// /*  hlkTimeGet: {opcode: "F4", name: "HLK_TIME_GET", description: "thêm mô tả"},
//   hlkTimeSet: {opcode: "F5", name: "HLK_TIME_SET", description: "thêm mô tả"},
//   hlkTimeSetUnacknowledgedd: {
//     opcode: "F6",
//     name: "HLK_TIME_SET_UNACKNOWLEDGED",
//     description: "thêm mô tả"
//   },
//   hlkTimeStatus: {opcode: "F7", name: "HLK_TIME_STATUS", description: "thêm mô tả"},*/
//
//
//   levelGet: {opcode: 'C4', name: 'LEVEL_GET', description: 'thêm mô tả'},
//   levelSet: {opcode: 'C5', name: 'LEVEL_SET', description: 'thêm mô tả'},
//   levelSetUnacknowledged: {
//     opcode: 'C6',
//     name: 'LEVEL_SET_UNACKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   levelStatus: {opcode: 'C7', name: 'LEVEL_STATUS', description: 'thêm mô tả'},
//
//   statusGet: {opcode: 'C8', name: 'STATUS_GET', description: 'thêm mô tả'},
//   statusStatus: {opcode: 'C9', name: 'STATUS_STATUS', description: 'thêm mô tả'},
//
//   brightnessGet: {opcode: 'CA', name: 'BRIGHTNESS_GET', description: 'thêm mô tả'},
//   brightnessSet: {opcode: 'CB', name: 'BRIGHTNESS_SET', description: 'thêm mô tả'},
//   brightnessSetUnacknowledged: {
//     opcode: 'CC',
//     name: 'BRIGHTNESS_SET_UNACKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   brightnessStatus: {
//     opcode: 'CD',
//     name: 'BRIGHTNESS_STATUS',
//     description: 'thêm mô tả'
//   },
//
//   ambientBrightnessLevelGet: {
//     opcode: 'CE',
//     name: 'AMBIENT_BRIGHTNESS_GET',
//     description: 'thêm mô tả'
//   },
//   ambientBrightnessStatus: {
//     opcode: 'CF',
//     name: 'AMBIENT_BRIGHTNESS_STATUS',
//     description: 'thêm mô tả'
//   },
//
//   dfuSet: {opcode: 'D0', name: 'DFU_SET', description: 'thêm mô tả'},
//   dfuSetUnacknowledged: {
//     opcode: 'D1',
//     name: 'DFU_SET_UNACKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   dfuStatus: {opcode: 'D2', name: 'DFU_SET_STATUS', description: 'thêm mô tả'},
//
//   blinkingSet: {opcode: 'D3', name: 'BLINKING_SET', description: 'thêm mô tả'},
//   blinkingSetUnacknowledged: {
//     opcode: 'D4',
//     name: 'BLINKING_SET_UNACKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   blinkingStatus: {
//     opcode: 'D5',
//     name: 'BLINKING_STATUS',
//     description: 'thêm mô tả'
//   },
//
//   allInfoGet: {opcode: 'D6', name: 'ALL_INFO_GET', description: 'thêm mô tả'},
//   allInfoStatus: {
//     opcode: 'D7',
//     name: 'ALL_INFO_STATUS',
//     description: 'thêm mô tả'
//   },
//
//   lightControlSet: {
//     opcode: 'EB',
//     name: 'VENDOR_MOTION_OPCODE_CONTROLER_SET',
//     description: 'thêm mô tả'
//   },
//   lightControlSetUnacknowledged: {
//     opcode: 'EC',
//     name: 'VENDOR_MOTION_OPCODE_CONTROLER_SET_UNKNOWLEDGED',
//     description: 'thêm mô tả'
//   },
//   lightControlStatus: {
//     opcode: 'ED',
//     name: 'VENDOR_MOTION_OPCODE_CONTROLER_STATUS',
//     description: 'thêm mô tả'
//   },
// };
//
// export const VendorLightOpcodeList=
//   {
//     activityGet: {opcode: 'C0', name: 'ACTIVITY_GET', description: 'thêm mô tả'},
//     activitySet: {opcode: 'C1', name: 'ACTIVITY_SET', description: 'thêm mô tả'},
//     activitySetUnacknowledged: {opcode: 'C2', name: 'ACTIVITY_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     activityStatus: {opcode: 'C3', name: 'ACTIVITY_STATUS', description: 'thêm mô tả'},
//
//     ws2812BGet: {opcode: 'C4', name: 'WS2812B_GET', description: 'thêm mô tả'},
//     ws2812BSet: {opcode: 'C5', name: 'WS2812B_SET', description: 'thêm mô tả'},
//     ws2812BSetUnacknowledged: {opcode: 'C6', name: 'WS2812B_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     ws2812BStatus: {opcode: 'C7', name: 'WS2812B_STATUS', description: 'thêm mô tả'},
//
//
//     effectGet: {opcode: 'C8', name: 'EFFECT_GET', description: 'thêm mô tả'},
//     effectSet: {opcode: 'C9', name: 'EFFECT_SET', description: 'thêm mô tả'},
//     effectSetUnacknowledged: {opcode: 'CA', name: 'EFFECT_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     effectStatus: {opcode: 'CB', name: 'EFFECT_STATUS', description: 'thêm mô tả'},
//
//
//     defaultEffectGet: {opcode: 'CC', name: 'DEFAULT_EFFECT_GET', description: 'thêm mô tả'},
//     defaultEffectSet: {opcode: 'CD', name: 'DEFAULT_EFFECT_SET', description: 'thêm mô tả'},
//     defaultEffectSetUnacknowledged: {opcode: 'CE', name: 'DEFAULT_EFFECT_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     defaultEffectStatus: {opcode: 'CF', name: 'DEFAULT_EFFECT_STATUS', description: 'thêm mô tả'},
//
//     dfuSet: {opcode: 'D0', name: 'DFU_SET', description: 'thêm mô tả'},
//     dfuSetUnacknowledged: {opcode: 'D1', name: 'DFU_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     dfuStatus: {opcode: 'D2', name: 'DFU_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//
//     testSet: {opcode: 'D3', name: 'TEST_SET', description: 'thêm mô tả'},
//     testSetUnacknowledged: {opcode: 'D4', name: 'TEST_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     testStatus: {opcode: 'D5', name: 'TEST_STATUS', description: 'thêm mô tả'},
//
//     powerControlGet: {opcode: 'D6', name: 'POWER_CONTROL_GET', description: 'thêm mô tả'},
//     powerControlSet: {opcode: 'D7', name: 'POWER_CONTROL_SET', description: 'thêm mô tả'},
//     powerControlSetUnacknowledged: {opcode: 'D8', name: 'POWER_CONTROL_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     powerControlStatus: {opcode: 'D9', name: 'POWER_CONTROL_STATUS', description: 'thêm mô tả'},
//
//     ws281bNumLedGet: {opcode: 'DA', name: 'WS2812B_NUMLED_GET', description: 'thêm mô tả'},
//     ws281bNumLedSet: {opcode: 'DB', name: 'WS2812B_NUMLED_SET', description: 'thêm mô tả'},
//     ws281bNumLedSetUnacknowledged: {opcode: 'DC', name: 'WS2812B_NUMLED_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     ws281bNumLedStatus: {opcode: 'DD', name: 'WS2812B_NUMLED_STATUS', description: 'thêm mô tả'},
//
//     hslGet: {opcode: 'DE', name: 'HSL_GET', description: 'thêm mô tả'},
//     hslSet: {opcode: 'DF', name: 'HSL_SET', description: 'thêm mô tả'},
//     hslSetUnacknowledged: {opcode: 'E0', name: 'HSL_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     hslStatus: {opcode: 'E1', name: 'HSL_STATUS', description: 'thêm mô tả'},
//
//     saturationGet: {opcode: 'E2', name: 'SATURATION_GET', description: 'thêm mô tả'},
//     saturationSet: {opcode: 'E3', name: 'SATURATION_SET', description: 'thêm mô tả'},
//     saturationSetUnacknowledged: {opcode: 'E4', name: 'SATURATION_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     saturationStatus: {opcode: 'E5', name: 'SATURATION_STATUS', description: 'thêm mô tả'},
//
//     ctlGet: {opcode: 'E6', name: 'CTL_GET', description: 'thêm mô tả'},
//     ctlSet: {opcode: 'E7', name: 'CTL_SET', description: 'thêm mô tả'},
//     ctlSetUnacknowledged: {opcode: 'E8', name: 'CTL_SET_UNACKNOWLEDGED', description: 'thêm mô tả'},
//     ctlStatus: {opcode: 'E9', name: 'CTL_STATUS', description: 'thêm mô tả'},
//
//
//     lightControlGet: {opcode: 'EA', name: 'VENDOR_LIGHT_OPCODE_LC_GET', description: 'thêm mô tả'},
//     lightControlSet: {opcode: 'EB', name: 'VENDOR_LIGHT_OPCODE_LC_SET', description: 'thêm mô tả'},
//     lightControlSetUnacknowledged: {
//       opcode: 'EC',
//       name: 'VENDOR_LIGHT_OPCODE_LC_SET_UNACKNOWLEDGED',
//       description: 'thêm mô tả'
//     },
//     lightControlStatus: {opcode: 'ED', name: 'VENDOR_LIGHT_OPCODE_LC_STATUS', description: 'thêm mô tả'},
//     temperatureGet: {opcode: 'EE', name: 'VENDOR_SERVER_OPCODE_TEMPTURATE_RANGE_GET', description: 'thêm mô tả'},
//     temperatureStatus: {opcode: 'EF', name: 'VENDOR_SERVER_OPCODE_TEMPTURATE_RANGE_STATUS', description: 'thêm mô tả'},
//   };
//
// export enum VendorGaraderOpcode {
//
// }
//
// export interface HlkSensor {
//   hlkDistance: number;
//   hlkTime: number;
// }
// export interface MotionSensor {
//
//   delay: number;
//   levelLow: number;
//   levelHigh: number;
//   status: number;
//   ambientBrightness: number;
//   brightness: number;
// }
//
// export interface RadarSensorI {
//   motionSensor: MotionSensor;
//   hlkSensor: HlkSensor;
//
// }
//
// export const radarSensorDefault: RadarSensorI = {
//   motionSensor: {
//     status: -1,
//     levelLow: -1,
//     levelHigh: -1,
//     delay: -1,
//     brightness: -1,
//     ambientBrightness: -1
//   },
//   hlkSensor: {
//     hlkDistance: -1,
//     hlkTime: -1
//   }
// };
//
// export interface VendorData {
//   opcode: string;
//   message: string;
// }
//
// export interface LightControlAutoParams{
//   delay: number;
//   levelLow: number;
//   levelHigh: number;
//
// }
// /*
//
// export class RadarSensorClass {
//   public allInfo:RadarSensorI;
//   constructor(private message:string) {
//     this.message = message;
//
//     if (message.length == 22) {
//       let status = message.slice(0, 2);
//       let delay = swap2BytesToString(Number("0x" + message.slice(2, 6)));
//       let lowLightness = swap2BytesToString(Number("0x" + message.slice(6, 10)));
//       let highLightness = swap2BytesToString(Number("0x" + message.slice(10, 14)));
//       let ambientBrightness = swap2BytesToString(Number("0x" + message.slice(14, 18)));
//       let brightness = swap2BytesToString(Number("0x" + message.slice(18, 22)));
//
//       this.allInfo = {
//         motionSensor: {
//           status: parseInt(status, 16),
//           delay: parseInt(delay, 16) / 10,
//           levelLow: Math.round(parseInt(lowLightness, 16) * 100 / 65535),
//           levelHigh: Math.round(parseInt(highLightness, 16) * 100 / 65535),
//           ambientBrightness: parseInt(ambientBrightness, 16),
//           brightness: parseInt(brightness, 16)
//         }
//       }
//     }
//   }
//
//   delay():number{
//     return this.allInfo.motionSensor.delay;
//   }
//   levelLow():number{
//     return this.allInfo.motionSensor.levelLow;
//   }
//   levelHigh():number{
//     return this.allInfo.motionSensor.levelHigh;
//   }
//   brightness():number{
//     return this.allInfo.motionSensor.brightness;
//   }
//   ambientBrightness():number{
//     return this.allInfo.motionSensor.ambientBrightness;
//   }
//
// }
// */
//
//
// export  function swap2BytesToString(number): string{
//   return ((number & 0xFF).toString(16).padStart(2, '0') + ((number >> 8) & 0xFF)  .toString(16).padStart(2, '0')).toUpperCase();
// }
//
// /*
// export function getTID() {
//   return getHexStr(2);
// }
//
// export function getHexStr(len):string{
//   let output = '';
//     for (let i = 0; i < len; ++i) {
//     output += (Math.round(Math.random() * 15))  .toString(16);
//   }
//   return output.toUpperCase();
// }
// */
