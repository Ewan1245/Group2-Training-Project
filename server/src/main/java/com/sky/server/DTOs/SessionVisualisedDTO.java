package com.sky.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SessionVisualisedDTO {
    private String token, name;

    public SessionVisualisedDTO() {
    }

    public SessionVisualisedDTO(String token, String name) {
        this.token = token;
        this.name = name;
    }
}
