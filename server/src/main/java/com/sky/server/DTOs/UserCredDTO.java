package com.sky.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserCredDTO {
    private String email, password;

    public UserCredDTO() {}

    public UserCredDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
