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
public class Equip {

    @Id
    private int idx;

    @Column
    private String code;
    @Column
    private String name;
    @Column
    private String path;
    @Column
    private String desc;
    @Column
    private String category4;
    @Column
    private float atkRange;
    @Column
    private float atkSpd;
    @Column
    private String atk;
    @Column
    private String def;
    @Column
    private float frAtk;
    @Column
    private float toAtk;

    @Column
    private float frDef;
    @Column
    private float toDef;
    @Column
    private float maxHp;
    @Column
    private String cType;
    @Column
    private String cAttr;
    @Column
    private int cPrice;
    @Column
    private float cFrVal;
    @Column
    private float cToVal;

    @Column
    private String ucType;
    @Column
    private String ucAttr;
    @Column
    private int ucPrice;
    @Column
    private float ucFrVal;
    @Column
    private float ucToVal;


    @Column
    private String mType;
    @Column
    private String mAttr;
    @Column
    private int mPrice;
    @Column
    private float mFrVal;
    @Column
    private float mToVal;


    @Column
    private String eType;
    @Column
    private String eAttr;
    @Column
    private int ePrice;
    @Column
    private float eFrVal;
    @Column
    private float eToVal;

    @Builder

    public Equip(int idx, String code, String name, String path, String desc, String category4, float atkRange, float atkSpd, String atk, String def, float frAtk, float toAtk, float frDef, float toDef, float maxHp, String cType, String cAttr, int cPrice, float cFrVal, float cToVal, String ucType, String ucAttr, int ucPrice, float ucFrVal, float ucToVal, String mType, String mAttr, int mPrice, float mFrVal, float mToVal, String eType, String eAttr, int ePrice, float eFrVal, float eToVal) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.path = path;
        this.desc = desc;
        this.category4 = category4;
        this.atkRange = atkRange;
        this.atkSpd = atkSpd;
        this.atk = atk;
        this.def = def;
        this.frAtk = frAtk;
        this.toAtk = toAtk;
        this.frDef = frDef;
        this.toDef = toDef;
        this.maxHp = maxHp;
        this.cType = cType;
        this.cAttr = cAttr;
        this.cPrice = cPrice;
        this.cFrVal = cFrVal;
        this.cToVal = cToVal;
        this.ucType = ucType;
        this.ucAttr = ucAttr;
        this.ucPrice = ucPrice;
        this.ucFrVal = ucFrVal;
        this.ucToVal = ucToVal;
        this.mType = mType;
        this.mAttr = mAttr;
        this.mPrice = mPrice;
        this.mFrVal = mFrVal;
        this.mToVal = mToVal;
        this.eType = eType;
        this.eAttr = eAttr;
        this.ePrice = ePrice;
        this.eFrVal = eFrVal;
        this.eToVal = eToVal;
    }
}
