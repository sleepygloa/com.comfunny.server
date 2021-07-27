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
public class DropChance {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String codeGroup;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String category1;

    @Column(length = 100, nullable = false)
    private String grade;

    @Column(length = 100, nullable = false)
    private String type;

    @Column(length = 7, nullable = false)
    private float percent;


    @Builder
    public DropChance(int idx, String code, String codeGroup, String name, String category1, String grade, String type, float percent) {
        this.idx = idx;
        this.code = code;
        this.codeGroup = codeGroup;
        this.name = name;
        this.category1 = category1;
        this.grade = grade;
        this.type = type;
        this.percent = percent;
    }
}
