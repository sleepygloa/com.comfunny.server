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
public class Exp {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private int level;

    @Column(length = 100, nullable = false)
    private float reqExp;

    @Column(length = 100, nullable = false)
    private float totalExp;

    @Builder
    public Exp(int idx, String code, int level, float reqExp, float totalExp) {
        this.idx = idx;
        this.code = code;
        this.level = level;
        this.reqExp = reqExp;
        this.totalExp = totalExp;
    }
}
