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
    private String cAttr;
    private String cAttr2;
    private float cFrVal;
    private float cToVal;
    private float cFrVal2;
    private float cToVal2;
    private String ucAttr;
    private String ucAttr2;
    private float ucFrVal;
    private float ucToVal;
    private float ucFrVal2;
    private float ucToVal2;
    private String mAttr;
    private String mAttr2;
    private float mFrVal;
    private float mToVal;
    private float mFrVal2;
    private float mToVal2;
    private String eAttr;
    private String eAttr2;
    private float eFrVal;
    private float eToVal;
    private float eFrVal2;
    private float eToVal2;

    public ItemGradeListResponseDto(ItemGrade entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.path = entity.getPath();
        this.grade = entity.getGrade();
        this.price = entity.getPrice();
        this.desc = entity.getDesc();

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

        this.cAttr = entity.getCAttr();
        this.cAttr2 = entity.getCAttr2();
        this.cFrVal = entity.getCFrVal();
        this.cToVal = entity.getCFrVal2();
        this.cFrVal2 = entity.getCFrVal2();
        this.cToVal2 = entity.getCToVal2();

        this.ucAttr = entity.getUcAttr();
        this.ucAttr = entity.getUcAttr2();
        this.ucFrVal = entity.getUcFrVal();
        this.ucToVal = entity.getUcToVal();
        this.ucFrVal2 = entity.getUcFrVal2();
        this.ucToVal2 = entity.getUcToVal2();

        this.mAttr = entity.getMAttr();
        this.mAttr2 = entity.getMAttr2();
        this.mFrVal = entity.getMFrVal();
        this.mToVal = entity.getMToVal();
        this.mFrVal2 = entity.getMFrVal2();
        this.mToVal2 = entity.getMToVal2();

        this.eAttr = entity.getEAttr();
        this.eAttr2 = entity.getEAttr2();
        this.eFrVal = entity.getEFrVal();
        this.eToVal = entity.getEToVal();
        this.eFrVal2 = entity.getEFrVal2();
        this.eToVal2 = entity.getEToVal2();

    }
}
