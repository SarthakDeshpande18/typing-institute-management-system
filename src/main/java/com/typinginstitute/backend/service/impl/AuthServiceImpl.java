package com.typinginstitute.backend.service.impl;

import com.typinginstitute.backend.dto.request.LoginRequest;
import com.typinginstitute.backend.dto.request.RegisterRequest;
import com.typinginstitute.backend.dto.response.AuthResponse;
import com.typinginstitute.backend.entity.Admin;
import com.typinginstitute.backend.exception.BadRequestException;
import com.typinginstitute.backend.repository.AdminRepository;
import com.typinginstitute.backend.config.JwtUtil;
import com.typinginstitute.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public String register(RegisterRequest request) {

        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        Admin admin = Admin.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(request.getPassword())
                )
                .role("ADMIN")
                .build();

        adminRepository.save(admin);

        return "Admin Registered Successfully";
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        Admin admin = adminRepository
                .findByEmail(request.getEmail())
                .orElseThrow(
                        () -> new BadRequestException("Invalid Email")
                );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        admin.getPassword()
                );

        if (!matches) {
            throw new BadRequestException("Invalid Password");
        }

        String token =
                jwtUtil.generateToken(admin.getEmail());

        return new AuthResponse(token);
    }
}