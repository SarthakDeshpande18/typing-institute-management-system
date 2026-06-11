package com.typinginstitute.backend.dto.response;

import lombok.*;

import java.util.List;

@Getter @Setter
@Data
public class PageResult<T> {
    private List<T> results;
    private int currentPage;
    private int totalPages;
    private long totalCount;
    private int pageSize;

    public PageResult() {
    }

    public PageResult(List<T> results,
                      int currentPage,
                      int totalPages,
                      long totalCount,
                      int pageSize) {
        this.results = results;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalCount = totalCount;
        this.pageSize = pageSize;
    }
}
