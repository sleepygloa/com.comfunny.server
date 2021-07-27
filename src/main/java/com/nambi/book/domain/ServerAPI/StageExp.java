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
public class StageExp {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private int stageLevel;

    @Column(length = 100, nullable = false)
    private int nopartsMonsterCnt;

    @Column(length = 100, nullable = false)
    private int nopartsExp;

    @Column(length = 100, nullable = false)
    private int nopartsGold;

    @Column(length = 100, nullable = false)
    private int onepartsMonsterCnt;

    @Column(length = 100, nullable = false)
    private int onepartsExp;

    @Column(length = 100, nullable = false)
    private int onepartsGold;

    @Column(length = 100, nullable = false)
    private int twopartsMonsterCnt;

    @Column(length = 100, nullable = false)
    private int twopartsExp;

    @Column(length = 100, nullable = false)
    private int twopartsGold;

    @Column(length = 100, nullable = false)
    private int middleBossMonsterCnt;

    @Column(length = 100, nullable = false)
    private int middleBossExp;

    @Column(length = 100, nullable = false)
    private int middleBossGold;

    @Column(length = 100, nullable = false)
    private int bossMonsterCnt;

    @Column(length = 100, nullable = false)
    private int bossExp;

    @Column(length = 100, nullable = false)
    private int bossGold;

    @Builder
    public StageExp(int idx, String code, int stageLevel, int nopartsMonsterCnt, int nopartsExp, int nopartsGold, int onepartsMonsterCnt, int onepartsExp, int onepartsGold, int twopartsMonsterCnt, int twopartsExp, int twopartsGold, int middleBossMonsterCnt, int middleBossExp, int middleBossGold, int bossMonsterCnt, int bossExp, int bossGold) {
        this.idx = idx;
        this.code = code;
        this.stageLevel = stageLevel;
        this.nopartsMonsterCnt = nopartsMonsterCnt;
        this.nopartsExp = nopartsExp;
        this.nopartsGold = nopartsGold;
        this.onepartsMonsterCnt = onepartsMonsterCnt;
        this.onepartsExp = onepartsExp;
        this.onepartsGold = onepartsGold;
        this.twopartsMonsterCnt = twopartsMonsterCnt;
        this.twopartsExp = twopartsExp;
        this.twopartsGold = twopartsGold;
        this.middleBossMonsterCnt = middleBossMonsterCnt;
        this.middleBossExp = middleBossExp;
        this.middleBossGold = middleBossGold;
        this.bossMonsterCnt = bossMonsterCnt;
        this.bossExp = bossExp;
        this.bossGold = bossGold;
    }
}
