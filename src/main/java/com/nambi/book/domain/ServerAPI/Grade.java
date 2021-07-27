package com.nambi.book.domain.ServerAPI;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Grade {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String grade;

    @Column(length = 100, nullable = false)
    private String name;

    @Builder
    public Grade(int idx, String code, String grade, String name) {
        this.idx = idx;
        this.code = code;
        this.grade = grade;
        this.name = name;
    }
}
