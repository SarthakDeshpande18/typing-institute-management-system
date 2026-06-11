package com.typinginstitute.backend.controller;

import com.typinginstitute.backend.dto.request.StudentFilterRequest;
import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.ApiResponse;
import com.typinginstitute.backend.dto.response.PageResult;
import com.typinginstitute.backend.dto.response.StudentResponse;
import com.typinginstitute.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

}