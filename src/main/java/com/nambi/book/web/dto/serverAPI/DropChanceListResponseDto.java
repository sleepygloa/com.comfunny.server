package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Dictionary;
import com.nambi.book.domain.ServerAPI.DropChance;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class DropChanceListResponseDto {

    private int idx;
    private String code;
    private String codeGroup;
    private String name;
    private String category1;
    private String grade;
    private String type;
    private float percent;

    public DropChanceListResponseDto(DropChance entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.codeGroup = entity.getCodeGroup();
        this.name = entity.getName();
        this.category1 = entity.getCategory1();
        this.grade = entity.getGrade();
        this.type = entity.getType();
        this.percent = entity.getPercent();
    }
}
