export enum ZigbeeModel {
  ZB_DQSMART_SWITCH_1 = 'dqhome.re1', // DQSmart Switch 1 Relay
  ZB_DQSMART_SWITCH_2 = 'dqhome.re2',  // DQSmart Switch 2 Relay
  ZB_DQSMART_SWITCH_3 = 'dqhome.re3', // DQSmart Switch 3 Relay
  ZB_DQSMART_SWITCH_4 = 'dqhome.re4', // DQSmart Switch 4 Relay
  ZB_DQSMART_SWITCH_6 = 'dqhome.re6', // DQSmart Switch 6 Relay
  ZB_DQSMART_CURTAIN = 'dqhome.cur', // DQSmart curtain sensor
  ZB_DQSMART_DIMMER_AC_SWITCH = 'dqhome.di', // DQSmart di1
  ZB_MI_CUBE_CONTROLLER = 'lumi.sensor_cube', // Mi Cube Controller
  ZB_XIAOMI_DOOR_AND_WINDOW_SENSOR = 'lumi.sensor_magnet', // Xiaomi Door and Window Sensor
  ZB_AQARA_DOOR_AND_WINDOW_SENSOR = 'lumi.sensor_magnet.aq2', // Aqara Door and Window Sensor
  ZB_XIAOMI_MOTION_SENSOR = 'lumi.sensor_motion', // Xiaomi Motion Sensor
  ZB_AQARA_MOTION_SENSOR = 'lumi.sensor_motion.aq2', // Aqara Motion Sensor
  ZB_AQARA_SMART_BULB = 'lumi.light.aqcn02', // Aqara Smart Bulb
  ZB_XIAOMI_SMART_PLUG = 'lumi.plug', // Xiaomi Smart Plug
  ZB_AQARA_SMART_PLUG = 'lumi.ctrl_86plug.aq1', // Aqara Smart Plug
  ZB_XIAOMI_TEMPERATURE_AND_HUMIDITY_SENSOR = 'lumi.sensor_ht', // Xiaomi Temperature and Humidity Sensor
  ZB_AQARA_TEMPERATURE_AND_HUMIDITY_SENSOR = 'lumi.weather', // Aqara Temperature and Humidity Sensor
  ZB_AQARA_TWO_WAY_WIRELESS_CONTROL_RELAY = 'lumi.relay.c2acn01', // Aqara Two-Way Wireless Control Relay
  ZB_AQARA_WALL_SWITCH_SINGLE_NO_NEUTRAL = 'lumi.ctrl_neutral1', // Aqara Wall Switch - Single (no Neutral)
  ZB_AQARA_WALL_SWITCH_DOUBLE_NO_NEUTRAL = 'lumi.ctrl_neutral2', // Aqara Wall Switch - Double (no Neutral)
  ZB_AQARA_WALL_SWITCH_SINGLE_W_NEUTRAL = 'lumi.ctrl_ln1.aq1', // Aqara Wall Switch - Single (w/Neutral)
  ZB_AQARA_WALL_SWITCH_DOUBLE_W_NEUTRAL = 'lumi.ctrl_ln2.aq1', // Aqara Wall Switch - Double (w/Neutral)
  ZB_AQARA_WATER_LEAK_SENSOR = 'lumi.sensor_wleak.aq1', // Aqara Water Leak Sensor
  ZB_XIAOMI_SMART_WIRELESS_SWITCH = 'lumi.sensor_switch', // Xiaomi Smart Wireless Switch
  ZB_AQARA_WIRELESS_MINI_SWITCH_2015 = 'lumi.sensor_switch.aq2', // Aqara Wireless Mini Switch (2015)
  ZB_AQARA_WIRELESS_MINI_SWITCH_2018 = 'lumi.remote.b1acn01', // Aqara Wireless Mini Switch (2018)
  ZB_AQARA_WIRELESS_MINI_SWITCH = 'lumi.sensor_switch.aq3', // Aqara Wireless Mini Switch

