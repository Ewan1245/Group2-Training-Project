package com.sky.server.controllers;

import com.sky.server.DTOs.*;
import com.sky.server.config.SecurityConfig;
import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import com.sky.server.exceptions.CannotLoginUserException;
import com.sky.server.services.RecipeService;
import com.sky.server.services.SessionHandler;
import com.sky.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class UserController {

    private UserService userService;

    private SessionHandler sessionHandler;

    private RecipeService recipeService;

    private final SecurityConfig securityConfig;

    public UserController(UserService userService, SessionHandler sessionHandler, RecipeService recipeService, SecurityConfig securityConfig) {
        this.userService = userService;
        this.sessionHandler = sessionHandler;
        this.recipeService = recipeService;
        this.securityConfig = securityConfig;
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createUser")
    @ResponseStatus(HttpStatus.CREATED)
    public String createUser(@RequestBody UserDTO user) { //returns session token (used to confirm that a user is logged on) as a string
        // hash password
        String pepperedPassword = user.getPassword() + securityConfig.getPepper();
        String salt = BCrypt.gensalt();
        String hashedPassword = BCrypt.hashpw(pepperedPassword, salt);

        user.setPassword(hashedPassword);

        //add the user
        User createdUser = userService.addUser(user);

        //generate session token
        return sessionHandler.createSession(createdUser);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String loginUser(@RequestBody UserCredDTO userCredentials) {
        User loggedInUser = userService.getUser(userCredentials.getEmail(), userCredentials.getPassword());

        if(loggedInUser == null) {
            throw new CannotLoginUserException();
        }

        return sessionHandler.createSession(loggedInUser);
    }

    @GetMapping("/isAdmin/{token}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public boolean userIsAdmin(@PathVariable String token) { return sessionHandler.isAdmin(token); }


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

    @PatchMapping("/unsaveRecipe/{recipe}/{token}")
    public void unsaveRecipeToUser(@PathVariable String token, @PathVariable String recipe) {
        User user = sessionHandler.getUser(token);
        Recipe r = recipeService.deleteRecipe(recipe, user);

        userService.removeRecipe(user.getEmail(), r);
    }


    //------For testing only---------- methods below to be removed for production
    @GetMapping("/getAllUsers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<UserWithRecipesDTO> getAllUsers() {
        return userService.getAllUsers();
    }


}
