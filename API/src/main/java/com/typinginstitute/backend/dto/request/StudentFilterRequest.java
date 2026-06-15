package com.typinginstitute.backend.dto.request;

import com.typinginstitute.backend.enums.SubjectType;
import lombok.*;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentFilterRequest {

    private String firstName;

    private String lastName;

    private String mobileNo;

    private SubjectType subject;

    private String regNo;

    private String search;
}