  ZB_AQARA_WIRELESS_REMOTE_SWITCH_SINGLE_2016_1 = 'lumi.sensor_86sw1', // Aqara Wireless Remote Switch - Single
  ZB_AQARA_WIRELESS_REMOTE_SWITCH_SINGLE_2016_2 = 'lumi.sensor_86sw1lu', // Aqara Wireless Remote Switch - Single
  ZB_AQARA_WIRELESS_REMOTE_SWITCH_SINGLE_2018 = 'lumi.remote.b186acn01', // Aqara Wireless Remote Switch - Single
  ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2016_1 = 'lumi.sensor_86sw2', // Aqara Wireless Remote Switch - Double
  ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2016_2 = 'lumi.sensor_86sw2Un', // Aqara Wireless Remote Switch - Double
  ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2018 = 'lumi.remote.b286acn01', // Aqara Wireless Remote Switch - Double
  ZB_AQARA_VIBRATION_SENSOR = 'lumi.vibration.aq1', // Aqara Vibration Sensor
  ZB_MIJIA_HONEYWELL_SMOKE_DETECTOR = 'lumi.sensor_smoke', // MiJia Honeywell Smoke Detector
  ZB_MIJIA_HONEYWELL_NATURAL_GAS_SENSOR_1 = 'lumi.sensor_natgas', // MiJia Honeywell Natural Gas Sensor
  ZB_MIJIA_HONEYWELL_NATURAL_GAS_SENSOR_2 = 'lumi.gas', // MiJia Honeywell Natural Gas Sensor

  ZB_AQARA_SMART_CURTAIN_MOTOR = 'lumi.curtain', // Aqara Smart Curtain

//cac modal khong co trong document
  ZB_HEIMAN_2WAY_SWITCH = 'unknown 1234560',
  ZB_HEIMAM_SWITCH_SMART_1 = 'unknown 1234561',
  ZB_HEIMAM_SWITCH_SMART_2 = 'unknown 1234562',
  ZB_HEIMAM_SWITCH_SMART_3 = 'unknown 1234563',
  ZB_SUNRICHER_AC_PHASE_DIMMER = 'unknown 1234564',
  ZB_SUNRICHER_CCT_LED_DRIVER = 'unknown 1234565',
  ZB_DIMMER_SWITCH_1 = 'unknown 1234566',
  ZB_SMART_INLINE_SWITCH_1 = 'unknown 1234567',
  ZB_SMART_INLINE_SWITCH_2 = 'unknown 1234568',
  ZB_RE3_WITH_DIMMER = 'unknown 1234569',
  ZB_DQSMART_SOCKET = 'unknown 123456a',
  ZB_HEIMAN_TEMPERATURE_HUMIDITY = 'unknown 123456b',
  ZB_HEIMAN_OCCUPANCY_SENSOR = 'unknown 123456c',
  ZB_HEIMAN_WIRE_OCCUPANCY_SENSOR = 'unknown 123456d',
  ZB_YALE_LOCK = 'unknown 123456e',
  ZB_MULTI_SMOKE_SENSOR = 'unknown 123456f',
  ZB_HEIMAN_SMOKE_SENSOR = 'unknown 12345670',
  ZB_IAS_SIREN = 'unknown 12345671',
  ZB_HEIMAN_RGB_LIGHT = 'unknown 12345672',
  ZB_HEIMAN_CCT_LIGHT = 'unknown 12345673',
  ZB_HEIMAN_RGBW_LIGHT = 'unknown 12345674',
  ZB_HEIMAN_CCTRGB_LIGHT = 'unknown 12345675',
  ZB_HEIMAN_AQI_SENSOR = 'unknown 12345676',
  ZB_HEIMAN_SCENE_SWITCH = 'unknown 12345677',
  ZB_HEIMAN_DIMMER_SWITCH = 'unknown 12345678',
  ZB_HEIMAN_DOOR_SENSOR = 'unknown 12345679',
  ZB_HEIMAN_GAS_SENSOR = 'unknown 1234567a',
  ZB_HEIMAN_REMOTE_SOS = 'unknown 1234567b',
  ZB_HEIMAN_MOTION_SENSOR = 'unknown 1234567c',
  ZB_TUYA_MOTION_WIRED = 'unknown 1234567d',
  // TODO add your device at here
  ZB_DEVICE_UNKNOWN = 'unknown'
}

