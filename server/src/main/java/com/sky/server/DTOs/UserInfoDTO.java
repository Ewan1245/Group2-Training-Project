package com.sky.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserInfoDTO {

    private String firstname, surname, email;

    public UserInfoDTO() {
    }

    public UserInfoDTO(String firstname, String surname, String email) {
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
    }
}
