package com.sky.server.controllers;

import com.sky.server.DTOs.UserDTO;
import com.sky.server.entities.User;
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

    public UserController(UserService userService, SessionHandler sessionHandler) {
        this.userService = userService;
        this.sessionHandler = sessionHandler;
    }

    @PostMapping("/createUser")
    @ResponseStatus(HttpStatus.CREATED)
    public String createUser(@RequestBody UserDTO user) { //returns session token (used to confirm that a user is logged on) as a string
        //add the user
        User created_user = userService.addUser(user);

        //generate session token
        return sessionHandler.createSession(created_user);
    }

    @PatchMapping("/prodSession/{token}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public boolean prodSession(@PathVariable String token) {
        return sessionHandler.prodSession(token);
    }

    //------For testing only---------- methods below to be removed for production
    @GetMapping("/getAllUsers")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/getSessionInfo/{token}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public LocalDateTime getSessionInfo(@PathVariable String token) {
        return sessionHandler.getSessionTime(token);
    }
}
