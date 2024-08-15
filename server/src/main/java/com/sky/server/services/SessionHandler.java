package com.sky.server.services;

import com.sky.server.DTOs.SessionVisualisedDTO;
import com.sky.server.DTOs.UserInfoDTO;
import com.sky.server.entities.Session;
import com.sky.server.entities.User;
import com.sky.server.exceptions.SessionAlreadyActiveException;
import com.sky.server.exceptions.SessionNotActiveException;
import com.sky.server.repos.SessionRepo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class SessionHandler {

    private static final int session_life = 1;
    private SessionRepo sessionRepo;


    public SessionHandler(SessionRepo sessionRepo) {
        this.sessionRepo = sessionRepo;
    }

    public String createSession(User user) {
        //check if the user has an active session
        LocalDateTime now = LocalDateTime.now();
        if(sessionRepo.getReferenceByUser(user).isPresent()) {
            Session session = sessionRepo.getReferenceByUser(user).get();
            if(session.lastEvent.plusMinutes(session_life).isBefore(now)) {
                //remove the old session
                sessionRepo.delete(session);
            }
            else throw new SessionAlreadyActiveException();
        }


        //generate random string
        String sessionToken = UUID.randomUUID().toString();
        Session newSession = new Session(sessionToken, now, user);
        sessionRepo.save(newSession);
        return sessionToken;
    }

    public UserInfoDTO getUserData(String token) {
        //prod the session to keep it alive
        prodSession(token);

        User user = sessionRepo.getReferenceById(token).getUser();
        return new UserInfoDTO(user.getFirstname(), user.getSurname(), user.getEmail());
    }



    public User getUser(String token) {
        prodSession(token);

        return sessionRepo.getReferenceById(token).getUser();
    }

    //keeps a session alive
    public boolean prodSession(String token) {
        //if there is no active session return false
        if(!sessionRepo.existsById(token)) throw new SessionNotActiveException();

        Session session = sessionRepo.findById(token).get();
        LocalDateTime lastAction = session.getLastEvent();
        LocalDateTime now = LocalDateTime.now();

        //if user hasn't interacted with the session in five minutes remove from the map
        if(lastAction.plusMinutes(session_life).isBefore(now)) {
            sessionRepo.deleteById(token);
            throw new SessionNotActiveException();
        }

        //if user hasn't timed out update the time that the user has left
        session.setLastEvent(now);
        sessionRepo.save(session);
        return true;
    }

    public void endSession(String token) {
        if(!sessionRepo.existsById(token)) throw new SessionNotActiveException();

        sessionRepo.deleteById(token);
    }

    public LocalDateTime getSessionTime(String token) {
        if(sessionRepo.existsById(token)) {
            return sessionRepo.getReferenceById(token).getLastEvent();
        }

        throw new SessionNotActiveException();
    }

    public List<SessionVisualisedDTO> getActiveSessions() {
        return sessionRepo.findAll().stream().map(e -> new SessionVisualisedDTO(e.getSessionId(), e.getUser().getEmail())).toList();
    }

    public boolean isAdmin(String token) {
        //get the session for the token
        if(sessionRepo.existsById(token)) {
            return sessionRepo.getReferenceById(token).getUser().isAdmin();
        }

        throw new SessionNotActiveException();
    }

    //wipes the inactive sessions every 30 seconds
    @Scheduled(fixedRate = 30000L)
    public void wipeInactiveSessions() {
        LocalDateTime now = LocalDateTime.now();
        sessionRepo.findAll().forEach(e -> {
            LocalDateTime lastAction = e.getLastEvent();
            if(lastAction.plusMinutes(session_life).isBefore(now)) {
                sessionRepo.delete(e);
            }
        });
    }
}
