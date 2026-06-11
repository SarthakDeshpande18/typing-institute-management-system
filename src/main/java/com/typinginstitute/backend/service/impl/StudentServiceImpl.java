package com.typinginstitute.backend.service.impl;

import com.typinginstitute.backend.dto.request.StudentFilterRequest;
import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.PageResult;
import com.typinginstitute.backend.dto.response.PhotoUploadResponse;
import com.typinginstitute.backend.dto.response.StudentResponse;
import com.typinginstitute.backend.entity.Student;
import com.typinginstitute.backend.exception.BadRequestException;
import com.typinginstitute.backend.mapper.StudentMapper;
import com.typinginstitute.backend.repository.StudentRepository;
import com.typinginstitute.backend.service.StudentService;
import com.typinginstitute.backend.specifications.StudentSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    @Transactional
    public StudentResponse createStudent(StudentRequest request) {

        if (studentRepository.existsByMobileNo(request.getMobileNo())) {

            throw new BadRequestException("Student already exists with mobile number : " + request.getMobileNo()
            );
        }

        Student student = StudentMapper.toEntity(request);

        student.setRegNo(generateRegNo());
        student.setActive(true);

        Student savedStudent = studentRepository.save(student);

        return StudentMapper.toResponse(savedStudent);
    }

    @Transactional(readOnly = true)
    @Override
    public StudentResponse getStudentById(Long id) {

        Student student = studentRepository
                .findById(id)
                .orElseThrow(() ->
                        new BadRequestException(
                                "Student not found with id : " + id
                        ));

        return StudentMapper.toResponse(student);
    }


    @Override
    @Transactional(readOnly = true)
    public PageResult<StudentResponse> getStudents(
            StudentSearchPageRequest request
    ) {

        StudentFilterRequest filters =
                request.getFilters() == null
                        ? StudentFilterRequest.builder().build()
                        : request.getFilters();

        int page =
                Math.max(
                        request.getCurrentPage() - 1,
                        0
                );

        int size =
                request.getPageSize();

        String sortField =
                (request.getSortBy() == null
                        || request.getSortBy().isBlank())
                        ? "!createdAt"
                        : request.getSortBy();

        Sort sort = sortField.startsWith("!")
                ? Sort.by(sortField.substring(1)).descending()
                : Sort.by(sortField).ascending();

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        sort
                );

        Specification<Student> specification =
                StudentSpecification.build(filters);

        Page<Student> studentPage =
                studentRepository.findAll(
                        specification,
                        pageable
                );

        return new PageResult<>(
                studentPage.getContent()
                        .stream()
                        .map(StudentMapper::toResponse)
                        .toList(),

                studentPage.getNumber() + 1,

                studentPage.getTotalPages(),

                studentPage.getTotalElements(),

                studentPage.getSize()
        );
    }

    @Override
    @Transactional
    public StudentResponse updateStudent(
            Long id,
            StudentRequest request
    ) {

        Student student = studentRepository
                .findByIdAndActiveTrue(id)
                .orElseThrow(() -> new BadRequestException("Student not found"));

        if (!student.getMobileNo().equals(request.getMobileNo())
                && studentRepository.existsByMobileNoAndActiveTrue(
                request.getMobileNo()
        )) {

            throw new BadRequestException("Student already exists with mobile number : " + request.getMobileNo()
            );
        }

        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setMobileNo(request.getMobileNo());
        student.setMotherName(request.getMotherName());
        student.setAddress(request.getAddress());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setSubject(request.getSubject());

        Student updatedStudent =
                studentRepository.save(student);

        return StudentMapper.toResponse(
                updatedStudent
        );
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {

        Student student = studentRepository
                .findByIdAndActiveTrue(id)
                .orElseThrow(() -> new BadRequestException("Student not found"));

        student.setActive(false);

        studentRepository.save(student);
    }

    @Override
    @Transactional
    public PhotoUploadResponse uploadStudentPhoto(
            Long studentId,
            MultipartFile file
    ) {

        Student student = studentRepository
                .findByIdAndActiveTrue(studentId)
                .orElseThrow(() -> new BadRequestException("Student not found"));

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Photo is required"
            );
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null) {
            throw new BadRequestException("Invalid file");
        }

        String extension =
                originalFilename.substring(originalFilename.lastIndexOf(".")
                ).toLowerCase();

        if (!extension.equals(".jpg") && !extension.equals(".jpeg")) {

            throw new BadRequestException("Only JPG and JPEG files are allowed");
        }

        try {

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = student.getRegNo() + extension;

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING
            );

            student.setPhotoPath("uploads/photos/" + fileName);

            studentRepository.save(student);

            return new PhotoUploadResponse(student.getPhotoPath());

        } catch (IOException ex) {

            throw new RuntimeException("Failed to upload photo");
        }
    }

    private String generateRegNo() {

        Student lastStudent =
                studentRepository
                        .findTopByOrderByIdDesc()
                        .orElse(null);

        if (lastStudent == null) {
            return "REG0001";
        }

        Long nextId = lastStudent.getId() + 1;

        return String.format("REG%04d", nextId);
    }
}