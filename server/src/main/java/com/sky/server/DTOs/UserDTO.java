package com.sky.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDTO {
    private String firstname, surname, email, password;
    private boolean isAdmin;

    public UserDTO() {}

    public UserDTO(String firstname, String surname, String email, String password, boolean isAdmin) {
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}
