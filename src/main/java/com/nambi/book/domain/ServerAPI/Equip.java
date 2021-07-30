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
    @Column(name = "C_TYPE")
    private String ccType;
    @Column(name = "C_ATTR")
    private String ccAttr;
    @Column(name = "C_PRICE")
    private int ccPrice;
    @Column(name = "C_FR_VAL")
    private float ccFrVal;
    @Column(name = "C_TO_VAL")
    private float ccToVal;

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


    @Column(name = "M_TYPE")
    private String mmType;
    @Column(name = "M_ATTR")
    private String mmAttr;
    @Column(name = "M_PRICE")
    private int mmPrice;
    @Column(name = "M_FR_VAL")
    private float mmFrVal;
    @Column(name = "M_TO_VAL")
    private float mmToVal;


    @Column(name = "E_TYPE")
    private String eeType;
    @Column(name = "E_ATTR")
    private String eeAttr;
    @Column(name = "E_PRICE")
    private int eePrice;
    @Column(name = "E_FR_VAL")
    private float eeFrVal;
    @Column(name = "E_TO_VAL")
    private float eeToVal;

    @Builder
    public Equip(int idx, String code, String name, String path, String desc, String category4, float atkRange, float atkSpd, String atk, String def, float frAtk, float toAtk, float frDef, float toDef, float maxHp, String ccType, String ccAttr, int ccPrice, float ccFrVal, float ccToVal, String ucType, String ucAttr, int ucPrice, float ucFrVal, float ucToVal, String mmType, String mmAttr, int mmPrice, float mmFrVal, float mmToVal, String eeType, String eeAttr, int eePrice, float eeFrVal, float eeToVal) {
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
        this.ccType = ccType;
        this.ccAttr = ccAttr;
        this.ccPrice = ccPrice;
        this.ccFrVal = ccFrVal;
        this.ccToVal = ccToVal;
        this.ucType = ucType;
        this.ucAttr = ucAttr;
        this.ucPrice = ucPrice;
        this.ucFrVal = ucFrVal;
        this.ucToVal = ucToVal;
        this.mmType = mmType;
        this.mmAttr = mmAttr;
        this.mmPrice = mmPrice;
        this.mmFrVal = mmFrVal;
        this.mmToVal = mmToVal;
        this.eeType = eeType;
        this.eeAttr = eeAttr;
        this.eePrice = eePrice;
        this.eeFrVal = eeFrVal;
        this.eeToVal = eeToVal;
    }
}
