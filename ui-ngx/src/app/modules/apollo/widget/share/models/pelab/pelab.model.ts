export interface DeviceProfile {
  'name': string;
  'macAddress': string;
  'creationDate': string;
  'warrantyDate': string;
  'latitude': string;
  'longitude': string;
  'hardwareVersion': string;
  'softwareVersion': string;
  'bootLoaderVersion': string;
  'eepromVersion': string;
  'testSpecID': string;
  'manufacturer': string;

  [key: string]: any;
}

export class DeviceProfileImpl implements DeviceProfile {
  bootLoaderVersion: string;
  creationDate: string;
  eepromVersion: string;
  hardwareVersion: string;
  latitude: string;
  longitude: string;
  macAddress: string;
  manufacturer: string;
  name: string;
  softwareVersion: string;
  testSpecID: string;
  warrantyDate: string;

  constructor(deviceProfileImpl: DeviceProfileImpl) {
    this.bootLoaderVersion = deviceProfileImpl?.bootLoaderVersion;
    this.creationDate = deviceProfileImpl?.creationDate;
    this.eepromVersion = deviceProfileImpl?.eepromVersion;
    this.hardwareVersion = deviceProfileImpl?.hardwareVersion;
    this.latitude = deviceProfileImpl?.latitude;
    this.longitude = deviceProfileImpl?.longitude;
    this.macAddress = deviceProfileImpl?.macAddress;
    this.manufacturer = deviceProfileImpl?.manufacturer;
    this.name = deviceProfileImpl?.name;
    this.softwareVersion = deviceProfileImpl?.softwareVersion;
    this.testSpecID = deviceProfileImpl?.testSpecID;
    this.warrantyDate = deviceProfileImpl?.warrantyDate;
  }
}

export interface PelabEntity {

  'deviceName': string;
  'deviceProfile': DeviceProfile;
  'deviceStatus': number;
  'deviceStatusDesc': string;
  'power': null;
  'energy': null;
  'relatedCabinet': string;
  'deviceAdressStr': string;
  'signalStrengh': string;
  'dimmingValue': number;
  'controlMode': number;
  'autoControlCmd': string;
  'manualControlCmd': string;
  'lastEvent': string;
  'waterMeterCount': string;
  'battery': string;
  'waterMeterCountLastMonth': string;
  'locationName': string;
  'numberOfActiveAlarm': number;
  'deviceType': string;

}


export class PelabEntityImpl implements PelabEntity {
  autoControlCmd: string;
  battery: string;
  controlMode: number;
  deviceAdressStr: string;
  deviceName: string;
  deviceProfile: DeviceProfileImpl;
  deviceStatus: number;
  deviceStatusDesc: string;
  deviceType: string;
  dimmingValue: number;
  energy: null;
  lastEvent: string;
  locationName: string;
  manualControlCmd: string;
  numberOfActiveAlarm: number;
  power: null;
  relatedCabinet: string;
  signalStrengh: string;
  waterMeterCount: string;
  waterMeterCountLastMonth: string;

  constructor(pelabEntity: PelabEntity) {
    this.autoControlCmd = pelabEntity?.autoControlCmd;
    this.battery = pelabEntity?.battery;
    this.controlMode = pelabEntity?.controlMode;
    this.deviceAdressStr = pelabEntity?.deviceAdressStr;
    this.deviceName = pelabEntity?.deviceName;
    this.deviceProfile = new DeviceProfileImpl(pelabEntity?.deviceProfile);
    this.deviceStatus = pelabEntity?.deviceStatus;
    this.deviceStatusDesc = pelabEntity?.deviceStatusDesc;
    this.deviceType = pelabEntity?.deviceType;
    this.dimmingValue = pelabEntity?.dimmingValue;
    this.energy = pelabEntity?.energy;
    this.lastEvent = pelabEntity?.lastEvent;
    this.locationName = pelabEntity?.locationName;
    this.manualControlCmd = pelabEntity?.manualControlCmd;
    this.numberOfActiveAlarm = pelabEntity?.numberOfActiveAlarm;
    this.power = pelabEntity?.power;
    this.relatedCabinet = pelabEntity?.relatedCabinet;
    this.signalStrengh = pelabEntity?.signalStrengh;
    this.waterMeterCount = pelabEntity?.waterMeterCount;
    this.waterMeterCountLastMonth = pelabEntity?.waterMeterCountLastMonth;
  }
}


export interface PelabProject {
  'id': 0;
  'projectName': 'Điện Quang';
  'projectCode': 'DQ';
  'projectDescription': null;
  'isActive': 'True';
}

export interface PelabLogin {
  'Username': string;
  'Password': string;
}

export interface PelabLoginResult {
  'userName': string;
  'fullName': string;
  'address': string;
  'devices': Array<string>;
  'token': string;
  'roleName': string;
  'projects': Array<PelabProject>;
}

