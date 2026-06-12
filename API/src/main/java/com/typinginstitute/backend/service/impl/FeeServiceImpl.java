package com.typinginstitute.backend.service.impl;

import com.typinginstitute.backend.dto.request.FeePaymentRequest;
import com.typinginstitute.backend.dto.request.PendingFeeFilterRequest;
import com.typinginstitute.backend.dto.request.PendingFeeSearchRequest;
import com.typinginstitute.backend.dto.response.*;
import com.typinginstitute.backend.entity.FeePayment;
import com.typinginstitute.backend.entity.Student;
import com.typinginstitute.backend.exception.BadRequestException;
import com.typinginstitute.backend.repository.FeePaymentRepository;
import com.typinginstitute.backend.repository.StudentRepository;
import com.typinginstitute.backend.service.FeeService;
import com.typinginstitute.backend.specifications.PendingFeeSpecification;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class FeeServiceImpl implements FeeService {

    private final StudentRepository studentRepository;
    private final FeePaymentRepository feePaymentRepository;

    @Override
    public FeeSummaryResponse payFee(FeePaymentRequest request
    ) {

        Student student =
                studentRepository.findByIdAndActiveTrue(request.getStudentId())
                        .orElseThrow(() -> new BadRequestException("Student not found"));

        BigDecimal paidFee = student.getFeePayments()
                        .stream()
                        .map(FeePayment::getAmountPaid)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal remainingFee = student.getTotalFee().subtract(paidFee);

        if (request.getAmountPaid().compareTo(remainingFee) > 0) {

            throw new BadRequestException("Payment exceeds remaining fee");
        }

        FeePayment payment = FeePayment.builder()
                        .amountPaid(request.getAmountPaid())
                        .paymentMode(request.getPaymentMode())
                        .remarks(request.getRemarks())
                        .paymentDate(LocalDate.now())
                        .student(student)
                        .build();

        feePaymentRepository.save(payment);

        BigDecimal updatedPaidFee = paidFee.add(request.getAmountPaid());

        return FeeSummaryResponse.builder()
                .studentId(student.getId())
                .studentName(student.getFirstName() + " " + student.getLastName())
                .regNo(student.getRegNo())
                .totalFee(student.getTotalFee())
                .paidFee(updatedPaidFee)
                .remainingFee(student.getTotalFee().subtract(updatedPaidFee))
                .build();
    }


    // Fee summary by studentId
    @Override
    @Transactional(readOnly = true)
    public FeeSummaryResponse getFeeSummary(Long studentId
    ) {

        Student student =
                studentRepository.findByIdAndActiveTrue(studentId).orElseThrow(() ->
                                new BadRequestException("Student not found"));

        BigDecimal paidFee =
                student.getFeePayments()
                        .stream()
                        .map(FeePayment::getAmountPaid)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal remainingFee = student.getTotalFee().subtract(paidFee);

        return FeeSummaryResponse.builder()
                .studentId(student.getId())
                .studentName(student.getFirstName() + " " + student.getLastName())
                .regNo(student.getRegNo())
                .totalFee(student.getTotalFee())
                .paidFee(paidFee)
                .remainingFee(remainingFee)
                .build();
    }


    // Fee History by studentId
    @Override
    @Transactional(readOnly = true)
    public List<FeeHistoryResponse> getFeeHistory(Long studentId) {

        Student student = studentRepository.findByIdAndActiveTrue(studentId)
                        .orElseThrow(() -> new BadRequestException("Student not found"));

        return feePaymentRepository
                .findByStudentIdOrderByPaymentDateDesc(student.getId())
                .stream()
                .map(payment -> FeeHistoryResponse.builder()
                                .paymentId(payment.getId())
                                .amountPaid(payment.getAmountPaid())
                                .paymentDate(payment.getPaymentDate())
                                .paymentMode(payment.getPaymentMode())
                                .remarks(payment.getRemarks())
                                .build()
                )
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResult<PendingFeeResponse> getPendingFees(
            PendingFeeSearchRequest request
    ) {

        PendingFeeFilterRequest filters =
                request.getFilters() == null
                        ? new PendingFeeFilterRequest()
                        : request.getFilters();

        int page =
                Math.max(
                        request.getCurrentPage() - 1,
                        0
                );

        int size =
                request.getPageSize();

        String sortField =
                (request.getSortBy() == null
                        || request.getSortBy().isBlank())
                        ? "!createdAt"
                        : request.getSortBy();

        Sort sort =
                sortField.startsWith("!")
                        ? Sort.by(sortField.substring(1)).descending()
                        : Sort.by(sortField).ascending();

        Specification<Student> specification =
                PendingFeeSpecification.build(filters);

        List<Student> students =
                studentRepository.findAll(
                        specification,
                        sort
                );

        List<PendingFeeResponse> responses =
                students.stream()

                        .map(student -> {

                            BigDecimal paidFee =
                                    student.getFeePayments()
                                            .stream()
                                            .map(FeePayment::getAmountPaid)
                                            .reduce(
                                                    BigDecimal.ZERO,
                                                    BigDecimal::add
                                            );

                            BigDecimal remainingFee =
                                    student.getTotalFee()
                                            .subtract(paidFee);

                            return PendingFeeResponse.builder()
                                    .studentId(student.getId())
                                    .regNo(student.getRegNo())
                                    .studentName(
                                            student.getFirstName()
                                                    + " "
                                                    + student.getLastName()
                                    )
                                    .totalFee(student.getTotalFee())
                                    .paidFee(paidFee)
                                    .remainingFee(remainingFee)
                                    .build();
                        })

                        .filter(response ->
                                response.getRemainingFee()
                                        .compareTo(BigDecimal.ZERO) > 0
                        )

                        .toList();

        int totalElements = responses.size();

        int totalPages =
                (int) Math.ceil(
                        (double) totalElements / size
                );

        int start = page * size;

        int end =
                Math.min(
                        start + size,
                        totalElements
                );

        List<PendingFeeResponse> pageContent =
                start >= totalElements
                        ? Collections.emptyList()
                        : responses.subList(start, end);

        return new PageResult<>(

                pageContent,

                page + 1,

                totalPages,

                totalElements,

                size
        );
    }
}