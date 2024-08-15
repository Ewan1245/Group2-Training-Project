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
public class SessionControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;


    @Test
    void testUserIsLoggedOut() throws Exception {
        RequestBuilder req = MockMvcRequestBuilders.get("/prodSession/fake_token");

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isUnauthorized();
        mvc.perform(req).andExpect(checkStatus);
    }

    @Test
    void testUserIsLoggedInAndLogsOut() throws Exception {
        //login a user
        UserCredDTO newPerson = new UserCredDTO("test3@test3", "password");
        String newPersonAsJSON = this.mapper.writeValueAsString(newPerson);
        RequestBuilder req = MockMvcRequestBuilders
                .post("/login")
                .content(newPersonAsJSON)
                .contentType(MediaType.APPLICATION_JSON);

        String token = mvc.perform(req).andReturn().getResponse().getContentAsString();

        //check user is logged in
        req = MockMvcRequestBuilders.get("/prodSession/" + token);
        Assertions.assertEquals("true", mvc.perform(req).andReturn().getResponse().getContentAsString());

        //logout the user
        req = MockMvcRequestBuilders.get("/endSession/" + token);
        mvc.perform(req);

        //check user is logged out
        req = MockMvcRequestBuilders.get("/prodSession/" + token);

        ResultMatcher checkStatus = MockMvcResultMatchers.status().isUnauthorized();
        mvc.perform(req).andExpect(checkStatus);
    }
}
