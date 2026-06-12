package com.typinginstitute.backend.dto.response;

import com.typinginstitute.backend.enums.PaymentMode;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeeHistoryResponse {

    private Long paymentId;

    private BigDecimal amountPaid;

    private LocalDate paymentDate;

    private PaymentMode paymentMode;

    private String remarks;
}