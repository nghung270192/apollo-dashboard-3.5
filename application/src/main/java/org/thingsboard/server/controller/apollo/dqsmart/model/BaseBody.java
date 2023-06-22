package org.thingsboard.server.controller.apollo.dqsmart.model;

import lombok.Data;

@Data
public class BaseBody {
    private String Token;
    private String BaseUrl;

    public BaseBody() {
    }

    public BaseBody(String token, String baseUrl) {
        Token = token;
        BaseUrl = baseUrl;
    }

    public BaseBody(BaseBody baseBody) {
        Token = baseBody.Token;
        BaseUrl = baseBody.BaseUrl;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }

    public String getBaseUrl() {
        return BaseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        BaseUrl = baseUrl;
    }
}