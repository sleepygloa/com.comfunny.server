package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.DropChance;
import com.nambi.book.domain.ServerAPI.StageExp;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class StageExpListResponseDto {

    private int idx;
    private String code;
    private int stageLevel;
    private int nopartsMonsterCnt;
    private int nopartsExp;
    private int nopartsGold;
    private int onepartsMonsterCnt;
    private int onepartsExp;
    private int onepartsGold;
    private int twopartsMonsterCnt;
    private int twopartsExp;
    private int twopartsGold;
    private int middleBossMonsterCnt;
    private int middleBossExp;
    private int middleBossGold;
    private int bossMonsterCnt;
    private int bossExp;
    private int bossGold;

    public StageExpListResponseDto(StageExp entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.stageLevel = entity.getStageLevel();
        this.nopartsMonsterCnt = entity.getNopartsMonsterCnt();
        this.nopartsExp = entity.getNopartsExp();
        this.nopartsGold = entity.getNopartsGold();
        this.onepartsMonsterCnt = entity.getOnepartsMonsterCnt();
        this.onepartsExp = entity.getOnepartsExp();
        this.onepartsGold = entity.getOnepartsGold();
        this.twopartsMonsterCnt = entity.getTwopartsMonsterCnt();
        this.twopartsExp = entity.getTwopartsExp();
        this.twopartsGold = entity.getTwopartsGold();
        this.middleBossMonsterCnt = entity.getMiddleBossMonsterCnt();
        this.middleBossExp = entity.getMiddleBossExp();
        this.middleBossGold = entity.getMiddleBossGold();
        this.bossMonsterCnt = entity.getBossMonsterCnt();
        this.bossExp = entity.getBossExp();
        this.bossGold = entity.getBossGold();
    }
}
