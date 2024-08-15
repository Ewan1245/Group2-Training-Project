package com.sky.server.services;

import com.sky.server.DTOs.UserDTO;
import com.sky.server.DTOs.UserRecipesDTO;
import com.sky.server.DTOs.UserWithRecipesDTO;
import com.sky.server.entities.Recipe;
import com.sky.server.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public User addUser(UserDTO user);
    public User getUser(String email, String password);
    public List<UserWithRecipesDTO> getAllUsers();
    public UserRecipesDTO getUserRecipes(String email);
    public void saveRecipe(String email, Recipe recipe);
    public User updateUserInfo(User user, UserDTO userInfo);
    public void removeRecipe(String email, Recipe r);
}
