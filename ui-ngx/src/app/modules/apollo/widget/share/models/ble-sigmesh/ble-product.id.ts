import {NodeModel} from '@modules/apollo/widget/share/models/ble-sigmesh/network-model/node.model';
import {EntityIcon} from '@modules/apollo/widget/share/models/entity-icon';

export enum DeviceType {
  unknown = 'unknown',
  provisioner = 'provisioner',
  gateway = 'gateway',
  hub = 'hub',
  pirSensor = 'pir-sensor',
  motionSensor = 'motion-sensor',
  lightSensor = 'light-sensor',
  radarSensor = 'radar-sensor',
  light = 'light',
  lightD = 'light-d',
  lightW = 'light-w',
  lightRGB = 'light-rgb',
  lightRGBD = 'light-rgbd',
  lightRGBW = 'light-rgbw',
  lightRGBDW = 'light-rgbdw',
  tubeLight = 'tube-light',
  bulbLight = 'tube-light',
  light4Channel = 'light-4-channel',
  tubeLightRadar2in1 = 'light-radar-2in1',
  uvSensor = 'uv-sensor',
  uvRemote = 'uv-remote',
  remote = 'temperature-sensor',
  bikeSmartKey = 'bikeSmartkey',
  doorSensor = 'door-sensor',
  rfidReader = 'rfid-reader',
  repeater = 'repeater',
  energySensor = 'energy-sensor',
  temperatureSensor = 'temperature-sensor',
  switch = 'switch',
  lotsAvailableDisplay = 'lotsAvailableDisplay',
  lotsAvailableDistanceSensor = 'lotsAvailableDistanceSensor'
}

export enum ProductModel {
  light = 'light',
  lightSensor = 'light-sensor',
  sensor = 'sensor',
  remote = 'remote',
  gateway = 'gateway',
  hub = 'hub',
  smartkey = 'smartkey',
  repeater = 'repeater',
  display = 'display',
  other = 'other',
}

export enum CommonProductName {
  unknown = 'unknown',
  provisioner = 'provisioner',
  gateway = 'gateway',
  pirSensor = 'pirSensor',
  lightSensor = 'lightSensor',
  temperatureSensor = 'temperatureSensor',
  switch1 = 'switch1',
  remote = 'remote',
  tubeLight = 'tubeLight',
  bulbLightA60 = 'bulbLightA60',
  bulbLightG95 = 'bulbLightG95',
  bulbLightG120 = 'bulbLightG120',
  stripDriver = 'stripDriver',
  lrd04P5 = 'lrd04P5',
  lrd04P7 = 'lrd04P7',
  lrd10P9 = 'lrd10P9',
  lrd11 = 'lrd11',
  scu01 = 'scu01',
  scu02 = 'scu02',
  ballLight = 'ballLight',
  pannelLight = 'pannelLight',
  spotLight = 'spotLight',
  driver4channel = 'driver4channel',
  uvSensor = 'uvSensor',
  uvRemote = 'uvRemote',
  bikeAntiServer = 'bikeAntiServer',
  bikeAntiSmartKey = 'bikeAntiSmartKey',
  findingVerhicle = 'findingVerhicle',
  repeaterApollo = 'repeaterApollo',
  motionSensor = 'motionSensor',
  doubleWing = 'doubleWing',
  doorSensor = 'doorSensor',
  energySensor = 'energySensor',
  lightRadar2in1 = 'lightRadar2in1',
  lotsAvailableDisplay = 'lotsAvailableDisplay',
  lotsAvailableDistanceSensor = 'lotsAvailableDistanceSensor'
}

export interface ProductI {
  pid: number;
  pid2Enum: CommonProductName;
  name: string;
  type: DeviceType;
  code: string;
  model: ProductModel;
  icon?: EntityIcon;

}

export enum BleMeshModelId {
  onOff = '1000',
  lightness = '1300',
  hsl = '1307',
  ctl = '1306',
  apolloLightVender = '8001001',
  apolloRadarVender = '8002002'
}

