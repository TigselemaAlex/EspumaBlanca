package com.espumablanca.backend.infrastructure.rest.advice;

import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import com.espumablanca.backend.infrastructure.adapter.exception.RefreshTokenException;
import com.espumablanca.backend.infrastructure.util.exception.AdviceMessage;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class CustomControlAdvice {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleError404() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleError400(HttpMessageNotReadableException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.badRequest().body(buildSimpleErrorMessage(ex.getMessage()));
    }

    @ExceptionHandler(JpaSystemException.class)
    public ResponseEntity<?> handleError500(JpaSystemException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(buildSimpleErrorMessage(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleError400(MethodArgumentNotValidException ex) {
        List<FieldError> errors = ex.getFieldErrors();
        log.atError().log(ex.getMessage());
        List<ValidationErrorData> messages = new ArrayList<>(errors.size());

        errors.forEach(error -> {
            if (messages.stream().anyMatch(errorData -> Objects.equals(errorData.field(), error.getField()))) {
                ValidationErrorData data = messages.stream().filter(
                        errorData -> Objects.equals(errorData.field(), error.getField())).findFirst().get();
                messages.remove(data);
                List<String> messagesList = data.messages();
                String errorMessage = error.getDefaultMessage();
                messagesList.add(errorMessage);
                messages.add(new ValidationErrorData(error.getField(), messagesList, LocalDate.now()));
            } else {
                messages.add(new ValidationErrorData(error));
            }
        });
        return ResponseEntity.badRequest().body(messages);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleValidationError(ConstraintViolationException ex) {
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();
        log.atError().log(ex.getMessage());
        List<ValidationErrorData> messages = new ArrayList<>(constraintViolations.size());

        constraintViolations.forEach(
                constraintViolation -> {
                    if (messages.stream().anyMatch(errorData -> Objects.equals(errorData.field(),
                            constraintViolation.getPropertyPath().toString()))) {
                        ValidationErrorData data = messages.stream().filter(errorData -> Objects
                                .equals(errorData.field(), constraintViolation.getPropertyPath().toString()))
                                .findFirst().get();
                        messages.remove(data);
                        List<String> messageList = data.messages();
                        messageList.add(constraintViolation.getMessage());
                        messages.add(new ValidationErrorData(constraintViolation.getPropertyPath().toString(),
                                messageList, LocalDate.now()));
                    }
                    messages.add(
                            new ValidationErrorData(
                                    constraintViolation.getPropertyPath().toString(),
                                    Collections.singletonList(constraintViolation.getMessage()),
                                    LocalDate.now()));
                });
        return ResponseEntity.badRequest().body(messages);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> handleError500(SQLException ex) {
        log.atError().log(ex.getMessage());
        String errorCode = ex.getSQLState();
        if (errorCode.equals("23505")) {
            int index = ex.getMessage().indexOf("Detail:");
            String message = ex.getMessage().substring(index + 8).replaceAll("[()]", "").replaceAll("=", " - ")
                    .replaceAll("Ya existe la llave", "Ya existe un registro con: ");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(buildSimpleErrorMessage(AdviceMessage.constraintKeyToMessage(message)));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: No se pudo realizar la operación");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleError401(BadCredentialsException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(buildSimpleErrorMessage("Username or password is incorrect"));
    }

    @ExceptionHandler(AccountStatusException.class)
    public ResponseEntity<?> handleError403(AccountStatusException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(buildSimpleErrorMessage("The account is locked"));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleError403(AccessDeniedException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(buildSimpleErrorMessage("You are not authorized to access this resource"));
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<?> handleError403(SignatureException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(buildSimpleErrorMessage("The JWT signature is invalid"));
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<?> handleError403(ExpiredJwtException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(buildSimpleErrorMessage("The JWT has expired"));
    }

    @ExceptionHandler(RefreshTokenException.class)
    public ResponseEntity<?> handleError403(RefreshTokenException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(buildSimpleErrorMessage("The session has expired"));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleError403(ResponseStatusException ex) {
        log.atError().log(ex.getMessage());
        return ResponseEntity.status(ex.getStatusCode()).body(buildSimpleErrorMessage("The session has expired"));
    }

    @SuppressWarnings({ "unused", "null" })
    private void clearCookies(HttpServletResponse response) {
        response.addHeader(HttpHeaders.SET_COOKIE, ResponseCookie.from("accessToken", null)
                .httpOnly(true)
                .secure(true)
                .maxAge(0)
                .path("/")
                .build().toString());
    }

    private HashMap<String, Object> buildSimpleErrorMessage(String message) {
        return new HashMap<>(
                Map.of("message", message, "timestamp", Instant.now()));
    }

    private record ValidationErrorData(String field, List<String> messages, LocalDate timestamp) {
        public ValidationErrorData(FieldError error) {
            this(error.getField(), new ArrayList<>(Collections.singletonList(error.getDefaultMessage())),
                    LocalDate.now());
        }
    }
}
