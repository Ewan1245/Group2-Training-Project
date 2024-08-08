package com.sky.server.services;

import com.sky.server.DTOs.SessionVisualisedDTO;
import com.sky.server.DTOs.UserInfoDTO;
import com.sky.server.DTOs.UserRecipesDTO;
import com.sky.server.entities.User;
import com.sky.server.exceptions.SessionAlreadyActiveException;
import com.sky.server.exceptions.SessionNotActiveException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class SessionHandler {
    private static class SessionData {
        public LocalDateTime lastEvent;
        public User user;

        public SessionData(User user) {
            lastEvent = LocalDateTime.now();
            this.user = user;
        }
    }
    private HashMap<String, SessionData> active_sessions;

    public SessionHandler() {
        active_sessions = new HashMap<>();
    }

    public String createSession(User user) {
        //check if the user has an active session
        if(active_sessions.values().stream().anyMatch(data -> data.user.getEmail().equals(user.getEmail()))) throw new SessionAlreadyActiveException();

        //generate random string
        String sessionToken = UUID.randomUUID().toString();
        active_sessions.put(sessionToken, new SessionData(user));
        return sessionToken;
    }

    public UserInfoDTO getUserData(String token) {
        //prod the session to keep it alive
        prodSession(token);

        User user = active_sessions.get(token).user;
        return new UserInfoDTO(user.getFirstname(), user.getSurname(), user.getEmail());
    }



    public User getUser(String token) {
        prodSession(token);

        return active_sessions.get(token).user;
    }

    //keeps a session alive
    public void prodSession(String token) {
        //if there is no active session return false
        if(!active_sessions.containsKey(token)) throw new SessionNotActiveException();

        LocalDateTime lastAction = active_sessions.get(token).lastEvent;
        LocalDateTime now = LocalDateTime.now();

        //if user hasn't interacted with the session in five minutes remove from the map
        if(lastAction.plusMinutes(5).isBefore(now)) {
            active_sessions.remove(token);
            throw new SessionNotActiveException();
        }

        //if user hasn't timed out update the time that the user has left
        active_sessions.get(token).lastEvent = now;
    }

    public void endSession(String token) {
        if(!active_sessions.containsKey(token)) throw new SessionNotActiveException();

        active_sessions.remove(token);
    }

    public LocalDateTime getSessionTime(String token) {
        if(active_sessions.containsKey(token)) {
            return active_sessions.get(token).lastEvent;
        }

        throw new SessionNotActiveException();
    }

    public List<SessionVisualisedDTO> getActiveSessions() {
        return active_sessions.entrySet().stream().map(e -> {
            return new SessionVisualisedDTO(e.getKey(), e.getValue().user.getEmail());
        }).toList();
    }
}
