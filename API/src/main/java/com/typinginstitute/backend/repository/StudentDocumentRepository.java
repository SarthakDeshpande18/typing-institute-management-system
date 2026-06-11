package com.typinginstitute.backend.repository;

import com.typinginstitute.backend.entity.StudentDocument;
import com.typinginstitute.backend.enums.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Long> {

    boolean existsByStudentIdAndDocumentType(
            Long studentId,
            DocumentType documentType
    );
}