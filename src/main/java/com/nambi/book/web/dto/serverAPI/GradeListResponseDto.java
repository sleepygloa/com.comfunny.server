package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Grade;
import com.nambi.book.domain.ServerAPI.StageExp;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class GradeListResponseDto {

    private int idx;
    private String code;
    private String grade;
    private String name;

    public GradeListResponseDto(Grade entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.grade = entity.getGrade();
        this.name = entity.getName();
    }
}
