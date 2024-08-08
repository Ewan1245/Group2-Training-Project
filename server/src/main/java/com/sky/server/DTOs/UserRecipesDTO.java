package com.sky.server.DTOs;

import java.util.List;

public class UserRecipesDTO {
    private List<String> savedRecipes;

    public UserRecipesDTO() {
    }

    public UserRecipesDTO(List<String> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public List<String> getSavedRecipes() {
        return savedRecipes;
    }

    public void setSavedRecipes(List<String> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }
}
