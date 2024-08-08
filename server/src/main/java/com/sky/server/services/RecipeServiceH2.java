package com.sky.server.services;

import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import com.sky.server.repos.RecipeRepo;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceH2 implements RecipeService {
    private RecipeRepo repo;

    public RecipeServiceH2(RecipeRepo repo) {
        this.repo = repo;
    }

    @Override
    public Recipe createRecipe(String recipe, User user) {
        //check if recipe already exists in the repo
        Optional<Recipe> or = repo.findById(recipe);
        if(or.isPresent()) {
            List<User> users = or.get().getUsers();
            users.add(user);
            or.get().setUsers(users);
            repo.save(or.get());
            return or.get();
        }

        //otherwise add to the repo
        List<User> users = new LinkedList<>();
        users.add(user);
        Recipe r = new Recipe(recipe, users);
        return repo.save(r);
    }

    @Override
    public Recipe getRecipe(String recipe) {
        return null;
    }
}
