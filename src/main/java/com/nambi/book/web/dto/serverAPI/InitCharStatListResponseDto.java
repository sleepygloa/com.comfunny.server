package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.InitCharStat;
import com.nambi.book.domain.ServerAPI.StageExp;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class InitCharStatListResponseDto {

    private int idx;
    private String code;
    private int str;
    private int dex;
    private int intt;
    private int fth;
    private int vit;

    public InitCharStatListResponseDto(InitCharStat entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.str = entity.getStr();
        this.dex = entity.getDex();
        this.intt = entity.getIntt();
        this.fth = entity.getFth();
        this.vit = entity.getVit();
    }
}
