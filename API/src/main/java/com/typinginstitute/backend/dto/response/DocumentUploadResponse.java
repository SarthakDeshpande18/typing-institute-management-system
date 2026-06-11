package com.typinginstitute.backend.dto.response;

import com.typinginstitute.backend.enums.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DocumentUploadResponse {

    private Long id;

    private DocumentType documentType;

    private String filePath;
}