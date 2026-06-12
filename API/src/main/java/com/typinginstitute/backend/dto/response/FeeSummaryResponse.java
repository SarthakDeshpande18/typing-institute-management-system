package com.typinginstitute.backend.dto.response;


import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeeSummaryResponse {

    private Long studentId;

    private String studentName;

    private String regNo;

    private BigDecimal totalFee;

    private BigDecimal paidFee;

    private BigDecimal remainingFee;
}