const PRODUCT_ID: ProductI[] = [
  {
    pid: (0x0000),
    model: ProductModel.other,
    pid2Enum: CommonProductName.unknown,
    code: 'unknown',
    name: 'unknown',
    type: DeviceType.unknown,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x0999),
    model: ProductModel.other,
    pid2Enum: CommonProductName.provisioner,
    code: 'PROVISIONER',
    name: 'Provisioner',
    type: DeviceType.provisioner,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x1000),
    model: ProductModel.gateway,
    pid2Enum: CommonProductName.gateway,
    code: 'GETWAY_PRODUCT_ID',
    name: 'Apollo Gateway',
    type: DeviceType.gateway,
    icon: EntityIcon.gatewayV1
  },
  {
    pid: (0x1002),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.pirSensor,
    code: 'PIR_PRODUCT_ID',
    name: 'Cảm biến chuyển động PIR',
    type: DeviceType.pirSensor,
    icon: EntityIcon.motionSensor
  },
  {
    pid: (0x1003),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.lightSensor,
    code: 'LIGHTSENSOR_PRODUCT_ID',
    name: 'Cảm biến ánh sáng',
    type: DeviceType.lightSensor,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x1004),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.temperatureSensor,
    code: 'TEMPSENSOR_PRODUCT_ID',
    name: 'Cảm biến nhiệt độ',
    type: DeviceType.temperatureSensor,
    icon: EntityIcon.temperature
  },
  {
    pid: (0x1005),
    model: ProductModel.remote,
    pid2Enum: CommonProductName.switch1,
    code: 'SWITCH1_PRODUCT_ID',
    name: 'Công tắt',
    type: DeviceType.switch,
    icon: EntityIcon.iotLightSwitch
  },
  {
    pid: (0x1006),
    model: ProductModel.remote,
    pid2Enum: CommonProductName.remote,
    code: 'REMOTE_PRODUCT_ID',
    name: 'Remote',
    type: DeviceType.remote,
    icon: EntityIcon.deviceUnknown
  },

  {
    pid: (0x1050),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightA60,
    code: 'PRODUCT_ID_BULB_A60_D',
    name: 'Đèn Tube A60 D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1051),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightA60,
    code: 'PRODUCT_ID_BULB_A60_W',
    name: 'Đèn BULB A60 W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1052),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightA60,
    code: 'PRODUCT_ID_BULB_A60_RGB',
    name: 'Đèn BULB A60 RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1053),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightA60,
    code: 'PRODUCT_ID_BULB_A60_RGBD',
    name: 'Đèn BULB A60 RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1054),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightA60,
    code: 'PRODUCT_ID_BULB_A60_RGBW',
    name: 'Đèn BULB A60 RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1055),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightA60,
    code: 'PRODUCT_ID_BULB_A60_RGBDW',
    name: 'Đèn BULB A60 RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1056),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG95,
    code: 'PRODUCT_ID_BULB_G95_D',
    name: 'Đèn BULB G95 D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1057),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG95,
    code: 'PRODUCT_ID_BULB_G95_W',
    name: 'Đèn BULB G95 W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1058),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG95,
    code: 'PRODUCT_ID_BULB_G95_RGB',
    name: 'Đèn BULB G95 RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1059),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG95,
    code: 'PRODUCT_ID_BULB_G95_RGBD',
    name: 'Đèn BULB G95 RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x105A),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG95,
    code: 'PRODUCT_ID_BULB_G95_RGBW',
    name: 'Đèn BULB G95 RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x105B),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG95,
    code: 'PRODUCT_ID_BULB_G95_RGBDW',
    name: 'Đèn BULB G95 RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x105C),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG120,
    code: 'PRODUCT_ID_BULB_G120_D',
    name: 'Đèn BULB G120 D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x105D),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG120,
    code: 'PRODUCT_ID_BULB_G120_W',
    name: 'Đèn BULB G120 W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x105E),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG120,
    code: 'PRODUCT_ID_BULB_G120_RGB',
    name: 'Đèn BULB G120 RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x105F),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG120,
    code: 'PRODUCT_ID_BULB_G120_RGBD',
    name: 'Đèn BULB G120 RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1060),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG120,
    code: 'PRODUCT_ID_BULB_G120_RGBW',
    name: 'Đèn BULB G120 RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1061),
    model: ProductModel.light,
    pid2Enum: CommonProductName.bulbLightG120,
    code: 'PRODUCT_ID_BULB_G120_RGBDW',
    name: 'Đèn BULB G120 RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1062),
    model: ProductModel.light,
    pid2Enum: CommonProductName.stripDriver,
    code: 'PRODUCT_ID_TRIP_D',
    name: 'Đèn TRIP D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1063),
    model: ProductModel.light,
    pid2Enum: CommonProductName.stripDriver,
    code: 'PRODUCT_ID_TRIP_W',
    name: 'Đèn TRIP W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1064),
    model: ProductModel.light,
    pid2Enum: CommonProductName.stripDriver,
    code: 'PRODUCT_ID_TRIP_RGB',
    name: 'Đèn TRIP RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1065),
    model: ProductModel.light,
    pid2Enum: CommonProductName.stripDriver,
    code: 'PRODUCT_ID_TRIP_RGBD',
    name: 'Đèn TRIP RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1066),
    model: ProductModel.light,
    pid2Enum: CommonProductName.stripDriver,
    code: 'PRODUCT_ID_TRIP_RGBW',
    name: 'Đèn TRIP RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1067),
    model: ProductModel.light,
    pid2Enum: CommonProductName.stripDriver,
    code: 'PRODUCT_ID_TRIP_RGBDW',
    name: 'Đèn TRIP RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1068),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P5,
    code: 'PRODUCT_ID_LRD04_P5D',
    name: 'Đèn LRD04 P5D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1069),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P5,
    code: 'PRODUCT_ID_LRD04_P5W',
    name: 'Đèn LRD04 P5W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x106A),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P5,
    code: 'PRODUCT_ID_LRD04_P5RGB',
    name: 'Đèn LRD04 P5RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x106B),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P5,
    code: 'PRODUCT_ID_LRD04_P5RGBD',
    name: 'Đèn LRD04 P5RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x106C),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P5,
    code: 'PRODUCT_ID_LRD04_P5RGBW',
    name: 'Đèn LRD04 P5RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x106D),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P5,
    code: 'PRODUCT_ID_LRD04_P5RGBDW',
    name: 'Đèn LRD04 P5RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x106E),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P7,
    code: 'PRODUCT_ID_LRD04_P7D',
    name: 'Đèn LRD04 P7D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x106F),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P7,
    code: 'PRODUCT_ID_LRD04_P7W',
    name: 'Đèn LRD04 P7W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1070),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P7,
    code: 'PRODUCT_ID_LRD04_P7RGB',
    name: 'Đèn LRD04 P7RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1071),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P7,
    code: 'PRODUCT_ID_LRD04_P7RGBD',
    name: 'Đèn LRD04 P7RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1072),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P7,
    code: 'PRODUCT_ID_LRD04_P7RGBW',
    name: 'Đèn LRD04 P7RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1073),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd04P7,
    code: 'PRODUCT_ID_LRD04_P7RGBDW',
    name: 'Đèn LRD04 P7RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1074),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd10P9,
    code: 'PRODUCT_ID_LRD10_P9D',
    name: 'Đèn LRD10 P9D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1075),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd10P9,
    code: 'PRODUCT_ID_LRD10_P9W',
    name: 'Đèn LRD10 P9W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1076),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd10P9,
    code: 'PRODUCT_ID_LRD10_P9RGB',
    name: 'Đèn LRD10 P9RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1077),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd10P9,
    code: 'PRODUCT_ID_LRD10_P9RGBD',
    name: 'Đèn LRD10 P9RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1078),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd10P9,
    code: 'PRODUCT_ID_LRD10_P9RGBW',
    name: 'Đèn LRD10 P9RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1079),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd10P9,
    code: 'PRODUCT_ID_LRD10_P9RGBDW',
    name: 'Đèn LRD10 P9RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x107A),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu01,
    code: 'PRODUCT_ID_SCU01_D',
    name: 'Driver SCU01 D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x107B),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu01,
    code: 'PRODUCT_ID_SCU01_W',
    name: 'Driver SCU01 W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x107C),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu01,
    code: 'PRODUCT_ID_SCU01_RGB',
    name: 'Driver SCU01 RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x107D),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu01,
    code: 'PRODUCT_ID_SCU01_RGBD',
    name: 'Driver SCU01 RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x107E),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu01,
    code: 'PRODUCT_ID_SCU01_RGBW',
    name: 'Driver SCU01 RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x107F),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu01,
    code: 'PRODUCT_ID_SCU01_RGBDW',
    name: 'Driver SCU01 RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1080),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu02,
    code: 'PRODUCT_ID_SCU02_D',
    name: 'Đèn SCU02 D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1081),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu02,
    code: 'PRODUCT_ID_SCU02_W',
    name: 'Đèn SCU02 W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1082),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu02,
    code: 'PRODUCT_ID_SCU02_RGB',
    name: 'Đèn SCU02 RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1083),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu02,
    code: 'PRODUCT_ID_SCU02_RGBD',
    name: 'Đèn SCU02 RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1084),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu02,
    code: 'PRODUCT_ID_SCU02_RGBW',
    name: 'Đèn SCU02 RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1085),
    model: ProductModel.light,
    pid2Enum: CommonProductName.scu02,
    code: 'PRODUCT_ID_SCU02_RGBDW',
    name: 'Đèn SCU02 RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1086),
    model: ProductModel.light,
    pid2Enum: CommonProductName.ballLight,
    code: 'PRODUCT_ID_BALL_D',
    name: 'Đèn BALL D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1087),
    model: ProductModel.light,
    pid2Enum: CommonProductName.ballLight,
    code: 'PRODUCT_ID_BALL_W',
    name: 'Đèn BALL W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1088),
    model: ProductModel.light,
    pid2Enum: CommonProductName.ballLight,
    code: 'PRODUCT_ID_BALL_RGB',
    name: 'Đèn BALL RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1089),
    model: ProductModel.light,
    pid2Enum: CommonProductName.ballLight,
    code: 'PRODUCT_ID_BALL_RGBD',
    name: 'Đèn BALL RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x108A),
    model: ProductModel.light,
    pid2Enum: CommonProductName.ballLight,
    code: 'PRODUCT_ID_BALL_RGBW',
    name: 'Đèn BALL RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x108B),
    model: ProductModel.light,
    pid2Enum: CommonProductName.ballLight,
    code: 'PRODUCT_ID_BALL_RGBDW',
    name: 'Đèn BALL RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x108C),
    model: ProductModel.light,
    pid2Enum: CommonProductName.pannelLight,
    code: 'PRODUCT_ID_PANEL_D',
    name: 'Đèn PANEL D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x108D),
    model: ProductModel.light,
    pid2Enum: CommonProductName.pannelLight,
    code: 'PRODUCT_ID_PANEL_W',
    name: 'Đèn PANEL W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x108F),
    model: ProductModel.light,
    pid2Enum: CommonProductName.pannelLight,
    code: 'PRODUCT_ID_PANEL_RGB',
    name: 'Đèn PANEL RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x108E),
    model: ProductModel.light,
    pid2Enum: CommonProductName.pannelLight,
    code: 'PRODUCT_ID_PANEL_RGBD',
    name: 'Đèn PANEL RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1090),
    model: ProductModel.light,
    pid2Enum: CommonProductName.pannelLight,
    code: 'PRODUCT_ID_PANEL_RGBW',
    name: 'Đèn PANEL RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1091),
    model: ProductModel.light,
    pid2Enum: CommonProductName.pannelLight,
    code: 'PRODUCT_ID_PANEL_RGBDW',
    name: 'Đèn PANEL RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1092),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_D',
    name: 'Đèn SPOT D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1093),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_W',
    name: 'Đèn SPOT W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1094),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_RGB',
    name: 'Đèn SPOT RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1095),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_RGBD',
    name: 'Đèn SPOT RGBD ',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1096),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_RGBW',
    name: 'Đèn SPOT RGBW ',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x1097),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_RGBDW',
    name: 'Đèn SPOT RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x1098),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_TUBLE_D',
    name: 'Đèn TUBE D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x1099),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_TUBLE_W',
    name: 'Đèn TUBE W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x109A),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_TUBLE_RGB',
    name: 'Đèn TUBE RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x109B),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_TUBLE_RGBD',
    name: 'Đèn TUBE RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x109C),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_TUBLE_RGBW',
    name: 'Đèn TUBE RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x109D),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_TUBLE_RGBDW',
    name: 'Đèn TUBE RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x109E),
    model: ProductModel.light,
    pid2Enum: CommonProductName.doubleWing,
    code: 'PRODUCT_ID_DOUBLEWING_DW',
    name: 'Đèn DOUBLEWING DW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x109F),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd11,
    code: 'PRODUCT_ID_LRD11_D',
    name: 'Đèn LRD11 D',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x10A0),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd11,
    code: 'PRODUCT_ID_LRD11_W',
    name: 'Đèn LRD11 W',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x10A1),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd11,
    code: 'PRODUCT_ID_LRD11_RGB',
    name: 'Đèn LRD11 RGB',
    type: DeviceType.lightRGB,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x10A2),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd11,
    code: 'PRODUCT_ID_LRD11_RGBD',
    name: 'Đèn LRD11 RGBD',
    type: DeviceType.lightRGBD,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x10A3),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd11,
    code: 'PRODUCT_ID_LRD11_RGBW',
    name: 'Đèn LRD11 RGBW',
    type: DeviceType.lightRGBW,
    icon: EntityIcon.bulbLightRgbV4
  },
  {
    pid: (0x10A4),
    model: ProductModel.light,
    pid2Enum: CommonProductName.lrd11,
    code: 'PRODUCT_ID_LRD11_RGBDW',
    name: 'Đèn LRD11 RGBDW',
    type: DeviceType.lightRGBDW,
    icon: EntityIcon.bulbLightRgbV4
  },

  {
    pid: (0x10A7),
    model: ProductModel.light,
    pid2Enum: CommonProductName.driver4channel,
    code: 'PRODUCT_ID_DIMMING_4CHANEL',
    name: 'Driver Đèn 4 kênh',
    type: DeviceType.light4Channel,
    icon: EntityIcon.iotGroupLight
  },
  {
    pid: (0x10A5),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.uvSensor,
    code: 'PRODUCT_ID_UV_SENSOR',
    name: 'Cảm biến đóng mở đèn UV',
    type: DeviceType.uvSensor,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x10A6),
    model: ProductModel.remote,
    pid2Enum: CommonProductName.uvRemote,
    code: 'UV_REMOTE_PRODUCT_ID',
    name: 'Remote đèn UV',
    type: DeviceType.uvRemote,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x2000),
    model: ProductModel.other,
    pid2Enum: CommonProductName.bikeAntiServer,
    code: 'PRODUCT_ID_BIKE_ANTI_SERVER',
    name: 'Chống trộm gắn trên xe',
    type: DeviceType.temperatureSensor,
    icon: EntityIcon.temperature
  },
  {
    pid: (0x2001),
    model: ProductModel.other,
    pid2Enum: CommonProductName.bikeAntiSmartKey,
    code: 'PRODUCT_ID_BIKE_ANTI_SMARTKEY',
    name: 'Khóa thông minh xe đạp',
    type: DeviceType.bikeSmartKey,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x2002),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.doorSensor,
    code: 'PRODUCT_ID_DOORSENSOR_SERVER',
    name: 'Cảm biến báo động mở cửa',
    type: DeviceType.doorSensor,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x2003),
    model: ProductModel.other,
    pid2Enum: CommonProductName.findingVerhicle,
    code: 'PRODUCT_ID_FINDING_VERHICLE',
    name: 'Bộ đọc thẻ RFID',
    type: DeviceType.rfidReader,
    icon: EntityIcon.rfId
  },
  {
    pid: (0x3001),
    model: ProductModel.display,
    pid2Enum: CommonProductName.lotsAvailableDisplay,
    code: 'PRODUCT_ID_LOTS_AVAILABLE_DISPLAY',
    name: 'Lots Available Display',
    type: DeviceType.lotsAvailableDisplay,
    icon: EntityIcon.displayMatrix
  },
  {
    pid: (0x3000),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.lotsAvailableDistanceSensor,
    code: 'PRODUCT_ID_LOTS_AVAILABLE_DISTANCE_SENSOR',
    name: 'Lots Available Distance Sensor',
    type: DeviceType.lotsAvailableDistanceSensor,
    icon: EntityIcon.iotCommonSensor
  },
  {
    pid: (0x3002),
    model: ProductModel.repeater,
    pid2Enum: CommonProductName.repeaterApollo,
    code: 'PRODUCT_ID_REPEATER',
    name: 'Apollo Repeater',
    type: DeviceType.repeater,
    icon: EntityIcon.deviceUnknown
  },
  {
    pid: (0x8001),
    model: ProductModel.light,
    pid2Enum: CommonProductName.tubeLight,
    code: 'PRODUCT_ID_LIGHT',
    name: 'Đèn Bluetooth',
    type: DeviceType.lightD,
    icon: EntityIcon.lightBulbV2
  },
  {
    pid: (0x8002),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.motionSensor,
    code: 'PRODUCT_ID_MOTIONTL',
    name: 'Cảm biến chuyển động Radar',
    type: DeviceType.motionSensor,
    icon: EntityIcon.motionSensor
  },
  {
    pid: (0x10A8),
    model: ProductModel.lightSensor,
    pid2Enum: CommonProductName.lightRadar2in1,
    code: 'PRODUCT_ID_DIM_TRIAC',
    name: 'Đèn TUBE D 2 Trong 1',
    type: DeviceType.tubeLightRadar2in1,
    icon: EntityIcon.tubeLightRadar2in1
  },
  {
    pid: (0x10A9),
    model: ProductModel.sensor,
    pid2Enum: CommonProductName.energySensor,
    code: 'PRODUCT_ID_MEASURE_ENEGRY',
    name: 'Giám sát năng lượng',
    type: DeviceType.energySensor,
    icon: EntityIcon.energySensor
  },
  {
    pid: (0x10AA),
    model: ProductModel.light,
    pid2Enum: CommonProductName.spotLight,
    code: 'PRODUCT_ID_SPOT_W',
    name: 'Đèn CCT',
    type: DeviceType.lightW,
    icon: EntityIcon.lightBulbV2
  },
];


