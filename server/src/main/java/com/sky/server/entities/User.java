package com.sky.server.entities;

import com.sky.server.DTOs.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter
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

    public void addToSavedRecipes(Recipe newRecipe) {
        if(!savedRecipes.contains(newRecipe)) this.savedRecipes.add(newRecipe);
    }

    public void removeFromSavedRecipes(Recipe r) {
        savedRecipes.remove(r);
    }
}
