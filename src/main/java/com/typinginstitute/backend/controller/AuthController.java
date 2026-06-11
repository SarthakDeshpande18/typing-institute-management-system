package com.typinginstitute.backend.controller;

import com.typinginstitute.backend.dto.request.LoginRequest;
import com.typinginstitute.backend.dto.request.RegisterRequest;
import com.typinginstitute.backend.dto.response.ApiResponse;
import com.typinginstitute.backend.dto.response.AuthResponse;
import com.typinginstitute.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<String> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ApiResponse.ok(
                authService.register(request),
                "Admin registered successfully"
        );
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ApiResponse.ok(
                authService.login(request),
                "Login successful"
        );
    }
}