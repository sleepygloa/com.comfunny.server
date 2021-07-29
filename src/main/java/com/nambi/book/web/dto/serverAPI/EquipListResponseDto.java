package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Equip;
import com.nambi.book.domain.ServerAPI.Grade;
import lombok.Getter;

import javax.persistence.Id;

@Getter
public class EquipListResponseDto {


    private int idx;
    private String code;
    private String name;
    private String path;
    private String desc;
    private String category4;
    private float atkRange;
    private float atkSpd;
    private String atk;
    private String def;

    private float frAtk;
    private float toAtk;
    private float frDef;
    private float toDef;
    private float maxHp;
    private String cType;
    private String cAttr;
    private int cPrice;
    private float cFrVal;
    private float cToVal;

    private String ucType;
    private String ucAttr;
    private int ucPrice;
    private float ucFrVal;
    private float ucToVal;

    private String mType;
    private String mAttr;
    private int mPrice;
    private float mFrVal;
    private float mToVal;

    private String eType;
    private String eAttr;
    private int ePrice;
    private float eFrVal;
    private float eToVal;

    public EquipListResponseDto(Equip entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.path = entity.getPath();
        this.desc = entity.getPath();
        this.category4 = entity.getCategory4();
        this.atkRange = entity.getAtkRange();
        this.atkSpd = entity.getAtkSpd();
        this.atk = entity.getAtk();
        this.def = entity.getDef();
        this.frAtk = entity.getFrAtk();
        this.toAtk = entity.getToAtk();
        this.frDef = entity.getFrDef();
        this.toDef = entity.getToDef();
        this.maxHp = entity.getMaxHp();
        this.cType = entity.getCType();
        this.cAttr = entity.getCAttr();
        this.cPrice = entity.getCPrice();
        this.cFrVal = entity.getCFrVal();
        this.cToVal = entity.getCToVal();
        this.ucType = entity.getUcType();
        this.ucAttr = entity.getUcAttr();
        this.ucPrice = entity.getUcPrice();
        this.ucFrVal = entity.getUcFrVal();
        this.ucToVal = entity.getUcToVal();
        this.mType = entity.getMType();
        this.mAttr = entity.getMAttr();
        this.mPrice = entity.getMPrice();
        this.mFrVal = entity.getMFrVal();
        this.mToVal = entity.getMToVal();
        this.eType = entity.getEType();
        this.eAttr = entity.getEAttr();
        this.ePrice = entity.getEPrice();
        this.eFrVal = entity.getEFrVal();
        this.eToVal = entity.getEToVal();
    }
}
