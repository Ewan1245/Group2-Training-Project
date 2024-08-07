package com.sky.server.entities;

import com.sky.server.DTOs.UserDTO;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname, surname, email, password; //password stored in hashed form

    public User() {}

    public User(UserDTO user) {
        this.firstname = user.getFirstname();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.password = user.getPassword();
    }

    public User(int id, String firstname, String surname, String email, String password) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
