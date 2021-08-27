package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Stage;
import com.nambi.book.domain.ServerAPI.StageExp;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class StageListResponseDto {

    private int stage;
    private String unit0;
    private int unit0Cnt;
    private String unit1;
    private int unit1Cnt;
    private String unit2;
    private int unit2Cnt;
    private String unit3;
    private int unit3Cnt;
    private String unit4;
    private int unit4Cnt;
    private String unit5;
    private int unit5Cnt;
    private String unit6;
    private int unit6Cnt;
    private String unit7;
    private int unit7Cnt;
    private String unit8;
    private int unit8Cnt;
    private String unit9;
    private int unit9Cnt;
    private int eliteMonsterCnt;
    private int bossMonsterCnt;
    private int specialMonsterCnt;
    private long normalMonsterExp;
    private long eliteMonsterExp;
    private long bossMonsterExp;
    private long specialMonsterExp;
    private long dbAqExp;
    private long dbSumAqExp;
    private long normalMonsterGold;
    private long eliteMonsterGold;
    private long bossMonsterGold;
    private long specialMonsterGold;
    private long dbAqGold;
    private long dbSumAqGold;

    public StageListResponseDto(Stage entity) {
        this.stage = entity.getStage();
        this.unit0 = entity.getUnit0();
        this.unit0Cnt = entity.getUnit0Cnt();
        this.unit1 = entity.getUnit1();
        this.unit1Cnt = entity.getUnit1Cnt();
        this.unit2 = entity.getUnit2();
        this.unit2Cnt = entity.getUnit2Cnt();
        this.unit3 = entity.getUnit3();
        this.unit3Cnt = entity.getUnit3Cnt();
        this.unit4 = entity.getUnit4();
        this.unit4Cnt = entity.getUnit4Cnt();
        this.unit5 = entity.getUnit5();
        this.unit5Cnt = entity.getUnit5Cnt();
        this.unit6 = entity.getUnit6();
        this.unit6Cnt = entity.getUnit6Cnt();
        this.unit7 = entity.getUnit7();
        this.unit7Cnt = entity.getUnit7Cnt();
        this.unit8 = entity.getUnit8();
        this.unit8Cnt = entity.getUnit8Cnt();
        this.unit9 = entity.getUnit9();
        this.unit9Cnt = entity.getUnit9Cnt();
        this.eliteMonsterCnt = entity.getEliteMonsterCnt();
        this.bossMonsterCnt = entity.getBossMonsterCnt();
        this.specialMonsterCnt = entity.getSpecialMonsterCnt();
        this.normalMonsterExp = entity.getNormalMonsterExp();
        this.eliteMonsterExp = entity.getEliteMonsterExp();
        this.bossMonsterExp = entity.getBossMonsterExp();
        this.specialMonsterExp = entity.getSpecialMonsterExp();
        this.dbAqExp = entity.getDbAqExp();
        this.dbSumAqExp = entity.getDbSumAqExp();
        this.normalMonsterGold = entity.getNormalMonsterGold();
        this.eliteMonsterGold = entity.getEliteMonsterGold();
        this.bossMonsterGold = entity.getBossMonsterGold();
        this.specialMonsterGold = entity.getSpecialMonsterGold();
        this.dbAqGold = entity.getDbAqGold();
        this.dbSumAqGold = entity.getDbSumAqGold();
    }

}
