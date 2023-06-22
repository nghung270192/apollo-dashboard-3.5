package org.thingsboard.server.controller.apollo.loragateway.model;


public class GetDeviceInfor  {
    private String deviceId;
    private String token;

    public GetDeviceInfor() {
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
