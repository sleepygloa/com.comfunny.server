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
public class Stage {

    @Id
    @Column(length = 11, nullable = false)
    private int stage;

    @Column(length = 20, nullable = true)
    private String unit0;

    @Column(length = 11, nullable = false)
    private int unit0Cnt;

    @Column(length = 20, nullable = true)
    private String unit1;

    @Column(length = 11, nullable = false)
    private int unit1Cnt;

    @Column(length = 20, nullable = true)
    private String unit2;

    @Column(length = 11, nullable = false)
    private int unit2Cnt;

    @Column(length = 20, nullable = true)
    private String unit3;

    @Column(length = 11, nullable = false)
    private int unit3Cnt;

    @Column(length = 20, nullable = true)
    private String unit4;

    @Column(length = 11, nullable = false)
    private int unit4Cnt;

    @Column(length = 20, nullable = true)
    private String unit5;

    @Column(length = 11, nullable = false)
    private int unit5Cnt;

    @Column(length = 20, nullable = true)
    private String unit6;

    @Column(length = 11, nullable = false)
    private int unit6Cnt;

    @Column(length = 20, nullable = true)
    private String unit7;

    @Column(length = 11, nullable = false)
    private int unit7Cnt;

    @Column(length = 20, nullable = true)
    private String unit8;

    @Column(length = 11, nullable = false)
    private int unit8Cnt;

    @Column(length = 20, nullable = true)
    private String unit9;

    @Column(length = 11, nullable = false)
    private int unit9Cnt;

    @Column(length = 20, nullable = false)
    private int eliteMonsterCnt;

    @Column(length = 20, nullable = false)
    private int bossMonsterCnt;

    @Column(length = 20, nullable = false)
    private int specialMonsterCnt;

    @Column(length = 20, nullable = false)
    private long normalMonsterExp;

    @Column(length = 20, nullable = false)
    private long eliteMonsterExp;

    @Column(length = 20, nullable = false)
    private long bossMonsterExp;

    @Column(length = 20, nullable = false)
    private long specialMonsterExp;

    @Column(length = 20, nullable = false)
    private long dbAqExp;

    @Column(length = 20, nullable = false)
    private long dbSumAqExp;

    @Column(length = 20, nullable = false)
    private long normalMonsterGold;

    @Column(length = 20, nullable = false)
    private long eliteMonsterGold;

    @Column(length = 20, nullable = false)
    private long bossMonsterGold;

    @Column(length = 20, nullable = false)
    private long specialMonsterGold;

    @Column(length = 20, nullable = false)
    private long dbAqGold;

    @Column(length = 20, nullable = false)
    private long dbSumAqGold;

    @Builder
    public Stage(int stage, String unit0, int unit0Cnt, String unit1, int unit1Cnt, String unit2, int unit2Cnt, String unit3, int unit3Cnt, String unit4, int unit4Cnt, String unit5, int unit5Cnt, String unit6, int unit6Cnt, String unit7, int unit7Cnt, String unit8, int unit8Cnt, String unit9, int unit9Cnt, int eliteMonsterCnt, int bossMonsterCnt, int specialMonsterCnt, long normalMonsterExp, long eliteMonsterExp, long bossMonsterExp, long specialMonsterExp, long dbAqExp, long dbSumAqExp, long normalMonsterGold, long eliteMonsterGold, long bossMonsterGold, long specialMonsterGold, long dbAqGold, long dbSumAqGold) {
        this.stage = stage;
        this.unit0 = unit0;
        this.unit0Cnt = unit0Cnt;
        this.unit1 = unit1;
        this.unit1Cnt = unit1Cnt;
        this.unit2 = unit2;
        this.unit2Cnt = unit2Cnt;
        this.unit3 = unit3;
        this.unit3Cnt = unit3Cnt;
        this.unit4 = unit4;
        this.unit4Cnt = unit4Cnt;
        this.unit5 = unit5;
        this.unit5Cnt = unit5Cnt;
        this.unit6 = unit6;
        this.unit6Cnt = unit6Cnt;
        this.unit7 = unit7;
        this.unit7Cnt = unit7Cnt;
        this.unit8 = unit8;
        this.unit8Cnt = unit8Cnt;
        this.unit9 = unit9;
        this.unit9Cnt = unit9Cnt;
        this.eliteMonsterCnt = eliteMonsterCnt;
        this.bossMonsterCnt = bossMonsterCnt;
        this.specialMonsterCnt = specialMonsterCnt;
        this.normalMonsterExp = normalMonsterExp;
        this.eliteMonsterExp = eliteMonsterExp;
        this.bossMonsterExp = bossMonsterExp;
        this.specialMonsterExp = specialMonsterExp;
        this.dbAqExp = dbAqExp;
        this.dbSumAqExp = dbSumAqExp;
        this.normalMonsterGold = normalMonsterGold;
        this.eliteMonsterGold = eliteMonsterGold;
        this.bossMonsterGold = bossMonsterGold;
        this.specialMonsterGold = specialMonsterGold;
        this.dbAqGold = dbAqGold;
        this.dbSumAqGold = dbSumAqGold;
    }
}
