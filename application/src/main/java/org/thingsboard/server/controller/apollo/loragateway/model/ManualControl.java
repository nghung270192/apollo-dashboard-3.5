package org.thingsboard.server.controller.apollo.loragateway.model;

import lombok.Data;

import java.util.List;

@Data
public class ManualControl {
    private String Token;
    private List<String> DeviceAddressStr;
    private Boolean Power;
    private Number Dimming;
    private Boolean IsUsingSensor;


    public ManualControl(){

    }
    public ManualControl(String Token,
                         List<String> DeviceAddressStr,
                         Boolean Power,
                         Number Dimming,
                         Boolean IsUsingSensor){
        this.Token = Token;
        this.DeviceAddressStr = DeviceAddressStr;
        this.Power = Power;
        this.Dimming = Dimming;
        this.IsUsingSensor = IsUsingSensor;

    }
}
