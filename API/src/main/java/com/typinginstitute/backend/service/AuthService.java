package com.typinginstitute.backend.service;

import com.typinginstitute.backend.dto.request.LoginRequest;
import com.typinginstitute.backend.dto.request.RegisterRequest;
import com.typinginstitute.backend.dto.response.AuthResponse;

public interface AuthService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}