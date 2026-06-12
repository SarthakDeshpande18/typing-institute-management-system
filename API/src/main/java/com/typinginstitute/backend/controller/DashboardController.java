package com.typinginstitute.backend.controller;

import com.typinginstitute.backend.dto.response.*;
import com.typinginstitute.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ApiResponse<DashboardResponse> getDashboard() {

        return ApiResponse.ok(dashboardService.getDashboard(), "Dashboard fetched successfully");
    }
}