export class PelabLoginResultImpl implements PelabLoginResult {
  address: string;
  devices: Array<string> = [];
  fullName: string;
  projects: Array<PelabProject> = [];
  roleName: string;
  token: string;
  userName: string;

  constructor(loginResult: PelabLoginResult) {
    this.address = loginResult?.address;
    this.devices = loginResult?.devices;
    this.fullName = loginResult?.fullName;
    this.projects = loginResult?.projects;
    this.roleName = loginResult?.roleName;
    this.token = loginResult?.token;
    this.userName = loginResult?.userName;
  }
}


export interface PelabManualControl {
  'Token': string;
  'DeviceAddressStr': Array<string>;
  'Power': boolean;
  'Dimming': number;
  'IsUsingSensor': boolean;
}

export class PelabManualControlImpl implements PelabManualControl {
  private '_Token' = '';
  private '_DeviceAddressStr': Array<string> = [];
  private '_Power' = false;
  private '_Dimming' = 0;
  private '_IsUsingSensor' = false;


  constructor(pelabManualControl?: PelabManualControl) {
    if (pelabManualControl) {
      this._Token = pelabManualControl?.Token;
      this._DeviceAddressStr = pelabManualControl?.DeviceAddressStr;
      this._Power = pelabManualControl?.Power;
      this._Dimming = pelabManualControl?.Dimming;
      this._IsUsingSensor = pelabManualControl?.IsUsingSensor;
    }
  }

  get Token(): string {
    return this._Token;
  }

  set Token(value: string) {
    this._Token = value;
  }

  get DeviceAddressStr(): Array<string> {
    return this._DeviceAddressStr;
  }

  set DeviceAddressStr(value: Array<string>) {
    this._DeviceAddressStr = value;
  }

  get Power(): boolean {
    return this._Power;
  }

  set Power(value: boolean) {
    this._Power = value;
  }

  get Dimming(): number {
    return this._Dimming;
  }

  set Dimming(value: number) {
    this._Dimming = value;
  }

  get IsUsingSensor(): boolean {
    return this._IsUsingSensor;
  }

  set IsUsingSensor(value: boolean) {
    this._IsUsingSensor = value;
  }

  toData(): PelabManualControl {
    const data: PelabManualControl = {
      DeviceAddressStr: this.DeviceAddressStr,
      Dimming: this.Dimming,
      IsUsingSensor: this.IsUsingSensor,
      Power: this.Power,
      Token: this.Token
    };
    return data;
  }
}


export interface AutoControlSettingDTOs {
  'IsActive': boolean;
  'Power': boolean;
  'Time': string;//"21:20",
  'Dimming': number;
  'IsUsingSensor': boolean;
}

export class AutoControlSettingDTOsImpl implements AutoControlSettingDTOs {
  Dimming = 0;
  IsActive = false;
  IsUsingSensor = false;
  Power = false;
  Time = '';

  constructor(autoControlSettingDTOs?: AutoControlSettingDTOs) {
    if (autoControlSettingDTOs) {
      this.Dimming = autoControlSettingDTOs?.Dimming;
      this.IsActive = autoControlSettingDTOs?.IsActive;
      this.IsUsingSensor = autoControlSettingDTOs?.IsUsingSensor;
      this.Power = autoControlSettingDTOs?.Power;
      this.Time = autoControlSettingDTOs?.Time;
    }
  }

  toData(): AutoControlSettingDTOs {
    return {
      Dimming: this.Dimming,
      IsActive: this.IsActive,
      IsUsingSensor: this.IsUsingSensor,
      Power: this.Power,
      Time: this.Time
    };
  }
}

export interface PelabAutoControl {
  'Token': string;
  'DeviceAddressStr': Array<string>;
  'AutoControlSettingDTOs': Array<AutoControlSettingDTOs>;
}

export class PelabAutoControlImpl implements PelabAutoControl {
  AutoControlSettingDTOs: Array<AutoControlSettingDTOsImpl> = [];
  DeviceAddressStr: Array<string>;
  Token: string;


  constructor(pelabAutoControl?: PelabAutoControl) {
    if (pelabAutoControl) {
      if (pelabAutoControl?.AutoControlSettingDTOs && Array.isArray(pelabAutoControl?.AutoControlSettingDTOs)) {
        this.AutoControlSettingDTOs = pelabAutoControl?.AutoControlSettingDTOs.map(res => new AutoControlSettingDTOsImpl(res));
      }
      this.DeviceAddressStr = pelabAutoControl?.DeviceAddressStr;
      this.Token = pelabAutoControl?.Token;
    }
  };

  toData(): PelabAutoControl {
    return {
      AutoControlSettingDTOs: this.AutoControlSettingDTOs.map(res => res.toData()),
      DeviceAddressStr: this.DeviceAddressStr,
      Token: this.Token

    };
  }
}
