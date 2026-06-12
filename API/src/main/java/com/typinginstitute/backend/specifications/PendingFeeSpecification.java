package com.typinginstitute.backend.specifications;

import com.typinginstitute.backend.dto.request.PendingFeeFilterRequest;
import com.typinginstitute.backend.entity.Student;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;


public class PendingFeeSpecification {

    public static Specification<Student> build(
            PendingFeeFilterRequest filters
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            predicates.add(
                    cb.isTrue(root.get("active"))
            );

            if (filters.getStudentName() != null
                    && !filters.getStudentName().isBlank()) {

                predicates.add(
                        cb.or(

                                cb.like(
                                        cb.lower(
                                                root.get("firstName")
                                        ),
                                        "%" +
                                                filters.getStudentName()
                                                        .toLowerCase()
                                                + "%"
                                ),

                                cb.like(
                                        cb.lower(
                                                root.get("lastName")
                                        ),
                                        "%" +
                                                filters.getStudentName()
                                                        .toLowerCase()
                                                + "%"
                                )
                        )
                );
            }

            if (filters.getRegNo() != null
                    && !filters.getRegNo().isBlank()) {

                predicates.add(
                        cb.equal(
                                root.get("regNo"),
                                filters.getRegNo()
                        )
                );
            }

            return cb.and(
                    predicates.toArray(
                            new Predicate[0]
                    )
            );
        };
    }
}