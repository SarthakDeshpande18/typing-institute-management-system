package com.typinginstitute.backend.repository;

import com.typinginstitute.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface StudentRepository
        extends JpaRepository<Student, Long>,
        JpaSpecificationExecutor<Student> {

    Optional<Student> findTopByOrderByIdDesc();

    boolean existsByMobileNo(String mobileNo);

    Optional<Student> findByIdAndActiveTrue(Long id);

    boolean existsByMobileNoAndActiveTrue(String mobileNo);
}
