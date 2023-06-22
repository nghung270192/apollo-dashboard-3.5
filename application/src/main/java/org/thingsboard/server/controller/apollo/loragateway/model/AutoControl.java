package org.thingsboard.server.controller.apollo.loragateway.model;

import lombok.Data;

import java.util.List;

@Data
public class AutoControl {
    private String Token;
    private List<String> DeviceAddressStr;
    private List<AutoControlSettingDTOs> AutoControlSettingDTOs;

    public AutoControl() {
    }

    public AutoControl(AutoControl autoControl) {
        this.Token = autoControl.getToken();
        this.DeviceAddressStr = autoControl.getDeviceAddressStr();
        this.AutoControlSettingDTOs = autoControl.AutoControlSettingDTOs;
    }

    public AutoControl(String token,
                       List<String> deviceAddressStr,
                       List<AutoControlSettingDTOs> autoControlSettingDTOs) {
        Token = token;
        DeviceAddressStr = deviceAddressStr;
        AutoControlSettingDTOs = autoControlSettingDTOs;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }

    public List<String> getDeviceAddressStr() {
        return DeviceAddressStr;
    }

    public void setDeviceAddressStr(List<String> deviceAddressStr) {
        DeviceAddressStr = deviceAddressStr;
    }

    public List< AutoControlSettingDTOs> getAutoControlSettingDTOs() {
        return AutoControlSettingDTOs;
    }

    public void setAutoControlSettingDTOs(List< AutoControlSettingDTOs> autoControlSettingDTOs) {
        AutoControlSettingDTOs = autoControlSettingDTOs;
    }
}