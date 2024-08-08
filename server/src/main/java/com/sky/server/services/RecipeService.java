package com.sky.server.services;

import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface RecipeService {
    public Recipe createRecipe(String recipe, User user);
    public Recipe getRecipe(String recipe);
}
