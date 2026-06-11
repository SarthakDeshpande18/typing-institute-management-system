package com.typinginstitute.backend.specifications;

import com.typinginstitute.backend.dto.request.StudentFilterRequest;
import com.typinginstitute.backend.entity.Student;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

public class StudentSpecification {

    public static Specification<Student> build(
            StudentFilterRequest filters
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            predicates.add(
                    cb.isTrue(root.get("active"))
            );

            if (filters.getFirstName() != null &&
                    !filters.getFirstName().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("firstName")),
                                "%" +
                                        filters.getFirstName().toLowerCase()
                                        + "%"
                        )
                );
            }

            if (filters.getMobileNo() != null &&
                    !filters.getMobileNo().isBlank()) {

                predicates.add(
                        cb.equal(
                                root.get("mobileNo"),
                                filters.getMobileNo()
                        )
                );
            }

            if (filters.getRegNo() != null &&
                    !filters.getRegNo().isBlank()) {

                predicates.add(
                        cb.equal(
                                root.get("regNo"),
                                filters.getRegNo()
                        )
                );
            }

            if (filters.getSubject() != null) {

                predicates.add(
                        cb.equal(
                                root.get("subject"),
                                filters.getSubject()
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
