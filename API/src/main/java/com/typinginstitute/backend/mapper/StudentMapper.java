package com.typinginstitute.backend.mapper;

import com.typinginstitute.backend.dto.request.StudentRequest;
import com.typinginstitute.backend.dto.response.StudentResponse;
import com.typinginstitute.backend.entity.FeePayment;
import com.typinginstitute.backend.entity.Student;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

public class StudentMapper {

    @Value("${app.base-url}")
    private String baseUrl;

    public static Student toEntity(StudentRequest request) {

        return Student.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .mobileNo(request.getMobileNo())
                .motherName(request.getMotherName())
                .address(request.getAddress())
                .admissionDate(request.getAdmissionDate())
                .subject(request.getSubject())
                .totalFee(request.getTotalFee())
                .build();
    }

    public static StudentResponse toResponse(Student student, String baseUrl) {

        BigDecimal paidFee = Optional.ofNullable(student.getFeePayments())
                .orElse(Collections.emptyList())
                .stream()
                .map(FeePayment::getAmountPaid)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal remainingFee =
                student.getTotalFee().subtract(paidFee);

        String photoUrl = null;

        if (student.getPhotoPath() != null && !student.getPhotoPath().isBlank()) {
            photoUrl = baseUrl + "/" + student.getPhotoPath().replace("\\", "/");
        }

        return StudentResponse.builder()
                .id(student.getId())
                .regNo(student.getRegNo())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .mobileNo(student.getMobileNo())
                .motherName(student.getMotherName())
                .address(student.getAddress())
                .admissionDate(student.getAdmissionDate())
                .subject(student.getSubject())
                .totalFee(student.getTotalFee())
                .paidFee(paidFee)
                .remainingFee(remainingFee)
                .photoUrl(photoUrl)
                .build();
    }
}