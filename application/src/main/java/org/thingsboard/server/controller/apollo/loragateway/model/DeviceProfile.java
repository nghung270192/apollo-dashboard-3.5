package org.thingsboard.server.controller.apollo.loragateway.model;

import lombok.Data;

@Data
public class DeviceProfile {
    private String name;
    private String macAddress;
    private String creationDate;
    private String warrantyDate;
    private String latitude;
    private String longitude;
    private String hardwareVersion;
    private String softwareVersion;
    private String bootLoaderVersion;
    private String eepromVersion;
    private String testSpecID;
    private String manufacturer;


   public void setName(String name){
       this.name = name;
   }
   public String getName(){
       return this.name;
   }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getWarrantyDate() {
        return warrantyDate;
    }

    public void setWarrantyDate(String warrantyDate) {
        this.warrantyDate = warrantyDate;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getHardwareVersion() {
        return hardwareVersion;
    }

    public void setHardwareVersion(String hardwareVersion) {
        this.hardwareVersion = hardwareVersion;
    }

    public String getSoftwareVersion() {
        return softwareVersion;
    }

    public void setSoftwareVersion(String softwareVersion) {
        this.softwareVersion = softwareVersion;
    }

    public String getBootLoaderVersion() {
        return bootLoaderVersion;
    }

    public void setBootLoaderVersion(String bootLoaderVersion) {
        this.bootLoaderVersion = bootLoaderVersion;
    }

    public String getEepromVersion() {
        return eepromVersion;
    }

    public void setEepromVersion(String eepromVersion) {
        this.eepromVersion = eepromVersion;
    }

    public String getTestSpecID() {
        return testSpecID;
    }

    public void setTestSpecID(String testSpecID) {
        this.testSpecID = testSpecID;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }
}