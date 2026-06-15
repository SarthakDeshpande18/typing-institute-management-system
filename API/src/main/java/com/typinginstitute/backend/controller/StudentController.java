package com.typinginstitute.backend.controller;

import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.*;
import com.typinginstitute.backend.enums.DocumentType;
import com.typinginstitute.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/createStudent")
    public ApiResponse<StudentResponse> createStudent(
            @Valid @RequestBody StudentRequest request
    ) {

        return ApiResponse.ok(
                studentService.createStudent(request), "Student created successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<StudentResponse> getStudentById(
            @PathVariable Long id
    ) {

        return ApiResponse.ok(studentService.getStudentById(id), "Student fetched successfully");
    }

    @PostMapping("/list")
    public ApiResponse<PageResult<StudentResponse>> getStudents(
            @RequestBody StudentSearchPageRequest request
    ) {

        return ApiResponse.ok(
                studentService.getStudents(request),
                "Students fetched successfully"
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<StudentResponse> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request
    ) {

        return ApiResponse.ok(
                studentService.updateStudent(id, request), "Student updated successfully"
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteStudent(
            @PathVariable Long id
    ) {

        studentService.deleteStudent(id);

        return ApiResponse.ok(null, "Student deleted successfully");
    }


    @PostMapping(value = "/{id}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<PhotoUploadResponse> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file")
            MultipartFile file
    ) {

        return ApiResponse.ok(
                studentService.uploadStudentPhoto(id, file), "Photo uploaded successfully"
        );
    }

    @PostMapping(
            value = "/{id}/documents",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<DocumentUploadResponse> uploadDocument(
            @PathVariable Long id,

            @RequestParam DocumentType documentType,

            @RequestParam("file")
            MultipartFile file
    ) {

        return ApiResponse.ok(studentService.uploadDocument(id, documentType, file), "Document uploaded successfully"
        );
    }

    @GetMapping("/{id}/documents")
    public ApiResponse<List<StudentDocumentResponse>> getStudentDocuments(
            @PathVariable Long id) {

        return ApiResponse.ok(studentService.getStudentDocuments(id), "Document fetched successfully"
        );
    }

    @GetMapping("/documents/{documentId}")
    public ResponseEntity<Resource> getDocument(
            @PathVariable Long documentId) {

        return studentService.getDocument(documentId);
    }

    @DeleteMapping("/documents/{documentId}")
    public ApiResponse<String> deleteDocument(
            @PathVariable Long documentId) {

        studentService.deleteDocument(documentId);

        return ApiResponse.ok("Document deleted successfully");
    }
}
