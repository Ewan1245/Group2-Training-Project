package com.sky.server.services;

import com.sky.server.DTOs.UserDTO;
import com.sky.server.entities.User;
import com.sky.server.repos.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceH2 implements UserService {
    private UserRepo userRepo;

    public UserServiceH2(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User addUser(UserDTO user) {
        //TODO: add check for user with same email in the repo
        User new_user = new User(user);
        new_user = userRepo.save(new_user);
        return new_user;
    }

    @Override
    public User getUser(String email, String password) {
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
