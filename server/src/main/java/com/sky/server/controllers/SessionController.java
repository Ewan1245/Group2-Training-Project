package com.sky.server.controllers;

import com.sky.server.DTOs.SessionVisualisedDTO;
import com.sky.server.services.SessionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class SessionController {
    private SessionHandler sessionHandler;

    public SessionController(SessionHandler sessionHandler) {
        this.sessionHandler = sessionHandler;
    }

    @PatchMapping("/prodSession/{token}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void prodSession(@PathVariable String token) {
        sessionHandler.prodSession(token);
    }

    @GetMapping("/endSession/{token}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void endSession(@PathVariable String token) {
        sessionHandler.endSession(token);
    }


    //------For testing only---------- methods below to be removed for production

    @GetMapping("/getSessionInfo/{token}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public LocalDateTime getSessionInfo(@PathVariable String token) {
        return sessionHandler.getSessionTime(token);
    }

    @GetMapping("/getAllActiveSessions")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<SessionVisualisedDTO> getActiveSessions() {
        return sessionHandler.getActiveSessions();
    }
}