export const ZigbeeModelTypeLabelMapping: Record<ZigbeeModel, string> = {
  [ZigbeeModel.ZB_DQSMART_SWITCH_1]: 'DQSmart Switch 1 Relay', // DQSmart Switch 1 Relay
  [ZigbeeModel.ZB_DQSMART_SWITCH_2]: 'DQSmart Switch 2 Relay',  // DQSmart Switch 2 Relay
  [ZigbeeModel.ZB_DQSMART_SWITCH_3]: 'DQSmart Switch 3 Relay', // DQSmart Switch 3 Relay
  [ZigbeeModel.ZB_DQSMART_SWITCH_4]: 'DQSmart Switch 4 Relay', // DQSmart Switch 4 Relay
  [ZigbeeModel.ZB_DQSMART_SWITCH_6]: 'DQSmart Switch 6 Relay', // DQSmart Switch 6 Relay
  [ZigbeeModel.ZB_DQSMART_CURTAIN]: 'DQSmart curtain sensor', // DQSmart curtain sensor
  [ZigbeeModel.ZB_DQSMART_DIMMER_AC_SWITCH]: 'DQSmart Dimmer AC Switch', // DQSmart Dimmer AC Switch
  [ZigbeeModel.ZB_MI_CUBE_CONTROLLER]: 'Mi Cube Controller', // Mi Cube Controller
  [ZigbeeModel.ZB_XIAOMI_DOOR_AND_WINDOW_SENSOR]: 'Xiaomi Door and Window Sensor', // Xiaomi Door and Window Sensor
  [ZigbeeModel.ZB_AQARA_DOOR_AND_WINDOW_SENSOR]: 'Aqara Door and Window Sensor', // Aqara Door and Window Sensor
  [ZigbeeModel.ZB_XIAOMI_MOTION_SENSOR]: 'Xiaomi Motion Sensor', // Xiaomi Motion Sensor
  [ZigbeeModel.ZB_AQARA_MOTION_SENSOR]: 'Aqara Motion Sensor', // Aqara Motion Sensor
  [ZigbeeModel.ZB_AQARA_SMART_BULB]: 'Aqara Smart Bulb', // Aqara Smart Bulb
  [ZigbeeModel.ZB_XIAOMI_SMART_PLUG]: 'Xiaomi Smart Plug', // Xiaomi Smart Plug
  [ZigbeeModel.ZB_AQARA_SMART_PLUG]: 'Aqara Smart Plug', // Aqara Smart Plug
  [ZigbeeModel.ZB_XIAOMI_TEMPERATURE_AND_HUMIDITY_SENSOR]: 'Xiaomi Temperature and Humidity Sensor', // Xiaomi Temperature and Humidity Sensor
  [ZigbeeModel.ZB_AQARA_TEMPERATURE_AND_HUMIDITY_SENSOR]: 'Aqara Temperature and Humidity Sensor', // Aqara Temperature and Humidity Sensor
  [ZigbeeModel.ZB_AQARA_TWO_WAY_WIRELESS_CONTROL_RELAY]: 'Aqara Two-Way Wireless Control Relay', // Aqara Two-Way Wireless Control Relay
  [ZigbeeModel.ZB_AQARA_WALL_SWITCH_SINGLE_NO_NEUTRAL]: 'Aqara Wall Switch - Single (no Neutral)', // Aqara Wall Switch - Single (no Neutral)
  [ZigbeeModel.ZB_AQARA_WALL_SWITCH_DOUBLE_NO_NEUTRAL]: ' Aqara Wall Switch - Double (no Neutral)', // Aqara Wall Switch - Double (no Neutral)
  [ZigbeeModel.ZB_AQARA_WALL_SWITCH_SINGLE_W_NEUTRAL]: 'Aqara Wall Switch - Single (w/Neutral)', // Aqara Wall Switch - Single (w/Neutral)
  [ZigbeeModel.ZB_AQARA_WALL_SWITCH_DOUBLE_W_NEUTRAL]: 'Aqara Wall Switch - Double (w/Neutral)', // Aqara Wall Switch - Double (w/Neutral)
  [ZigbeeModel.ZB_AQARA_WATER_LEAK_SENSOR]: 'Aqara Water Leak Sensor', // Aqara Water Leak Sensor
  [ZigbeeModel.ZB_XIAOMI_SMART_WIRELESS_SWITCH]: 'Xiaomi Smart Wireless Switch', // Xiaomi Smart Wireless Switch
  [ZigbeeModel.ZB_AQARA_WIRELESS_MINI_SWITCH_2015]: 'Aqara Wireless Mini Switch (2015)', // Aqara Wireless Mini Switch (2015)
  [ZigbeeModel.ZB_AQARA_WIRELESS_MINI_SWITCH_2018]: 'Aqara Wireless Mini Switch (2018)', // Aqara Wireless Mini Switch (2018)
  [ZigbeeModel.ZB_AQARA_WIRELESS_MINI_SWITCH]: 'Aqara Wireless Mini Switch', // Aqara Wireless Mini Switch

  [ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_SINGLE_2016_1]: 'Aqara Wireless Remote Switch - Single', // Aqara Wireless Remote Switch - Single
  [ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_SINGLE_2016_2]: 'Aqara Wireless Remote Switch - Single', // Aqara Wireless Remote Switch - Single
  [ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_SINGLE_2018]: 'Aqara Wireless Remote Switch - Single', // Aqara Wireless Remote Switch - Single
  [ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2016_1]: 'Aqara Wireless Remote Switch - Double',
  [ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2016_2]: 'Aqara Wireless Remote Switch - Double', // Aqara Wireless Remote Switch - Double
  [ZigbeeModel.ZB_AQARA_WIRELESS_REMOTE_SWITCH_DOUBLE_2018]: 'Aqara Wireless Remote Switch - Double', // Aqara Wireless Remote Switch - Double
  [ZigbeeModel.ZB_AQARA_VIBRATION_SENSOR]: 'Aqara Vibration Sensor', // Aqara Vibration Sensor
  [ZigbeeModel.ZB_MIJIA_HONEYWELL_SMOKE_DETECTOR]: 'MiJia Honeywell Smoke Detector', // MiJia Honeywell Smoke Detector
  [ZigbeeModel.ZB_MIJIA_HONEYWELL_NATURAL_GAS_SENSOR_1]: 'MiJia Honeywell Natural Gas Sensor', // MiJia Honeywell Natural Gas Sensor
  [ZigbeeModel.ZB_MIJIA_HONEYWELL_NATURAL_GAS_SENSOR_2]: 'MiJia Honeywell Natural Gas Sensor', // MiJia Honeywell Natural Gas Sensor
  [ZigbeeModel.ZB_AQARA_SMART_CURTAIN_MOTOR]: 'Aqara Smart Curtain', // Aqara Smart Curtain

//cac modal khong co trong document
  [ZigbeeModel.ZB_HEIMAN_2WAY_SWITCH]: 'unknown 1234560',
  [ZigbeeModel.ZB_HEIMAM_SWITCH_SMART_1]: 'unknown 1234561',
  [ZigbeeModel.ZB_HEIMAM_SWITCH_SMART_2]: 'unknown 1234562',
  [ZigbeeModel.ZB_HEIMAM_SWITCH_SMART_3]: 'unknown 1234563',
  [ZigbeeModel.ZB_SUNRICHER_AC_PHASE_DIMMER]: 'unknown 1234564',
  [ZigbeeModel.ZB_SUNRICHER_CCT_LED_DRIVER]: 'unknown 1234565',
  [ZigbeeModel.ZB_DIMMER_SWITCH_1]: 'unknown 1234566',
  [ZigbeeModel.ZB_SMART_INLINE_SWITCH_1]: 'unknown 1234567',
  [ZigbeeModel.ZB_SMART_INLINE_SWITCH_2]: 'unknown 1234568',
  [ZigbeeModel.ZB_RE3_WITH_DIMMER]: 'unknown 1234569',
  [ZigbeeModel.ZB_DQSMART_SOCKET]: 'unknown 123456a',
  [ZigbeeModel.ZB_HEIMAN_TEMPERATURE_HUMIDITY]: 'unknown 123456b',
  [ZigbeeModel.ZB_HEIMAN_OCCUPANCY_SENSOR]: 'unknown 123456c',
  [ZigbeeModel.ZB_HEIMAN_WIRE_OCCUPANCY_SENSOR]: 'unknown 123456d',
  [ZigbeeModel.ZB_YALE_LOCK]: 'unknown 123456e',
  [ZigbeeModel.ZB_MULTI_SMOKE_SENSOR]: 'unknown 123456f',
  [ZigbeeModel.ZB_HEIMAN_SMOKE_SENSOR]: 'unknown 12345670',
  [ZigbeeModel.ZB_IAS_SIREN]: 'unknown 12345671',
  [ZigbeeModel.ZB_HEIMAN_RGB_LIGHT]: 'unknown 12345672',
  [ZigbeeModel.ZB_HEIMAN_CCT_LIGHT]: 'unknown 12345673',
  [ZigbeeModel.ZB_HEIMAN_RGBW_LIGHT]: 'unknown 12345674',
  [ZigbeeModel.ZB_HEIMAN_CCTRGB_LIGHT]: 'unknown 12345675',
  [ZigbeeModel.ZB_HEIMAN_AQI_SENSOR]: 'unknown 12345676',
  [ZigbeeModel.ZB_HEIMAN_SCENE_SWITCH]: 'unknown 12345677',
  [ZigbeeModel.ZB_HEIMAN_DIMMER_SWITCH]: 'unknown 12345678',
  [ZigbeeModel.ZB_HEIMAN_DOOR_SENSOR]: 'unknown 12345679',
  [ZigbeeModel.ZB_HEIMAN_GAS_SENSOR]: 'unknown 1234567a',
  [ZigbeeModel.ZB_HEIMAN_REMOTE_SOS]: 'unknown 1234567b',
  [ZigbeeModel.ZB_HEIMAN_MOTION_SENSOR]: 'unknown 1234567c',
  [ZigbeeModel.ZB_TUYA_MOTION_WIRED]: 'unknown 1234567d',
  // TODO add your device at here
  [ZigbeeModel.ZB_DEVICE_UNKNOWN]: 'unknown'

};

