package com.sky.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Cannot Login User")
public class CannotLoginUserException extends RuntimeException {
}
