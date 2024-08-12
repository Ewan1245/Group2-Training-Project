package com.sky.server.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sky.server.DTOs.UserCredDTO;
import com.sky.server.DTOs.UserDTO;
import com.sky.server.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:test-schema.sql", "classpath:test-data.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles("test")
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;


    @Test
    void testCreate() throws Exception {
        UserDTO newPerson = new UserDTO("Test", "Person", "test.person@test.uk", "qwertyuiop");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/createUser")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isCreated();


        this.mvc.perform(req).andExpect(checkStatus); // performs the request and checks the response

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


}
