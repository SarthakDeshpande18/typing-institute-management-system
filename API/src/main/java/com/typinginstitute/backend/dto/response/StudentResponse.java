package com.typinginstitute.backend.dto.response;

import com.typinginstitute.backend.enums.SubjectType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class StudentResponse {

    private Long id;

    private String regNo;

    private String firstName;

    private String lastName;

    private String mobileNo;

    private String motherName;

    private String address;

    private LocalDate admissionDate;

    private SubjectType subject;

    private BigDecimal totalFee;

    private BigDecimal paidFee;

    private BigDecimal remainingFee;
    private String photoUrl;
}