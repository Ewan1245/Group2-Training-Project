package com.sky.server.services;

import com.sky.server.DTOs.UserDTO;
import com.sky.server.DTOs.UserRecipesDTO;
import com.sky.server.DTOs.UserWithRecipesDTO;
import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import com.sky.server.exceptions.EmailAlreadyInUseException;
import com.sky.server.exceptions.UserNotFoundException;
import com.sky.server.repos.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceH2 implements UserService {
    private UserRepo userRepo;

    public UserServiceH2(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User addUser(UserDTO user) {
        //check for user with same email in the repo
        if(userRepo.findById(user.getEmail()).isPresent()) throw new EmailAlreadyInUseException();

        User new_user = new User(user);
        new_user = userRepo.save(new_user);
        return new_user;
    }

    @Override
    public User getUser(String email, String password) {
        Optional<User> user = userRepo.findById(email);
        if(user.isPresent()) {
            if(user.get().getPassword().equals(password)) return user.get();
        }
        return null;
    }

    @Override
    public List<UserWithRecipesDTO> getAllUsers() {
        return userRepo.findAll().stream().map(UserWithRecipesDTO::new).toList();
    }



    @Override
    public void saveRecipe(String email, Recipe recipe) {
        Optional<User> user = userRepo.findById(email);
        User u;
        if(user.isPresent()) {
            u = user.get();
            u.addToSavedRecipes(recipe);
        } else throw new UserNotFoundException();
        userRepo.save(u);
    }

    @Override
    public UserRecipesDTO getUserRecipes(String email) {
        Optional<User> o_user = userRepo.findById(email);
        if(o_user.isEmpty()) throw new UserNotFoundException();

        return new UserRecipesDTO(o_user.get().getSavedRecipes().stream().map(Recipe::getRecipeId).toList());
    }
}
