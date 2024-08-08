package com.sky.server.DTOs;

import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;

import java.util.List;

public class UserWithRecipesDTO {
    private String firstname, surname, email, password;

    List<String> recipes;

    public UserWithRecipesDTO() {}

    public UserWithRecipesDTO(String firstname, String surname, String email, String password, List<String> recipes) {
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.recipes = recipes;
    }

    public UserWithRecipesDTO(User user) {
        this.firstname = user.getFirstname();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.recipes = user.getSavedRecipes().stream().map(Recipe::getRecipeId).toList();
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

    public List<String> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<String> recipes) {
        this.recipes = recipes;
    }
}
