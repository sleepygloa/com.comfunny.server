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
    private String ccType;
    private String ccAttr;
    private int ccPrice;
    private float ccFrVal;
    private float ccToVal;

    private String ucType;
    private String ucAttr;
    private int ucPrice;
    private float ucFrVal;
    private float ucToVal;

    private String mmType;
    private String mmAttr;
    private int mmPrice;
    private float mmFrVal;
    private float mmToVal;

    private String eeType;
    private String eeAttr;
    private int eePrice;
    private float eeFrVal;
    private float eeToVal;

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
        this.ccType = entity.getCcType();
        this.ccAttr = entity.getCcAttr();
        this.ccPrice = entity.getCcPrice();
        this.ccFrVal = entity.getCcFrVal();
        this.ccToVal = entity.getCcToVal();
        this.ucType = entity.getUcType();
        this.ucAttr = entity.getUcAttr();
        this.ucPrice = entity.getUcPrice();
        this.ucFrVal = entity.getUcFrVal();
        this.ucToVal = entity.getUcToVal();
        this.mmType = entity.getMmType();
        this.mmAttr = entity.getMmAttr();
        this.mmPrice = entity.getMmPrice();
        this.mmFrVal = entity.getMmFrVal();
        this.mmToVal = entity.getMmToVal();
        this.eeType = entity.getEeType();
        this.eeAttr = entity.getEeAttr();
        this.eePrice = entity.getEePrice();
        this.eeFrVal = entity.getEeFrVal();
        this.eeToVal = entity.getEeToVal();
    }
}
