package com.sky.server.services;

import com.sky.server.entities.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

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
        //generate random string
        String sessionToken = UUID.randomUUID().toString();
        active_sessions.put(sessionToken, new SessionData(user));
        return sessionToken;
    }

    //keeps a session alive
    public boolean prodSession(String token) {
        //if there is no active session return false
        if(!active_sessions.containsKey(token)) return false;

        LocalDateTime lastAction = active_sessions.get(token).lastEvent;
        LocalDateTime now = LocalDateTime.now();

        //if user hasn't interacted with the session in five minutes remove from the map
        if(lastAction.plusMinutes(5).isBefore(now)) {
            active_sessions.remove(token);
            return false;
        }

        //if user hasn't timed out update the time that the user has left
        active_sessions.get(token).lastEvent = now;
        return true;
    }

    public LocalDateTime getSessionTime(String token) {
        if(active_sessions.containsKey(token)) {
            return active_sessions.get(token).lastEvent;
        }

        return null;
    }
}
