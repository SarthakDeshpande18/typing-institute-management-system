package com.typinginstitute.backend.service;

import com.typinginstitute.backend.dto.request.FeePaymentRequest;
import com.typinginstitute.backend.dto.request.PendingFeeSearchRequest;
import com.typinginstitute.backend.dto.response.FeeHistoryResponse;
import com.typinginstitute.backend.dto.response.FeeSummaryResponse;
import com.typinginstitute.backend.dto.response.PageResult;
import com.typinginstitute.backend.dto.response.PendingFeeResponse;
import org.springframework.data.domain.Page;

import java.util.*;

public interface FeeService {

    FeeSummaryResponse payFee(FeePaymentRequest request);

    FeeSummaryResponse getFeeSummary(Long studentId);

    List<FeeHistoryResponse> getFeeHistory(Long studentId);

    PageResult<PendingFeeResponse> getPendingFees(PendingFeeSearchRequest request);
}