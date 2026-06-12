package com.typinginstitute.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingFeeSearchRequest {

    private int currentPage;
    private int pageSize;
    private String sortBy;

    private PendingFeeFilterRequest filters;
}