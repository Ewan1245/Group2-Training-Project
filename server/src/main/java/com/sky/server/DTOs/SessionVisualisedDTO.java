package com.sky.server.DTOs;

public class SessionVisualisedDTO {
    private String token, name;

    public SessionVisualisedDTO() {
    }

    public SessionVisualisedDTO(String token, String name) {
        this.token = token;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
