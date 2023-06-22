// /*
// export interface ParamsBody    {
//
// }
// */
//
// /*export interface RequestBody    {
//   method: string,   params: any,  timeout: number
// }*/
//
//
// export interface BlemeshApiRequestBodyI {
//   method: string;
//   params: any;
//   timeout: number;
// }
//
// /*
// export class BlemeshApiRequestBodyI{
//   constructor( private method: string,private params: any,private timeout: number){
//     this.method = method;
//     this.params = params;
//     this.timeout = timeout;
//   }
//
// }
// */
//
//
// export enum PeriodResolution {
//   RESOLUTION_100_MS = 100,
//   RESOLUTION_1_S = 1000,
//   RESOLUTION_10_S = 10000,
//   RESOLUTION_10_M = 1000 * 60 * 10
// }
//
// export enum PeriodStep {
//   'P00' = '00', 'P01' = '01', 'P10' = '10', 'P11' = '11'
// }
//
//
// export class MeshOpcode {
//   constructor(public get?: string, public set?: string, public setUnacknowledged?: string, public status?: string) {
//     this.get = get;
//     this.set = set;
//     this.setUnacknowledged = setUnacknowledged;
//     this.status = status;
//   }
// }
//
// export const SigmeshModel = {
//   genericOnOffServer: new MeshOpcode('8201', '8202', '8203', '8204'),
//   genericLevelServer: {
//     level: new MeshOpcode('8205', '8206', '8207', '8208'),
//     delta: new MeshOpcode('8205', '8209', '820A', '8208'),
//     move: new MeshOpcode('8205', '820B', '820C', '8208'),
//   },
//   genericDefaultTransistionTimeServer: new MeshOpcode('820D', '820E', '820F', '8010'),
//   sceneServer: {
//     get: '8241',
//     recall: '8242',
//     recallUnacknowledged: '8243',
//     status: '5E',
//     registerGet: '8244',
//     registerStatus: '8245',
//   },
//   sceneSetupServer: {
//     store: '8246',
//     storeUnacknowledged: '8247',
//     delete: '829E',
//     deleteUnacknowledged: '829F'
//   },
//   lightnessServer: {
//     lightness: new MeshOpcode('824B', '824C', '824D', '824E'),
//     linear: new MeshOpcode('824F', '8250', '8251', '8252'),
//     Last: new MeshOpcode('8253', '', '', '8254'),
//     default: new MeshOpcode('8255', '', '', '8256'),
//     range: new MeshOpcode('8257', '', '', '8258'),
//   },
//   lightnessSetupServer: {
//     default: new MeshOpcode('8259', '', '', '825A'),
//     range: new MeshOpcode('825B', '', '', '825C'),
//   },
//   lightCtlServer: {
//     ctl: new MeshOpcode('825D', '825E', '825F', '8260'),
//     temperature: new MeshOpcode('8261', '8264', '8265', '8266'),
//     temperatureRange: new MeshOpcode('8262', '', '', '8263'),
//     default: new MeshOpcode('8267', '', '', '8268'),
//   },
//   lightCtlSetupServer: {
//     default: new MeshOpcode('8269', '', '', '826A'),
//     temperatureRange: new MeshOpcode('826B', '', '', '826C'),
//   },
//   lightHslServer: {
//     hsl: new MeshOpcode('826D', '8276', '8277', '8278'),
//     hue: new MeshOpcode('826E', '826F', '8270', '8271'),
//     saturation: new MeshOpcode('8272', '8273', '8274', '8275'),
//     target: new MeshOpcode('8279', '', '', '827A'),
//     range: new MeshOpcode('827B', '', '', '827C'),
//     default: new MeshOpcode('827D', '', '', '827E'),
//   },
//   lightHslSetupServer: {
//     default: new MeshOpcode('827F', '', '', '8280'),
//     range: new MeshOpcode('8281', '', '', '8282'),
//   },
// };
//
//
// interface ApiMethod {
//   method: string;
// }
//
// interface ApiStatus {
//   'params': any;
// }
//
// interface ApiParams {
//   'params': any;
// }
//
// interface ApiTimeOut {
//   timeout: number;
// }
//
// interface ApiHubProMessage extends ApiMethod, ApiTimeOut, ApiParams {
//
// }
//
// export interface HubMeshClear extends ApiMethod, ApiTimeOut, ApiParams {
// }
//
// export interface HubMeshClearRes extends ApiMethod {
//   params: {
//     status: string;
//   };
// }
//
// export type HubReboot = ApiMethod;
//
// export interface HubRebootRes extends ApiMethod {
//   params: {
//     'status': string;
//     'status keypair': string;
//   };
// }
//
//
// export interface HubCleanNetwork extends ApiMethod, ApiParams, ApiTimeOut {
// }
//
// export interface HubCleanNetworkRes extends ApiMethod {
//   'params': {
//     status: string;
//   };
// }
//
//
// export interface HubAddSubscriptionAddress extends ApiMethod {
//   params: {
//     address: string;
//   };
// }
//
// export interface HubAddSubscriptionListRes extends ApiMethod, ApiStatus {
// }
//
// export interface AddrSubscriptionAddParam {
//   address: string;
// }
//
// export interface AddrSubscriptionAddResponse extends AddrSubscriptionAddParam, ApiStatus {
// }
//
//
// export interface ApiFirmwareUpdate {
//   'method': 'esp_update';
//   'params': {
//     status: string;
//   };
// }
//
//
// export interface ApiAppDataSet {
//   'method': 'app_data_pro';
//   'params': {
//     'address': string;
//     'opcode': string;
//     'message': string;
//   };
// }
//
// export interface ApiAppDataSetResponse {
//   'method': 'app_data_pro';
//   'params': {
//     'status': string;
//     'address'?: string;
//     'opcode'?: string;
//     'message'?: string;
//   };
// }
//
// export interface ApiAppDataSetAutoResponse {
//   'method': 'app_data';
//   'params': {
//     'messages': [
//       {
//         'a'?: string;
//         'o'?: string;
//         'p'?: string;
//         [key: string]: any;
//       }
//     ];
//   };
// }
//
//
// export interface ApiAppVendorDataSet {
//   'method': 'app_vendor_data_pro';
//   'params': {
//     'opcode': string;
//     'address': string;
//     'company id': string;
//     'message': string;
//   };
// }
//
// export interface ApiAppVendorDataResponse {
//   'method': 'app_vendor_data_pro';
//   'params': {
//     'status': string;
//     'address'?: string;
//     'opcode'?: string;
//     'company id'?: string;
//     'message'?: string;
//   };
// }
//
// export interface ApiAppVendorDataSetAutoResponse {
//   'method': 'app_vendor_data';
//   'params': {
//     'messages': [
//       {
//         'a'?: string;
//         'c'?: string;
//         'o'?: string;
//         'p'?: string;
//         [key: string]: any;
//       }
//     ];
//   };
// }
//
//
//
//
