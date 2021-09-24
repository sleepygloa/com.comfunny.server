package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.ItemGrade;
import lombok.Getter;


@Getter
public class ItemGradeListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String path;
    private String grade;
    private String category4;
    private float price;
    private String desc;
    private float frAtk;
    private String toAtk;
    private float frDef;
    private String toDef;
    private float str;
    private float dex;
    private float intt;
    private float fth;
    private float vit;
    private float hp;
    private float maxHp;
    private float regen;
    private float duration;
    private float skillCool;
    private float atkSpd;
    private float atkRange;
    private float critDamPer;
    private float critDamVal;
    private float skillDamVal;
    private float count;
    private String ccAttr;
    private String ccAttr2;
    private float ccFrVal;
    private float ccToVal;
    private float ccFrVal2;
    private float ccToVal2;
    private String ucAttr;
    private String ucAttr2;
    private float ucFrVal;
    private float ucToVal;
    private float ucFrVal2;
    private float ucToVal2;
    private String mmAttr;
    private String mmAttr2;
    private float mmFrVal;
    private float mmToVal;
    private float mmFrVal2;
    private float mmToVal2;
    private String eeAttr;
    private String eeAttr2;
    private float eeFrVal;
    private float eeToVal;
    private float eeFrVal2;
    private float eeToVal2;

    public ItemGradeListResponseDto(ItemGrade entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.path = entity.getPath();
        this.grade = entity.getGrade();
        this.price = entity.getPrice();
        this.desc = entity.getDesc();
        this.category4 = entity.getCategory4();

        this.frAtk = entity.getFrAtk();
        this.toAtk = entity.getToAtk();
        this.frDef = entity.getFrDef();
        this.toDef = entity.getToDef();
        this.str = entity.getStr();
        this.dex = entity.getDex();
        this.intt = entity.getIntt();
        this.fth = entity.getFth();
        this.vit = entity.getVit();

        this.hp = entity.getHp();
        this.maxHp = entity.getMaxHp();
        this.regen = entity.getRegen();
        this.duration = entity.getDuration();
        this.skillCool = entity.getSkillCool();
        this.atkSpd = entity.getAtkSpd();
        this.atkRange = entity.getAtkRange();
        this.critDamPer = entity.getCritDamPer();
        this.critDamVal = entity.getCritDamVal();
        this.skillDamVal = entity.getSkillDamVal();
        this.count = entity.getCount();

        this.ccAttr = entity.getCcAttr();
        this.ccAttr2 = entity.getCcAttr2();
        this.ccFrVal = entity.getCcFrVal();
        this.ccToVal = entity.getCcFrVal2();
        this.ccFrVal2 = entity.getCcFrVal2();
        this.ccToVal2 = entity.getCcToVal2();

        this.ucAttr = entity.getUcAttr();
        this.ucAttr = entity.getUcAttr2();
        this.ucFrVal = entity.getUcFrVal();
        this.ucToVal = entity.getUcToVal();
        this.ucFrVal2 = entity.getUcFrVal2();
        this.ucToVal2 = entity.getUcToVal2();

        this.mmAttr = entity.getMmAttr();
        this.mmAttr2 = entity.getMmAttr2();
        this.mmFrVal = entity.getMmFrVal();
        this.mmToVal = entity.getMmToVal();
        this.mmFrVal2 = entity.getMmFrVal2();
        this.mmToVal2 = entity.getMmToVal2();

        this.eeAttr = entity.getEeAttr();
        this.eeAttr2 = entity.getEeAttr2();
        this.eeFrVal = entity.getEeFrVal();
        this.eeToVal = entity.getEeToVal();
        this.eeFrVal2 = entity.getEeFrVal2();
        this.eeToVal2 = entity.getEeToVal2();

    }
}
