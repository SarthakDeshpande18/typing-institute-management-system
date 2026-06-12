package com.typinginstitute.backend.service.impl;

import com.typinginstitute.backend.dto.response.DashboardResponse;
import com.typinginstitute.backend.entity.FeePayment;
import com.typinginstitute.backend.entity.Student;
import com.typinginstitute.backend.repository.FeePaymentRepository;
import com.typinginstitute.backend.repository.StudentRepository;
import com.typinginstitute.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final FeePaymentRepository feePaymentRepository;

    @Override
    public DashboardResponse getDashboard() {

        long activeStudents = studentRepository.countByActiveTrue();

        long inactiveStudents = studentRepository.countByActiveFalse();

        long totalStudents = activeStudents + inactiveStudents;

        BigDecimal totalFeesCollected = feePaymentRepository.getTotalFeesCollected();

        BigDecimal totalStudentFees = studentRepository.getTotalStudentFees();

        BigDecimal totalPendingFees = totalStudentFees.subtract(totalFeesCollected);

        List<Student> activeStudentList = studentRepository.findByActiveTrue();

        long fullyPaidStudents = activeStudentList.stream()
                        .filter(student -> {
                            BigDecimal paidFee = student.getFeePayments()
                                            .stream()
                                            .map(FeePayment::getAmountPaid)
                                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                            return paidFee.compareTo(student.getTotalFee()) >= 0;})
                        .count();

        long studentsWithPendingFees =
                activeStudentList.stream()
                        .filter(student -> {
                            BigDecimal paidFee =
                                    student.getFeePayments()
                                            .stream()
                                            .map(FeePayment::getAmountPaid)
                                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                            return paidFee.compareTo(student.getTotalFee()) < 0;})
                        .count();

        return DashboardResponse.builder()
                .totalStudents(totalStudents)
                .activeStudents(activeStudents)
                .inactiveStudents(inactiveStudents)
                .totalFeesCollected(totalFeesCollected)
                .pendingFees(totalPendingFees)
                .fullyPaidStudents(fullyPaidStudents)
                .studentsWithPendingFees(studentsWithPendingFees)

                .build();
    }
}