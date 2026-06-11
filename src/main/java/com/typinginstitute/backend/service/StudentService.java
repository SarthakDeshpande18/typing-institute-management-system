package com.typinginstitute.backend.service;

import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.PageResult;
import com.typinginstitute.backend.dto.response.PhotoUploadResponse;
import com.typinginstitute.backend.dto.response.StudentResponse;
import org.springframework.web.multipart.MultipartFile;

public interface StudentService {

    StudentResponse createStudent(StudentRequest request);

    StudentResponse getStudentById(Long id);

    PageResult<StudentResponse> getStudents(StudentSearchPageRequest request);

    StudentResponse updateStudent(Long id, StudentRequest request);

    void deleteStudent(Long id);

    PhotoUploadResponse uploadStudentPhoto(Long studentId, MultipartFile file
    );

}