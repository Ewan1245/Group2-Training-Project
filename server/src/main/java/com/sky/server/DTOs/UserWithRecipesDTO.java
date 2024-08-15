package com.sky.server.DTOs;

import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
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
}
