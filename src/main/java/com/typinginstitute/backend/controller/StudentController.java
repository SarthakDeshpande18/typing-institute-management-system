package com.typinginstitute.backend.controller;

import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.ApiResponse;
import com.typinginstitute.backend.dto.response.PageResult;
import com.typinginstitute.backend.dto.response.PhotoUploadResponse;
import com.typinginstitute.backend.dto.response.StudentResponse;
import com.typinginstitute.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

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
}