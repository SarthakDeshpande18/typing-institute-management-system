package com.typinginstitute.backend.exception;

import lombok.*;

@Getter
public class FileUploadException extends RuntimeException {

    public FileUploadException(String message) {
        super(message);
    }
}