export enum ListZigbeeDevice {
  'dqhome.re1' = 'light',
  'dqhome.re2' = 'light',
  'dqhome.re3' = 'light',
  'dqhome.re4' = 'light',
  'dqhome.re5' = 'light',
  'dqhome.re6' = 'light',
  'lumi.sensor_ht' = 'sensor', //"original" Xiaomi & Aqara Temperature/Humidity sensors
  'lumi.weather' = 'sensor', //"original" Xiaomi & Aqara Temperature/Humidity sensors
  'lumi.sensor_motion' = 'binary_sensor', //"original" Xiaomi Motion Sensor
  'lumi.sensor_motion.aq2' = 'binary_sensor', //Aqara Motion Sensor
  'lumi.sensor_magnet' = 'binary_sensor', // "original" Xiaomi  Door/Window contact sensors
  'lumi.sensor_magnet.aq2' = 'binary_sensor', // Aqara Door/Window contact sensors
  'lumi.sensor_wleak.aq1' = 'binary_sensor', // Aqara Leak sensor
  'lumi.sensor_switch' = 'binary_sensor', //"original" Xiaomi Button
  'lumi.sensor_switch.aq' = 'binary_sensor', // Aqara Button - ble-sigmesh WXKG11LM & WXKG12LM
  'lumi.remote.b1acn01' = 'binary_sensor', // Aqara Button - ble-sigmesh WXKG11LM & WXKG12LM
  'lumi.sensor_switch.aq3' = 'binary_sensor', // Aqara Button - ble-sigmesh WXKG11LM & WXKG12LM
  'lumi.sensor_86sw1lu' = 'binary_sensor', // Aqara 1-button Wireless Light Switch (2016)
  'lumi.sensor_86sw' = 'binary_sensor', //Aqara 2-button Wireless Light Switch (2016)
  'lumi.remote.b186acn01' = 'binary_sensor', //Aqara 1-button Wireless Light Switch (2018)
  'lumi.remote.b286acn01' = 'binary_sensor', //Aqara 2-button Wireless Light Switch (2018)
  'lumi.ctrl_neutral1' = 'switch', // Aqara Wall switch
  'lumi.ctrl_neutral2' = 'switch', // Aqara Wall switch
  'lumi.sensor_natgas' = 'binary_sensor', //MiJia Honeywell Gas Detector
  'lumi.sensor_smoke' = 'binary_sensor', //Xiaomi MiJia Honeywell Smoke Detector - model JTYJ-GD-01LM/BW
  'lumi.plug' = 'switch', // smart plug
  'lumi.sensor_cube' = 'sensor', //Mi Cube Controller
  'lumi.curtain' = 'cover', // Aqara smart curtain
}

