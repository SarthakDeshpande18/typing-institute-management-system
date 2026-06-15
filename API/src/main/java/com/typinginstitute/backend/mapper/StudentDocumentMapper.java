package com.typinginstitute.backend.mapper;

import com.typinginstitute.backend.dto.response.StudentDocumentResponse;
import com.typinginstitute.backend.entity.StudentDocument;
import java.nio.file.Paths;

public class StudentDocumentMapper {

    public static StudentDocumentResponse toResponse(
            StudentDocument document,
            String baseUrl
    ) {

        return StudentDocumentResponse.builder()
                .id(document.getId())
                .documentType(document.getDocumentType())
                .fileName(Paths.get(document.getFilePath())
                                .getFileName()
                                .toString()
                )
                .fileUrl(baseUrl + "/" + document.getFilePath().replace("\\", "/"))
                .uploadedAt(document.getUploadedAt())
                .build();
    }
}