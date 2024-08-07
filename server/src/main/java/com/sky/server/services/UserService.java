package com.sky.server.services;

import com.sky.server.DTOs.UserDTO;
import com.sky.server.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public User addUser(UserDTO user);
    public User getUser(String email, String password);
    public List<User> getAllUsers();
}
