import {
  Connection,
  createConnection,
  createLongLivedTokenAuth,
  getStates,
  HassEntity,
  subscribeServices
} from 'home-assistant-js-websocket';
import {Observable} from 'rxjs';
import {ModelIcon} from '@modules/apollo/widget/smart-dashboard-v2/models/apollo-entity.model';
import {EntityIcon} from '@modules/apollo/widget/share/models/entity-icon';

export enum IotPlatform {
  Unknown = '',
  Wifi = '01',
  Zigbee = '02',
  BletoothMesh = '03'
}

export enum DomainType {
  light = 'light',
  inputNumber = 'input_number',
  binarySensor = 'binary_sensor',
  mediaPlayer = 'media_player',
  inputBoolean = 'input_boolean',
  automation = 'automation',
  sensor = 'sensor',
  climate = 'climate',
  group = 'group',
  script = 'script',
  cover = 'cover',
  presistentNotificaction = 'persistent_notification',
  dqsmart = 'dqsmart',
  unknown = 'unknown'
}

export enum HassDomainSupported {
  light = 'light',
  // inputNumber = "input_number",
  // binarySensor = "binary_sensor",
  // mediaPlayer = "media_player",
  // inputBoolean = "input_boolean",
  // automation = "automation",
  // sensor = "sensor",
  climate = 'climate',
  // group = "group",
  script = 'script',
  cover = 'cover',
  // presistentNotificaction = "persistent_notification",
  // dqsmart = "dqsmart",
  // unknown = "unknown"
}

export enum HassDomain {
  light = 'light',
  inputNumber = 'input_number',
  binarySensor = 'binary_sensor',
  mediaPlayer = 'media_player',
  inputBoolean = 'input_boolean',
  automation = 'automation',
  sensor = 'sensor',
  climate = 'climate',
  group = 'group',
  script = 'script',
  cover = 'cover',
  presistentNotificaction = 'persistent_notification',
  dqsmart = 'dqsmart',
  unknown = 'unknown'
}

export const HassDomainMappingLable: Record<HassDomain, string> = {
  unknown: 'Unknown domain',
  light: 'Đèn',
  input_number: 'Công tắt cảm ứng',
  binary_sensor: 'Cảm biến',
  media_player: 'Đa phương tiện',
  input_boolean: 'Công tắt cảm ứng',
  automation: 'Thông minh',
  sensor: 'Cảm biến',
  group: 'Nhóm',
  cover: 'Rèm cửa',
  climate: 'Máy Lạnh',
  script: 'Ngữ cảnh',
  persistent_notification: 'Thông báo',
  dqsmart: 'Thiết bị DQSMART'
};

export const DomainName = {
  light: 'Đèn',
  input_number: 'Công tắt cảm ứng',
  binary_sensor: 'Cảm biến',
  media_player: 'Đa phương tiện',
  input_boolean: 'Công tắt cảm ứng',
  automation: 'Thông minh',
  sensor: 'Cảm biến',
  group: 'Nhóm',
  cover: 'Rèm cửa',
  climate: 'Máy Lạnh',
  script: 'Ngữ cảnh',
  persistent_notification: 'Thông báo',
  dqsmart: 'Thiết bị DQSMART',
};

export enum IotDeviceType {
  unknown = 'unknown',
  onOff = 'onOff',
  dimming = 'dimming',
  cct = 'cct',
  rgbw = 'rgbw',
  rgbCct = 'rgbCct',
  cover = 'cover',
  dqsmartMediaPlayer = 'dqsmartMediaPlayer',
  socket = 'socket',
  lock = 'lock',
  doorBinarySensor = 'doorBinarySensor',
  moistureBinarySensor = 'moistureBinarySensor',
  smokeBinarySensor = 'smokeBinarySensor',
  motionBinarySensor = 'motionBinarySensor',
  gasBinarySensor = 'gasBinarySensor',
  buttonBinarySensor = 'buttonBinarySensor',
  vibrationSensor = 'vibrationSensor',
  temperatureSensor = 'temperatureSensor',
  illuminanceSensor = 'illuminanceSensor',
  aqiSensor = 'aqiSensor',
  humiditySensor = 'humiditySensor',
  siren = 'siren',
  all_lights = 'all_lights',
  all_scripts = 'all_scripts',
  all_automations = 'all_automations',
  script = 'script',
  dqsmartClimate = 'dqsmartClimate',
  binarySensor = 'binarySensor',
  sensor = 'sensor',
}

