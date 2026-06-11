package com.typinginstitute.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentSearchPageRequest {

    private int currentPage;

    private int pageSize;

    private String sortBy;

    private StudentFilterRequest filters;
}