export class BleProductId {
  getTypeName(pid: number | string): string {
    const nPid = Number(pid);

    const product = PRODUCT_ID.find(x => x.pid === nPid);

    if (product) {
      return product.name;
    } else {
      return 'Không xác định';
    }
  }

  findProductByPid(bleNode: NodeModel): ProductI {
    if (!bleNode) {
      return undefined;
    }
    const nPid = Number('0x' + bleNode?.pid);

    const product = PRODUCT_ID.find((x) => {
      if (x.pid === nPid) {
        return true;
      }
    });
    return product;
  }


  findProductModelByPid(bleNode: NodeModel): DeviceType {
    if (!bleNode) {
      return DeviceType.unknown;
    }
    const nPid = Number('0x' + bleNode?.pid);

    const product = PRODUCT_ID.find((x) => x.pid === nPid);
    if (product) {
      return product.type as unknown as DeviceType;
    } else {
      return DeviceType.unknown;
    }
  }

  getProduct(pid: number | string): CommonProductName {
    const nPid = Number('0x' + pid);

    const product = PRODUCT_ID.find((x) => {

      if (x.pid === nPid) {
        return true;
      }
    });
    if (product) {
      return product.pid2Enum as unknown as CommonProductName;
    } else {
      return CommonProductName.unknown;
    }
  }


}