export interface IotModel {
  name: string;
  domain: string;
  devices: Array<string>;
}

export enum EventType {
  subscribe_events,//: number;
  subscribe_trigger,//: number;
  unsubscribe_events,//: number;
  fire_event,//: number;
  call_service,//: number;
  get_states,//: number;
  get_config,//: number;
  get_services,//: number;
  get_panels,//: number;
  camera_thumbnail,//: number;
  media_player_thumbnail,//: number;
  ping,//: number;
  validate_configer
}

export enum WsType {
  result = 'result',
  event = 'event',
  subTrigger = 'subscribe_trigger',
  unSubEvent = 'unsubscribe_events',
  callService = 'call_service',
  fireEvent = 'fire_event',
  getStates = 'get_states',
  getConfig = 'get_config',
  getServices = 'get_services',
  getpanels = 'get_panels'
}

export enum HomeAssistantService {
  turnOn = 'turn_on',
  turnOff = 'turn_off',
  toggle = 'toggle',
  setBrightness = 'set_brightness',
  hsColor = 'hs_color',
  colorTemp = 'color_temp',
  lock = 'lock',
  unLock = 'unlock',
  setSpeed = 'set_speed',
  setTemp = 'set_temperature',
  setOpMode = 'set_operation_mode',
  setFanMode = 'set_fan_mode',
  closeCover = 'close_cover',
  closeCoverTilt = 'close_cover_tilt',
  openCover = 'open_cover',
  openCoverTilt = 'open_cover_tilt',
  setCoverPosition = 'set_cover_position',
  setCoverTiltPosition = 'set_cover_tilt_position',
  stopCover = 'stop_cover',
  stopCoverTilt = 'stop_cover_tilt',
  trigger = 'trigger',
  reload = 'reload'

}

export enum CoverState {
  closed = 'closed',
  open = 'open',
  unknown = 'unknown'
}


export class HassEntityId {
  _domain: HassDomain;
  prefix = '';
  flatform: IotPlatform = IotPlatform.Unknown;
  deviceType: IotDeviceType = IotDeviceType.unknown;


  constructor(public hassEntity: HassEntity) {
    this.hassEntity = hassEntity;
    const splitted = this.hassEntity.entity_id.split('.');
    let rawType = '';
    if (splitted.length >= 2) {
      this._domain = splitted[0] as HassDomain;
      if (this._domain === 'group') {
        this.prefix = splitted[1];
      } else if (this._domain === 'script') {
        const device = splitted[1].split('_');
        if (device.length >= 2) {
          this.prefix = device[0];
          this.flatform = device[1].slice(0, 2) as IotPlatform;
        }
      } else {
        const device = splitted[1].split('_');
        if (device.length >= 2) {
          this.prefix = device[0];
          this.flatform = device[1].slice(0, 2) as IotPlatform;
          rawType = device[1].slice(2, 4);
        }
      }
    }

    let type: IotDeviceType = IotDeviceType.unknown;

    if (this._domain === 'media_player') {
      type = IotDeviceType.dqsmartMediaPlayer;
    } else if (this._domain === 'climate') {
      type = IotDeviceType.dqsmartClimate;
    } else if (this._domain === 'group' && this.prefix === 'all_lights') {
      type = IotDeviceType.all_lights;
    } else if (this._domain === 'group' && this.prefix === 'all_scripts') {
      type = IotDeviceType.all_scripts;
    } else if (this._domain === 'group' && this.prefix === 'all_automations') {
      type = IotDeviceType.all_automations;
    } else if (this._domain === 'script') {
      type = IotDeviceType.script;
    } else if (this._domain === 'binary_sensor') {
      type = IotDeviceType.binarySensor;
    } else if (this._domain === 'sensor') {
      type = IotDeviceType.sensor;
    } else {
      switch (rawType) {
        case '01':
        case '18':
        case '19':
        case '27':
        case '34':
          type = IotDeviceType.onOff;
          break;
        case '20':
        case '60':
          type = IotDeviceType.dimming;
          break;
        case '61':
          type = IotDeviceType.cct;
          break;
        case '62':
          type = IotDeviceType.rgbw;
          break;
        case '63':
          type = IotDeviceType.rgbCct;
          break;
        case '05':
          type = IotDeviceType.cover;
          break;
        case '08':
          /*        if (this._domain==="media_player") {
                    type = IotDeviceType.dqsmartMediaPlayer;
                  }
                  if (this._domain==="climate") {
                    type = IotDeviceType.dqsmartClimate;
                  }*/
          break;
        case '12':
          type = IotDeviceType.socket;
          break;
        case '17':
          type = IotDeviceType.lock;
          break;
        case '03':
          type = IotDeviceType.doorBinarySensor;
          break;
        case '04':
          type = IotDeviceType.moistureBinarySensor;
          break;
        case '06':
          type = IotDeviceType.smokeBinarySensor;
          break;
        case '07':
          type = IotDeviceType.motionBinarySensor;
          break;
        case '13':
          type = IotDeviceType.gasBinarySensor;
          break;
        case '15':
        case '16':
        case '24':
        case '25':
        case '33':
          type = IotDeviceType.buttonBinarySensor;
          break;
        case '30':
          type = IotDeviceType.vibrationSensor;
          break;
        case '02':
          type = IotDeviceType.temperatureSensor;
          break;
        case '14':
          type = IotDeviceType.illuminanceSensor;
          break;
        case '31':
          type = IotDeviceType.aqiSensor;
          break;
        case '28':
          type = IotDeviceType.siren;
          break;
        case '09':
          type = IotDeviceType.humiditySensor;
          break;
        default:
          type = IotDeviceType.unknown;
          break;
      }
    }


    this.deviceType = type;

  }

}

