package com.sky.server.controllers;

import com.sky.server.DTOs.*;
import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import com.sky.server.exceptions.CannotLoginUserException;
import com.sky.server.services.RecipeService;
import com.sky.server.services.SessionHandler;
import com.sky.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class UserController {

    private UserService userService;

    private SessionHandler sessionHandler;

    private RecipeService recipeService;

    public UserController(UserService userService, SessionHandler sessionHandler, RecipeService recipeService) {
        this.userService = userService;
        this.sessionHandler = sessionHandler;
        this.recipeService = recipeService;
    }

    @PostMapping("/createUser")
    @ResponseStatus(HttpStatus.CREATED)
    public String createUser(@RequestBody UserDTO user) { //returns session token (used to confirm that a user is logged on) as a string
        //add the user
        User createdUser = userService.addUser(user);

        //generate session token
        return sessionHandler.createSession(createdUser);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String loginUser(@RequestBody UserCredDTO userCredentials) {
        User loggedInUser = userService.getUser(userCredentials.getEmail(), userCredentials.getPassword());

        if(loggedInUser == null) {
            throw new CannotLoginUserException();
        }

        return sessionHandler.createSession(loggedInUser);
    }


    @GetMapping("/getUserInfo/{token}")
    public UserInfoDTO getUserInfo(@PathVariable String token) {
        return sessionHandler.getUserData(token);
    }

    @GetMapping("/getUserSavedRecipes/{token}")
    public UserRecipesDTO getUserSavedRecipes(@PathVariable String token) {
        User user = sessionHandler.getUser(token);

        return userService.getUserRecipes(user.getEmail());
    }

    @PatchMapping("/saveRecipe/{recipe}/{token}")
    public void saveRecipeToUser(@PathVariable String token, @PathVariable String recipe) {
        User user = sessionHandler.getUser(token);
        Recipe r = recipeService.createRecipe(recipe, user);

        userService.saveRecipe(user.getEmail(), r);
    }


    //------For testing only---------- methods below to be removed for production
    @GetMapping("/getAllUsers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserWithRecipesDTO> getAllUsers() {
        return userService.getAllUsers();
    }


}