package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Exp;
import com.nambi.book.domain.ServerAPI.Grade;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class ExpListResponseDto {

    private int idx;
    private String code;
    private int level;
    private float reqExp;
    private float totalExp;

    public ExpListResponseDto(Exp entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.level = entity.getLevel();
        this.reqExp = entity.getReqExp();
        this.totalExp = entity.getTotalExp();
    }
}
