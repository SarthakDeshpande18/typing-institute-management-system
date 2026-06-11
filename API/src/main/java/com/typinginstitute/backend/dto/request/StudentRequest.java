package com.typinginstitute.backend.dto.request;

import com.typinginstitute.backend.enums.SubjectType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class StudentRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number")
    private String mobileNo;

    private String motherName;

    private String address;

    @NotNull(message = "Admission date is required")
    private LocalDate admissionDate;

    @NotNull(message = "Subject is required")
    private SubjectType subject;

    @NotNull(message = "Total fee is required")
    @DecimalMin(value = "1", message = "Total fee must be greater than 0")
    private BigDecimal totalFee;
}