package com.sky.server.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class UserRecipesDTO {
    private List<String> savedRecipes;

    public UserRecipesDTO() {
    }

    public UserRecipesDTO(List<String> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }
}
