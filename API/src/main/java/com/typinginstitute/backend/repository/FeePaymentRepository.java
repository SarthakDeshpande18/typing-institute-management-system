package com.typinginstitute.backend.repository;

import com.typinginstitute.backend.entity.FeePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {

    List<FeePayment> findByStudentId(Long studentId);

    List<FeePayment> findByStudentIdOrderByPaymentDateDesc(Long studentId);

    @Query("""
       SELECT COALESCE(SUM(f.amountPaid),0)
       FROM FeePayment f
       """)
    BigDecimal getTotalFeesCollected();
}