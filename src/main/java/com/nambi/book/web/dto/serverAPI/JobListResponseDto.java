package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Animal;
import com.nambi.book.domain.ServerAPI.Job;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class JobListResponseDto {

    private int idx;
    private String code;
    private String code2;
    private String name;
    private String jobAttr1;
    private String jobAttr1Nm;
    private String jobAttr2;
    private String jobAttr2Nm;
    private String jobAttr3;
    private String jobAttr3Nm;
    private String jobAttr4;
    private String jobAttr4Nm;
    private String weapon;
    private int jobLevel;
    private String skillList;

    public JobListResponseDto(Job entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.code2 = entity.getCode2();
        this.name = entity.getName();
        this.jobAttr1 = entity.getJobAttr1();
        this.jobAttr1Nm = entity.getJobAttr1Nm();
        this.jobAttr2 = entity.getJobAttr2();
        this.jobAttr2Nm = entity.getJobAttr2Nm();
        this.jobAttr3 = entity.getJobAttr3();
        this.jobAttr3Nm = entity.getJobAttr3Nm();
        this.jobAttr4 = entity.getJobAttr4();
        this.jobAttr4Nm = entity.getJobAttr4Nm();
        this.weapon = entity.getWeapon();
        this.jobLevel = entity.getJobLevel();
        this.skillList = entity.getSkillList();
    }
}
