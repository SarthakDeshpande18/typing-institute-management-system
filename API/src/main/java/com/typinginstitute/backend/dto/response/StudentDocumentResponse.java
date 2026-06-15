package com.typinginstitute.backend.dto.response;

import com.typinginstitute.backend.enums.DocumentType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StudentDocumentResponse {

    private Long id;

    private DocumentType documentType;

    private String fileName;

    private String fileUrl;

    private LocalDateTime uploadedAt;
}