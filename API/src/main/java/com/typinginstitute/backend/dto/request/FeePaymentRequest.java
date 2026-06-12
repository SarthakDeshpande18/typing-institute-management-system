package com.typinginstitute.backend.dto.request;


import com.typinginstitute.backend.enums.PaymentMode;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeePaymentRequest {

    @NotNull(message = "Student Id is required")
    private Long studentId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1", message = "Amount must be greater than 0")
    private BigDecimal amountPaid;

    @NotNull(message = "Payment mode is required")
    private PaymentMode paymentMode;

    private String remarks;
}