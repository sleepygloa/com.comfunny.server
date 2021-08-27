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
public class Monster {

    @Id
    @Column(length = 11, nullable = false)
    private int idx;

    @Column(length = 20, nullable = false)
    private String code;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String tribe;

    @Column(length = 20, nullable = false)
    private String spHorse;

    @Column(length = 20, nullable = false)
    private String spEye;

    @Column(length = 20, nullable = false)
    private String spHair;

    @Column(length = 20, nullable = false)
    private String spMustache;

    @Column(length = 20, nullable = false)
    private String spHelm;

    @Column(length = 20, nullable = false)
    private String spCloth;

    @Column(length = 20, nullable = false)
    private String spFoot;

    @Column(length = 20, nullable = false)
    private String spArmor;

    @Column(length = 20, nullable = false)
    private String spBack;

    @Column(length = 20, nullable = false)
    private String spLhand;

    @Column(length = 20, nullable = false)
    private String spRhand;

    @Column(length = 11, nullable = false)
    private int atkType;

    @Column(length = 11, nullable = false)
    private int atkRange;

    @Column(nullable = false)
    private float atk;

    @Column(nullable = false)
    private float def;

    @Column(nullable = false)
    private float hp;

    @Column(nullable = false)
    private float atkSpd;

    @Column(nullable = false)
    private float spd;

    @Column(nullable = false)
    private float critDamPer;

    @Column(nullable = false)
    private float critDamVal;

    @Column(nullable = false)
    private int atkPriord;

    @Column(nullable = false)
    private int monsterGold;

    @Column(nullable = false)
    private int monsterExp;

    @Column(nullable = false)
    private int liveDuration;

    @Column(nullable = false)
    private float refCombatPower;

    @Builder
    public Monster(int idx, String code, String name, String tribe, String spHorse, String spEye, String spHair, String spMustache, String spHelm, String spCloth, String spFoot, String spArmor, String spBack, String spLhand, String spRhand, int atkType, int atkRange, float atk, float def, float hp, float atkSpd, float spd, float critDamPer, float critDamVal, int atkPriord, int monsterGold, int monsterExp, int liveDuration, float refCombatPower) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.tribe = tribe;
        this.spHorse = spHorse;
        this.spEye = spEye;
        this.spHair = spHair;
        this.spMustache = spMustache;
        this.spHelm = spHelm;
        this.spCloth = spCloth;
        this.spFoot = spFoot;
        this.spArmor = spArmor;
        this.spBack = spBack;
        this.spLhand = spLhand;
        this.spRhand = spRhand;
        this.atkType = atkType;
        this.atkRange = atkRange;
        this.atk = atk;
        this.def = def;
        this.hp = hp;
        this.atkSpd = atkSpd;
        this.spd = spd;
        this.critDamPer = critDamPer;
        this.critDamVal = critDamVal;
        this.atkPriord = atkPriord;
        this.monsterGold = monsterGold;
        this.monsterExp = monsterExp;
        this.liveDuration = liveDuration;
        this.refCombatPower = refCombatPower;
    }
}