export const ZigbeeDeviceTypeLabelMapping: Record<ListZigbeeDevice, string> = {
  [ListZigbeeDevice['dqhome.re1']]: 'light',
  [ListZigbeeDevice['dqhome.re2']]: 'light',
  [ListZigbeeDevice['dqhome.re3']]: 'light',
  [ListZigbeeDevice['dqhome.re4']]: 'light',
  [ListZigbeeDevice['dqhome.re5']]: 'light',
  [ListZigbeeDevice['dqhome.re6']]: 'light',
  [ListZigbeeDevice['lumi.sensor_ht']]: 'sensor', //"original" Xiaomi & Aqara Temperature/Humidity sensors
  [ListZigbeeDevice['lumi.weather']]: 'sensor', //"original" Xiaomi & Aqara Temperature/Humidity sensors
  [ListZigbeeDevice['lumi.sensor_motion']]: 'binary_sensor', //"original" Xiaomi Motion Sensor
  [ListZigbeeDevice['lumi.sensor_motion.aq2']]: 'binary_sensor', //Aqara Motion Sensor
  [ListZigbeeDevice['lumi.sensor_magnet']]: 'binary_sensor', // "original" Xiaomi  Door/Window contact sensors
  [ListZigbeeDevice['lumi.sensor_magnet.aq2']]: 'binary_sensor', // Aqara Door/Window contact sensors
  [ListZigbeeDevice['lumi.sensor_wleak.aq1']]: 'binary_sensor', // Aqara Leak sensor
  [ListZigbeeDevice['lumi.sensor_switch']]: 'binary_sensor', //"original" Xiaomi Button
  [ListZigbeeDevice['lumi.sensor_switch.aq']]: 'binary_sensor', // Aqara Button - ble-sigmesh WXKG11LM & WXKG12LM
  [ListZigbeeDevice['lumi.remote.b1acn01']]: 'binary_sensor', // Aqara Button - ble-sigmesh WXKG11LM & WXKG12LM
  [ListZigbeeDevice['lumi.sensor_switch.aq3']]: 'binary_sensor', // Aqara Button - ble-sigmesh WXKG11LM & WXKG12LM
  [ListZigbeeDevice['lumi.sensor_86sw1lu']]: 'binary_sensor', // Aqara 1-button Wireless Light Switch (2016)
  [ListZigbeeDevice['lumi.sensor_86sw']]: 'binary_sensor', //Aqara 2-button Wireless Light Switch (2016)
  [ListZigbeeDevice['lumi.remote.b186acn01']]: 'binary_sensor', //Aqara 1-button Wireless Light Switch (2018)
  [ListZigbeeDevice['lumi.remote.b286acn01']]: 'binary_sensor', //Aqara 2-button Wireless Light Switch (2018)
  [ListZigbeeDevice['lumi.ctrl_neutral1']]: 'switch', // Aqara Wall switch
  [ListZigbeeDevice['lumi.ctrl_neutral2']]: 'switch', // Aqara Wall switch
  [ListZigbeeDevice['lumi.sensor_natgas']]: 'binary_sensor', //MiJia Honeywell Gas Detector
  [ListZigbeeDevice['lumi.sensor_smoke']]: 'binary_sensor', //Xiaomi MiJia Honeywell Smoke Detector - model JTYJ-GD-01LM/BW
  [ListZigbeeDevice['lumi.plug']]: 'switch', // smart plug
  [ListZigbeeDevice['lumi.sensor_cube']]: 'sensor', //Mi Cube Controller
  [ListZigbeeDevice['lumi.curtain']]: 'cover', // Aqara smart curtain
};