export class IotDeviceAttribute extends HassEntityId {
  private isProcessing = false;

  constructor(hassEntity: HassEntity) {
    super(hassEntity);
  }

  get state(): string {
    if (this.hassEntity && this.hassEntity?.state) {
      return this.hassEntity.state;
    }

    return '';
  }

  get name(): any {
    if (this.hassEntity && this.hassEntity?.attributes && this.hassEntity?.attributes?.friendly_name) {
      return this.hassEntity.attributes.friendly_name;
    }

    return this.entityId;
  }

  get domain(): string {
    return this._domain;
  }

  get deviceProfile(): IotDeviceType {
    return this.deviceType;
  }

  get domainName(): string {
    const name = DomainName[this._domain] || 'Không xác định';

    /*    switch (this.domain) {
          case IotDomain.light:
            name =  "Đèn";
            break;
          case IotDomain.binarySensor:
            name = "Cảm biến";
            break;
          case IotDomain.inputBoolean:
            name = "Thông minh";
            break;
          case IotDomain.script:
            name = "Kịch bản";
            break;
          case IotDomain.sensor:
            name = "Cảm biến";
            break;

        }*/
    return name;
  }

  get entityId(): string {
    return this.hassEntity.entity_id;
  }

  public getDeviceType(): IotDeviceType {
    return this.deviceType;
  }

  get icon(): string {

    switch (this.deviceProfile) {
      case IotDeviceType.onOff:
      case IotDeviceType.cct:
      case IotDeviceType.dimming:
      case IotDeviceType.rgbw:
      case IotDeviceType.rgbCct:
        return EntityIcon.lightBulbV2;
      case IotDeviceType.temperatureSensor:
        return EntityIcon.temperature;
      case IotDeviceType.illuminanceSensor:
        return EntityIcon.temperature;
      case IotDeviceType.humiditySensor:
        return EntityIcon.humidity;
      case IotDeviceType.aqiSensor:
        return EntityIcon.waterSensor;
      case IotDeviceType.dqsmartClimate:
        return EntityIcon.airConditioner;
      case IotDeviceType.buttonBinarySensor:
        return EntityIcon.iotBinaryInput;
      case IotDeviceType.cover:
        return EntityIcon.curtainsClosed;
      case IotDeviceType.dqsmartMediaPlayer:
        return EntityIcon.mediaPlayer;
      case IotDeviceType.all_lights:
        return EntityIcon.iotGroupLight;
      case IotDeviceType.all_scripts:
        return EntityIcon.iotGroupScene;
      case IotDeviceType.script:
        return EntityIcon.iotScene;
      case IotDeviceType.binarySensor:
        return EntityIcon.iotBinaryInput;
      case IotDeviceType.sensor:
        return EntityIcon.iotCommonSensor;
      case IotDeviceType.unknown:
        return EntityIcon.deviceUnknown;
    }
  }

  getPlattform(): string {
    if (this.flatform === IotPlatform.BletoothMesh) {
      return ModelIcon.blemesh;
    } else if (this.flatform === IotPlatform.Wifi) {
      return ModelIcon.wifi;
    } else if (this.flatform === IotPlatform.Zigbee) {
      return ModelIcon.zigbee;
    } else {
      return '';
    }
  }

