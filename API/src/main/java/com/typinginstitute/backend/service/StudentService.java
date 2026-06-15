package com.typinginstitute.backend.service;

import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.*;
import com.typinginstitute.backend.enums.DocumentType;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {

    StudentResponse createStudent(StudentRequest request);

    StudentResponse getStudentById(Long id);

    PageResult<StudentResponse> getStudents(StudentSearchPageRequest request);

    StudentResponse updateStudent(Long id, StudentRequest request);

    void deleteStudent(Long id);

    PhotoUploadResponse uploadStudentPhoto(Long studentId, MultipartFile file
    );

    DocumentUploadResponse uploadDocument(Long studentId, DocumentType documentType, MultipartFile file);

    // Get All Documents of Student
    List<StudentDocumentResponse> getStudentDocuments(Long studentId);

    ResponseEntity<Resource> getDocument(Long documentId);

    // Delete Document
    void deleteDocument(Long documentId);
}