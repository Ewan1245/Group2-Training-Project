package com.sky.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User already has an active session")
public class SessionAlreadyActiveException extends RuntimeException {
}
