package com.typinginstitute.backend.repository;

import com.typinginstitute.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface StudentRepository
        extends JpaRepository<Student, Long>,
        JpaSpecificationExecutor<Student> {

    Optional<Student> findTopByOrderByIdDesc();

    boolean existsByMobileNo(String mobileNo);

    Optional<Student> findByIdAndActiveTrue(Long id);

    boolean existsByMobileNoAndActiveTrue(String mobileNo);

    List<Student> findByActiveTrue();

    long countByActiveTrue();

    long countByActiveFalse();

    @Query("""
        SELECT COALESCE(SUM(s.totalFee), 0)
        FROM Student s
        WHERE s.active = true
       """)
    BigDecimal getTotalStudentFees();
}
