package org.thingsboard.server.controller.apollo.loragateway.model;

public class Login {
    private String Username;
    private String Password;

    public Login() {
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