  get iconUrlCommon(): string {
    return `./assets/apollo/icon/${this.icon}.svg`;
    /*    let icon = './assets/apollo/icon/device-unknown.svg';

        switch (this.deviceProfile) {
          case IotDeviceType.onOff:
          case IotDeviceType.cct:
          case IotDeviceType.dimming:
          case IotDeviceType.rgbw:
          case IotDeviceType.rgbCct:
            icon = './assets/apollo/icon/iot-light.svg';
            break;
          case IotDeviceType.temperatureSensor:
            icon = './assets/apollo/icon/temperature.svg';
            break;
          case IotDeviceType.humiditySensor:
            icon = './assets/apollo/icon/humidity.svg';
            break;
          case IotDeviceType.aqiSensor:
            icon = './assets/apollo/icon/water-sensor.svg';
            break;
          case IotDeviceType.dqsmartClimate:
            icon = './assets/apollo/icon/air-conditioner.svg';
            break;
        }
        return icon;*/
  }

}

export class IotDevice extends IotDeviceAttribute {
  constructor(hassEntity: HassEntity) {
    super(hassEntity);
  }
}

export class HomeAssistantGateway {

  private hassUrl: string;//= "https://dqsmartdqh01dqsmart0111d5540dprvw.fwd01.dqiot.work";
  private longToken: string;// = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njk4NzQ4NjIsImV4cCI6MTk4NTIzNDg2MiwiaXNzIjoiODYxODU4ZmRkNWY2NDhlY2FmNzU1ZjE4YTk3ODVmZWMifQ.gV5A8ovpSM-tHTzIxZ7RBWjqsd-p9vKEq5nlxSw7gs0";
  private _connection: Connection;
  private _isOnline = false;

  constructor(hassUrl: string, longToken: string) {
    this.hassUrl = hassUrl;
    this.longToken = longToken;
    console.log(hassUrl, longToken);
  }

  connect(): Observable<Connection> {

    const auth = createLongLivedTokenAuth(
      this.hassUrl,
      this.longToken
    );

    return new Observable<Connection>(observable => {
      createConnection({auth}).then((connect) => {
        this._connection = connect;
        subscribeServices(connect, (res) => {
          console.log(res);
        });
        observable.next(connect);
      }).catch(reason => observable.error(reason));
    });
  }

  close() {
    if (this._connection) {
      this._connection.close();
    }
  }

  subscribe(): Observable<any> {
    return new Observable<any>(observable => {
      if (this._connection) {
        this._connection.subscribeEvents((res) => {
          observable.next(res);
        }, 'state_changed').then(value => {
        });
      } else {
        observable.error('not found the connection');
      }
    });
  }

  /*    this._connection.subscribeEvents((res) => {
        if (res && res["data"] && res["data"]["entity_id"]) {
          if (res["data"]["new_state"]) {
            this._entities.set(res["data"]["entity_id"],
              new IotDevice(res["data"]["new_state"], this._connection))
          } else if (res["data"]["old_state"]) {
            this._entities.set(res["data"]["entity_id"],
              new IotDevice(res["data"]["old_state"], this._connection))
          }
        }
        }*/


  fetchEntities(): Observable<Array<HassEntity>> {
    return new Observable<Array<HassEntity>>(observable => {
      if (this._connection) {
        getStates(this._connection).then(entities => observable.next(Object.values(entities)));
      } else {
        observable.error('not found the connection');
      }
    });
  };

  get isOnline(): boolean {
    return this._isOnline;
  }
}


export class ClimateHass extends IotDevice {

  constructor(hassEntity: HassEntity) {
    super(hassEntity);
  }

  get state(): string {
    return this.hassEntity?.state;
  }


  get operatureMode(): string {
    return this.hassEntity?.attributes?.operation_mode;
  }

  get operatureList(): Array<string> {
    return this.hassEntity?.attributes?.operation_list;
  }

  get targetTempStep(): number {
    return this.hassEntity?.attributes?.target_temp_step;
  }

  get temperature(): number {
    return this.hassEntity?.attributes?.temperature;
  }

  get maxTemperature(): number {
    return this.hassEntity?.attributes?.max_temp;
  }

  get minTemperature(): number {
    return this.hassEntity?.attributes?.min_temp;
  }

  get fanMode(): string {
    return this.hassEntity?.attributes?.fan_mode;
  }

  get fanModeList(): Array<string> {
    return this.hassEntity?.attributes?.fan_list;
  }

}
