package org.thingsboard.server.controller.apollo.loragateway.model;

import lombok.Data;

@Data
public class AutoControlSettingDTOs {
    private Boolean IsActive;
    private Boolean Power;
    private String Time;
    private Number Dimming;
    private Boolean IsUsingSensor;

    public AutoControlSettingDTOs( ) {
    }

    public AutoControlSettingDTOs(Boolean isActive,
                                  Boolean power,
                                  String time,
                                  Number dimming,
                                  Boolean isUsingSensor) {
        IsActive = isActive;
        Power = power;
        Time = time;
        Dimming = dimming;
        IsUsingSensor = isUsingSensor;
    }

    public Boolean getActive() {
        return IsActive;
    }

    public void setActive(Boolean active) {
        IsActive = active;
    }

    public Boolean getPower() {
        return Power;
    }

    public void setPower(Boolean power) {
        Power = power;
    }

    public String getTime() {
        return Time;
    }

    public void setTime(String time) {
        Time = time;
    }

    public Number getDimming() {
        return Dimming;
    }

    public void setDimming(Number dimming) {
        Dimming = dimming;
    }

    public Boolean getUsingSensor() {
        return IsUsingSensor;
    }

    public void setUsingSensor(Boolean usingSensor) {
        IsUsingSensor = usingSensor;
    }
}
