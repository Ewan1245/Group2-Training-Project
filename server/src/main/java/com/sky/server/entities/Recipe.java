package com.sky.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
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

    public void addToUsers(User newUser) {
        if(!users.contains(newUser)) this.users.add(newUser);
    }

    public void removeFromUsers(User user) {
        users.remove(user);
    }
}
