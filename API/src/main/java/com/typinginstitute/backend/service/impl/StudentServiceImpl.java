package com.typinginstitute.backend.service.impl;

import com.typinginstitute.backend.dto.request.StudentFilterRequest;
import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.request.StudentSearchPageRequest;
import com.typinginstitute.backend.dto.response.*;
import com.typinginstitute.backend.entity.Student;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.typinginstitute.backend.entity.StudentDocument;
import com.typinginstitute.backend.enums.DocumentType;
import com.typinginstitute.backend.exception.BadRequestException;
import com.typinginstitute.backend.exception.ResourceNotFoundException;
import com.typinginstitute.backend.mapper.StudentDocumentMapper;
import com.typinginstitute.backend.mapper.StudentMapper;
import com.typinginstitute.backend.repository.StudentDocumentRepository;
import com.typinginstitute.backend.repository.StudentRepository;
import com.typinginstitute.backend.service.StudentService;
import com.typinginstitute.backend.specifications.StudentSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;

import java.nio.file.StandardCopyOption;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentDocumentRepository studentDocumentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.document-upload-dir}")
    private String documentUploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

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

        return StudentMapper.toResponse(savedStudent,baseUrl);
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

        return StudentMapper.toResponse(student,baseUrl);
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
                        .map(student -> StudentMapper.toResponse(student, baseUrl))
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
                updatedStudent,baseUrl
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

        if (!extension.equals(".jpg") && !extension.equals(".jpeg") && !extension.equals(".png")) {

            throw new BadRequestException("Only JPG, JPEG and PNG files are allowed");
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

    @Override
    @Transactional
    public DocumentUploadResponse uploadDocument(
            Long studentId,
            DocumentType documentType,
            MultipartFile file
    ) {

        Student student = studentRepository
                .findByIdAndActiveTrue(studentId)
                .orElseThrow(() -> new BadRequestException("Student not found"));

        if (studentDocumentRepository.existsByStudentIdAndDocumentType(studentId, documentType))
        {
            throw new BadRequestException(documentType.name() + " already uploaded");
        }

        if (file == null || file.isEmpty())
        {
            throw new BadRequestException("Document is required");
        }

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null) {
            throw new BadRequestException("Invalid file");
        }

        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

        try {

            Path uploadPath = Paths.get(documentUploadDir);

            if (!Files.exists(uploadPath)) {

                Files.createDirectories(uploadPath);
            }

            String fileName =
                    student.getRegNo()
                            + "_"
                            + documentType.name()
                            + extension;

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            StudentDocument document =
                    StudentDocument.builder()
                            .documentType(documentType)
                            .filePath("uploads/documents/" + fileName
                            )
                            .student(student)
                            .build();

            StudentDocument savedDocument = studentDocumentRepository.save(document);

            return new DocumentUploadResponse(
                    savedDocument.getId(),
                    savedDocument.getDocumentType(),
                    savedDocument.getFilePath(),
                    savedDocument.getStudent().getId(),
                    savedDocument.getStudent().getRegNo()
            );

        } catch (IOException ex) {

            throw new RuntimeException("Failed to upload document");
        }
    }

    public List<StudentDocumentResponse> getStudentDocuments(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new  ResourceNotFoundException("Student not found"));

        return student.getDocuments()
                .stream()
                .map(document ->
                        StudentDocumentMapper.toResponse(document, baseUrl))
                .toList();
    }


    @Override
    public ResponseEntity<Resource> getDocument(Long documentId) {

        StudentDocument document = studentDocumentRepository.findById(documentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Document not found"));

        try {

            System.out.println("FILE PATH = " + document.getFilePath());

            Path path = Paths.get(document.getFilePath());

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                throw new ResourceNotFoundException("File not found");
            }

            String contentType =
                    Files.probeContentType(path);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(
                            contentType != null
                                    ? contentType
                                    : MediaType.APPLICATION_OCTET_STREAM_VALUE
                    ))
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" +
                                    path.getFileName().toString() +
                                    "\""
                    )
                    .body(resource);

        } catch (IOException e) {
            throw new RuntimeException("Unable to read document");
        }
    }

    @Override
    @Transactional
    public void deleteDocument(Long documentId) {

        StudentDocument document = studentDocumentRepository.findById(documentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Document not found"));

        try {

            Path filePath = Paths.get(document.getFilePath());

            Files.deleteIfExists(filePath);

        } catch (IOException e) {

            throw new RuntimeException("Unable to delete document file");
        }

        studentDocumentRepository.delete(document);
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