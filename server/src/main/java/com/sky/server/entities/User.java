package com.sky.server.entities;

import com.sky.server.DTOs.UserDTO;
import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String email;

    private boolean isAdmin;

    private String firstname, surname, password; //password stored in hashed form

    @ManyToMany
    private List<Recipe> savedRecipes;

    public User() {}

    public User(String email, boolean isAdmin, String firstname, String surname, String password, List<Recipe> savedRecipes) {
        this.email = email;
        this.isAdmin = isAdmin;
        this.firstname = firstname;
        this.surname = surname;
        this.password = password;
        this.savedRecipes = savedRecipes;
    }

    public User(UserDTO user) {
        this(user.getEmail(), user.isAdmin(), user.getFirstname(), user.getSurname(), user.getPassword(), new LinkedList<>());
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

    public List<Recipe> getSavedRecipes() {
        return savedRecipes;
    }

    public void setSavedRecipes(List<Recipe> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public void addToSavedRecipes(Recipe newRecipe) {
        if(!savedRecipes.contains(newRecipe)) this.savedRecipes.add(newRecipe);
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public void removeFromSavedRecipes(Recipe r) {
        savedRecipes.remove(r);
    }
}
