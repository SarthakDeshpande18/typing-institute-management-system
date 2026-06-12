package com.typinginstitute.backend.dto.response;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PendingFeeResponse {

    private Long studentId;

    private String regNo;

    private String studentName;

    private BigDecimal totalFee;

    private BigDecimal paidFee;

    private BigDecimal remainingFee;
}