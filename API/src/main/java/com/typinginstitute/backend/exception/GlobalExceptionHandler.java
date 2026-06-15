package com.typinginstitute.backend.exception;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.exc.ValueInstantiationException;
import com.typinginstitute.backend.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequest(
            BadRequestException ex
    ) {

        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(
            MethodArgumentNotValidException ex
    ) {

        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(fieldError -> fieldError.getDefaultMessage())
                .orElse("Validation failed");

        return ResponseEntity
                .badRequest()
                .body(ApiResponse.error(errorMessage));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(
            Exception ex
    ) {

        return ResponseEntity
                .internalServerError()
                .body(ApiResponse.error("Something went wrong"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex) {

        Throwable cause = ex.getMostSpecificCause();
        String message = null;

        if (cause instanceof ValueInstantiationException) {
            Throwable root = cause.getCause();
            if (root != null && root.getMessage() != null) {
                message = root.getMessage();
            }
        }
        else if (cause instanceof InvalidFormatException) {
            InvalidFormatException ife = (InvalidFormatException) cause;

            String field = "field";
            if (!ife.getPath().isEmpty()) {
                String last = ife.getPath()
                        .get(ife.getPath().size() - 1)
                        .getFieldName();

                if (last == null && ife.getPath().size() > 1) {
                    field = ife.getPath()
                            .get(ife.getPath().size() - 2)
                            .getFieldName();
                } else {
                    field = last;
                }
            }

            Class<?> type = ife.getTargetType();

            if (type == Integer.class || type == int.class) {
                message = field + " must be a number";
            }
            else if (type != null && type.isEnum()) {
                Object[] constants = type.getEnumConstants();
                String allowedValues = Arrays.stream(constants)
                        .map(Object::toString)
                        .collect(Collectors.joining(" or "));

                message = field + " must be " + allowedValues + ".";
            }
            else {
                message = "Invalid value for " + field;
            }
        }
        else if (cause instanceof JsonParseException) {
            message = "Malformed JSON request";
        }

        if (message == null) {
            message = cause.getMessage() != null ? cause.getMessage() : ex.getMessage();
        }

        return ResponseEntity.badRequest().body(Map.of("message", message));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(
            ResourceNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(ex.getMessage()));
    }
}