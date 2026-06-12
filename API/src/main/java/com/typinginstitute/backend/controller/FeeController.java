package com.typinginstitute.backend.controller;

import com.typinginstitute.backend.dto.request.FeePaymentRequest;
import com.typinginstitute.backend.dto.request.PendingFeeSearchRequest;
import com.typinginstitute.backend.dto.response.*;
import com.typinginstitute.backend.service.FeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
public class FeeController {

    private final FeeService feeService;

    @PostMapping("/pay")
    public ApiResponse<FeeSummaryResponse> payFee(@Valid @RequestBody FeePaymentRequest request) {

        return ApiResponse.ok(feeService.payFee(request), "Fee paid successfully"
        );
    }

    @GetMapping("/student/{studentId}")
    public ApiResponse<FeeSummaryResponse> getFeeSummary(@PathVariable Long studentId) {

        return ApiResponse.ok(feeService.getFeeSummary(studentId), "Fee summary fetched successfully"
        );
    }

    @GetMapping("/history/{studentId}")
    public ApiResponse<List<FeeHistoryResponse>> getFeeHistory(@PathVariable Long studentId) {

        return ApiResponse.ok(feeService.getFeeHistory(studentId), "Fee history fetched successfully");
    }

    @PostMapping("/pending")
    public ApiResponse<PageResult<PendingFeeResponse>>getPendingFees(@RequestBody PendingFeeSearchRequest request) {

        return ApiResponse.ok(feeService.getPendingFees(request), "Pending fees fetched successfully"
        );
    }
}