export const ZigbeeDeviceTypeIconMapping: Record<ZigbeeModel, string> = {
  'dqhome.cur': undefined,
  'dqhome.di': undefined,
  'dqhome.re1': 'dqhome.re1',
  'dqhome.re2': 'dqhome.re2',
  'dqhome.re3': 'dqhome.re3',
  'dqhome.re4': 'dqhome.re4',
  'dqhome.re6': 'dqhome.re6',
  'lumi.ctrl_86plug.aq1': undefined,
  'lumi.ctrl_ln1.aq1': undefined,
  'lumi.ctrl_ln2.aq1': undefined,
  'lumi.ctrl_neutral1': undefined,
  'lumi.ctrl_neutral2': undefined,
  'lumi.curtain': undefined,
  'lumi.gas': undefined,
  'lumi.light.aqcn02': undefined,
  'lumi.plug': undefined,
  'lumi.relay.c2acn01': undefined,
  'lumi.remote.b186acn01': undefined,
  'lumi.remote.b1acn01': 'lumi.remote.b1acn01',
  'lumi.remote.b286acn01': 'lumi.remote.b286acn01',
  'lumi.sensor_86sw1': undefined,
  'lumi.sensor_86sw1lu': undefined,
  'lumi.sensor_86sw2': undefined,
  'lumi.sensor_86sw2Un': undefined,
  'lumi.sensor_cube': undefined,
  'lumi.sensor_ht': undefined,
  'lumi.sensor_magnet': undefined,
  'lumi.sensor_magnet.aq2': undefined,
  'lumi.sensor_motion': undefined,
  'lumi.sensor_motion.aq2': 'lumi.sensor_motion.aq2',
  'lumi.sensor_natgas': undefined,
  'lumi.sensor_smoke': undefined,
  'lumi.sensor_switch': undefined,
  'lumi.sensor_switch.aq2': undefined,
  'lumi.sensor_switch.aq3': undefined,
  'lumi.sensor_wleak.aq1': 'lumi.sensor_wleak.aq1',
  'lumi.vibration.aq1': 'lumi.vibration.aq1',
  'lumi.weather': 'lumi.weather',
  'unknown 1234560': undefined,
  'unknown 1234561': undefined,
  'unknown 1234562': undefined,
  'unknown 1234563': undefined,
  'unknown 1234564': undefined,
  'unknown 1234565': undefined,
  'unknown 1234566': undefined,
  'unknown 1234567': undefined,
  'unknown 12345670': undefined,
  'unknown 12345671': undefined,
  'unknown 12345672': undefined,
  'unknown 12345673': undefined,
  'unknown 12345674': undefined,
  'unknown 12345675': undefined,
  'unknown 12345676': undefined,
  'unknown 12345677': undefined,
  'unknown 12345678': undefined,
  'unknown 12345679': undefined,
  'unknown 1234567a': undefined,
  'unknown 1234567b': undefined,
  'unknown 1234567c': undefined,
  'unknown 1234567d': undefined,
  'unknown 1234568': undefined,
  'unknown 1234569': undefined,
  'unknown 123456a': undefined,
  'unknown 123456b': undefined,
  'unknown 123456c': undefined,
  'unknown 123456d': undefined,
  'unknown 123456e': undefined,
  'unknown 123456f': undefined,
  unknown: undefined

};

export enum ZigbeDeviceType {
  light = 'light',
  sensor = 'sensor',
  binary_sensor = 'binary_sensor',
  switch = 'switch',
  cover = 'cover',
}

export const ZigbeeDeviceTypeNameLabelMapping: Record<ZigbeDeviceType, string> = {
  binary_sensor: 'Cảm biến nhị phân',
  cover: 'Rèm cửa',
  light: 'Đèn',
  sensor: 'Cảm biến',
  switch: 'Công tắt'

};

export interface ZigbeeDevice {
  name: string;
  addr: number;
  model: ZigbeeModel;
}

export interface GetZigbeeDevice {
  [key: string]: ZigbeeDevice;
}

export interface ZbStateParams {
  addr: number;
  ep: number;
  state:
    {
      'name': string;
      val: any;
    };
}

export interface ZbInfor {
  name: string;
  maxEndPoint: number;
  icon: string;
  type: ZigbeDeviceType;
  description: string;
  classProvider: any;
}

