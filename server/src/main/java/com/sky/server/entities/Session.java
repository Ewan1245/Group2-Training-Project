package com.sky.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
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

    public boolean hasUser(User user) {
        return user == this.user;
    }
}
