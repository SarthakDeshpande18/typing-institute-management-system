package com.typinginstitute.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingFeeFilterRequest {

    private String studentName;

    private String regNo;
}