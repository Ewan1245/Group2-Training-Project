package com.sky.server.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sky.server.DTOs.UserCredDTO;
import com.sky.server.DTOs.UserDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = {"classpath:test-schema.sql", "classpath:test-data.sql"})
@ActiveProfiles("test")
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    void testCreate() throws Exception {
        UserDTO newPerson = new UserDTO("Test", "Person", "test.person@test.uk", "qwertyuiop", false);
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/createUser")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isCreated();


        this.mvc.perform(req).andExpect(checkStatus); // performs the request and checks the response

        //check that this adds a person to the getAllUsersArray
        req = MockMvcRequestBuilders.get("/getAllUsers");
        MvcResult res = mvc.perform(req).andReturn();

        Assertions.assertTrue(res.getResponse().getContentAsString().matches("\\[\\{.*}]"));

    }

    @Test
    void testLogin() throws Exception {
        UserCredDTO newPerson = new UserCredDTO("test1@test", "password");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isAccepted();


        this.mvc.perform(req).andExpect(checkStatus); // performs the request and checks the response

        //check that this creates a session
        req = MockMvcRequestBuilders.get("/getAllActiveSessions");
        MvcResult res = mvc.perform(req).andReturn();

        Assertions.assertTrue(res.getResponse().getContentAsString().matches("\\[\\{.*}]"));
    }

    @Test
    void testLoginFailsWrongPassword() throws Exception {
        UserCredDTO newPerson = new UserCredDTO("test1@test", "wrong_password");

        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isUnauthorized();


        this.mvc.perform(req).andExpect(checkStatus); // performs the request and checks the response
    }

    @Test
    void testLoginFailsWrongEmail() throws Exception {
        UserCredDTO newPerson = new UserCredDTO("wrong_test1@test", "password");

        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isUnauthorized();


        this.mvc.perform(req).andExpect(checkStatus); // performs the request and checks the response
    }

    @Test
    void testCreateDuplicateEmail() throws Exception {
        UserCredDTO newPerson = new UserCredDTO("test1@test", "new_password");

        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isUnauthorized();
        this.mvc.perform(req).andExpect(checkStatus); // performs the request and checks the response
    }


    @Test
    void testUserIsAdminTrue() throws Exception {
        //login the user
        UserCredDTO newPerson = new UserCredDTO("test2@test", "password");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);
        String token = mvc.perform(req).andReturn().getResponse().getContentAsString();

        //check that the user is an admin
        req = MockMvcRequestBuilders.get("/isAdmin/" + token);
        Assertions.assertEquals("true", mvc.perform(req).andReturn().getResponse().getContentAsString());

        //check that token is in the active sessions
        req = MockMvcRequestBuilders.get("/getAllActiveSessions");
        MvcResult res = mvc.perform(req).andReturn();

        Assertions.assertTrue(res.getResponse().getContentAsString().matches("\\[\\{\"token\":\"" + token + "\".*}.*]"));
    }

    @Test
    void testUserIsAdminFalse() throws Exception {
        //login the user
        UserCredDTO newPerson = new UserCredDTO("test3@test", "password");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);
        String token = mvc.perform(req).andReturn().getResponse().getContentAsString();

        //check that the user is an admin
        req = MockMvcRequestBuilders.get("/isAdmin/" + token);
        Assertions.assertEquals("false", mvc.perform(req).andReturn().getResponse().getContentAsString());
    }

    @Test
    void testGetUserInfo() throws Exception {
        //login the user
        UserCredDTO newPerson = new UserCredDTO("test1@test1", "password");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);
        String token = mvc.perform(req).andReturn().getResponse().getContentAsString();

        //check that getUserInfo returns the correct email in the json
        req = MockMvcRequestBuilders.get("/getUserInfo/" + token);
        Assertions.assertTrue(mvc.perform(req).andReturn().getResponse().getContentAsString().matches("\\{.*\"email\":\"test1@test1\".*}"));
    }

    @Test
    void testSaveUnsaveAndGetRecipes() throws Exception {
        //login the user
        UserCredDTO newPerson = new UserCredDTO("test2@test2", "password");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);
        String token = mvc.perform(req).andReturn().getResponse().getContentAsString();

        req = MockMvcRequestBuilders.patch("/saveRecipe/recipe_id/" + token);
        mvc.perform(req);

        req = MockMvcRequestBuilders.get("/getUserSavedRecipes/" + token);
        Assertions.assertTrue(mvc.perform(req).andReturn().getResponse().getContentAsString().matches("\\{.*\\[\"recipe_id\".*"));

        req = MockMvcRequestBuilders.patch("/unsaveRecipe/recipe_id/" + token);
        mvc.perform(req);

        req = MockMvcRequestBuilders.get("/getUserSavedRecipes/" + token);
        Assertions.assertTrue(mvc.perform(req).andReturn().getResponse().getContentAsString().matches("\\{.*\\[].*"));
    }
}
