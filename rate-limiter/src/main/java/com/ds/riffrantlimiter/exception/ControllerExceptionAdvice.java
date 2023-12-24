package com.ds.riffrantlimiter.exception;

import com.ds.riffrantlimiter.util.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler(TooManyRequestsException.class)
    public ResponseEntity<Message> handleTooManyRequestsException(TooManyRequestsException e) {

        var status = HttpStatus.TOO_MANY_REQUESTS;
        var errorMessage = new Message(status.value(), e.getMessage());

        return ResponseEntity.status(status).body(errorMessage);
    }
}
