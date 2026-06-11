package com.typinginstitute.backend.service;

import com.typinginstitute.backend.dto.request.StudentFilterRequest;
import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.PageResult;
import com.typinginstitute.backend.dto.response.StudentResponse;
import com.typinginstitute.backend.entity.Student;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    StudentResponse createStudent(StudentRequest request);

    StudentResponse getStudentById(Long id);

    PageResult<StudentResponse> getStudents(StudentSearchPageRequest request);

    StudentResponse updateStudent(Long id, StudentRequest request);

    void deleteStudent(Long id);

}