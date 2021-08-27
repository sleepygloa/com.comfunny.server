package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Monster;
import com.nambi.book.domain.ServerAPI.Stage;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class MonsterListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String tribe;
    private String spHorse;
    private String spEye;
    private String spHair;
    private String spMustache;
    private String spHelm;
    private String spCloth;
    private String spFoot;
    private String spArmor;
    private String spBack;
    private String spLhand;
    private String spRhand;
    private int atkType;
    private int atkRange;
    private float atk;
    private float def;
    private float hp;
    private float atkSpd;
    private float spd;
    private float critDamPer;
    private float critDamVal;
    private int atkPriord;
    private int monsterGold;
    private int monsterExp;
    private int liveDuration;
    private float refCombatPower;

    public MonsterListResponseDto(Monster entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.tribe = entity.getTribe();
        this.spHorse = entity.getSpHorse();
        this.spEye = entity.getSpEye();
        this.spHair = entity.getSpHair();
        this.spMustache = entity.getSpMustache();
        this.spHelm = entity.getSpHelm();
        this.spCloth = entity.getSpCloth();
        this.spFoot = entity.getSpFoot();
        this.spArmor = entity.getSpArmor();
        this.spBack = entity.getSpBack();
        this.spLhand = entity.getSpLhand();
        this.spRhand = entity.getSpRhand();
        this.atkType = entity.getAtkType();
        this.atkRange = entity.getAtkRange();
        this.atk = entity.getAtk();
        this.def = entity.getDef();
        this.hp = entity.getHp();
        this.atkSpd = entity.getAtkSpd();
        this.spd = entity.getSpd();
        this.critDamPer = entity.getCritDamPer();
        this.critDamVal = entity.getCritDamVal();
        this.atkPriord = entity.getAtkPriord();
        this.monsterGold = entity.getMonsterGold();
        this.monsterExp = entity.getMonsterExp();
        this.liveDuration = entity.getLiveDuration();
        this.refCombatPower = entity.getRefCombatPower();
    }

}
