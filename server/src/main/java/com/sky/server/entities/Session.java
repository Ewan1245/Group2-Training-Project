package com.sky.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;

@Entity
public class Session {

    @Id
    public String sessionId;

    public LocalDateTime lastEvent;

    @OneToOne()
    public User user;

    public Session() {}

    public Session(String sessionId, LocalDateTime lastEvent, User user) {
        this.sessionId = sessionId;
        this.lastEvent = lastEvent;
        this.user = user;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public LocalDateTime getLastEvent() {
        return lastEvent;
    }

    public void setLastEvent(LocalDateTime lastEvent) {
        this.lastEvent = lastEvent;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean hasUser(User user) {
        return user == this.user;
    }
}
