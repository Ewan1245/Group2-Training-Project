package com.sky.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.List;

@Entity
public class Recipe {
    @Id
    private String recipeId;

    @ManyToMany(mappedBy = "savedRecipes")
    private List<User> users;

    public Recipe(String recipeId, List<User> users) {
        this.recipeId = recipeId;
        this.users = users;
    }

    public Recipe() {
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addToUsers(User newUser) {
        if(!users.contains(newUser)) this.users.add(newUser);
    }

    public void removeFromUsers(User user) {
        users.remove(user);
    }
}
