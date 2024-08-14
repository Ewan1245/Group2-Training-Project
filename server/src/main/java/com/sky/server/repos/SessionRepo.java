package com.sky.server.repos;

import com.sky.server.entities.Session;
import com.sky.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepo extends JpaRepository<Session, String> {
//    boolean hasUser(User user);
    Optional<Session> getReferenceByUser(User user);
}
