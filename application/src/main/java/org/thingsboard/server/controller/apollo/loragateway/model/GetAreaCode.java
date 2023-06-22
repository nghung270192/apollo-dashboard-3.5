package org.thingsboard.server.controller.apollo.loragateway.model;

import lombok.Data;

@Data
public class GetAreaCode {
    private String ProjectCode;
    private String Token;

    public GetAreaCode(String projectCode, String token) {
        ProjectCode = projectCode;
        Token = token;
    }

    public String getProjectCode() {
        return ProjectCode;
    }

    public void setProjectCode(String projectCode) {
        ProjectCode = projectCode;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }
}
