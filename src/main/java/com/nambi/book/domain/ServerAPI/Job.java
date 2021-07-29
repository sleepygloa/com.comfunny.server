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
public class Job {

    @Id
    private int idx;

    @Column(length = 100)
    private String code;

    @Column(length = 100)
    private String code2;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String jobAttr1;

    @Column(name = "JOB_ATTR1_NM", length = 100)
    private String jobAttr1Nm;

    @Column(length = 100)
    private String jobAttr2;

    @Column(name = "JOB_ATTR2_NM", length = 100)
    private String jobAttr2Nm;

    @Column(length = 100)
    private String jobAttr3;

    @Column(name = "JOB_ATTR3_NM", length = 100)
    private String jobAttr3Nm;

    @Column(length = 100)
    private String jobAttr4;

    @Column(name = "JOB_ATTR4_NM", length = 100)
    private String jobAttr4Nm;

    @Column(length = 100)
    private String weapon;

    @Column(length = 100)
    private int jobLevel;

    @Column(length = 100)
    private String skillList;

    @Builder
    public Job(int idx, String code, String code2, String name, String jobAttr1, String jobAttr1Nm, String jobAttr2, String jobAttr2Nm, String jobAttr3, String jobAttr3Nm, String jobAttr4, String jobAttr4Nm, String weapon, int jobLevel, String skillList) {
        this.idx = idx;
        this.code = code;
        this.code2 = code2;
        this.name = name;
        this.jobAttr1 = jobAttr1;
        this.jobAttr1Nm = jobAttr1Nm;
        this.jobAttr2 = jobAttr2;
        this.jobAttr2Nm = jobAttr2Nm;
        this.jobAttr3 = jobAttr3;
        this.jobAttr3Nm = jobAttr3Nm;
        this.jobAttr4 = jobAttr4;
        this.jobAttr4Nm = jobAttr4Nm;
        this.weapon = weapon;
        this.jobLevel = jobLevel;
        this.skillList = skillList;
    }
}
