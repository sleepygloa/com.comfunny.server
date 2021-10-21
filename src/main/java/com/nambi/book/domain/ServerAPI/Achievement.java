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
public class Achievement {

    @Id
    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String codeGroupCd;

    @Column(length = 100, nullable = false)
    private String codeGroupNm;

    @Column(length = 10, nullable = false)
    private int order;

    @Column(length = 100, nullable = false)
    private int achievementCondition;

    @Column(length = 100, nullable = false)
    private String achievementConditionNm;

    @Builder
    public Achievement(String code, String name, String codeGroupCd, String codeGroupNm, int order, int achievementCondition, String achievementConditionNm) {
        this.code = code;
        this.name = name;
        this.codeGroupCd = codeGroupCd;
        this.codeGroupNm = codeGroupNm;
        this.order = order;
        this.achievementCondition = achievementCondition;
        this.achievementConditionNm = achievementConditionNm;
    }
}
