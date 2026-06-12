package com.typinginstitute.backend.dto.response;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalStudents;
    private Long activeStudents;
    private Long inactiveStudents;
    private BigDecimal totalFeesCollected;
    private BigDecimal pendingFees;
    private Long studentsWithPendingFees;
    private Long fullyPaidStudents;
}