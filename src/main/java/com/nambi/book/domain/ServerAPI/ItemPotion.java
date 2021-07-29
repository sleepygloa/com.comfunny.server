package com.nambi.book.domain.ServerAPI;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class ItemPotion  {

    @Id
    private int idx;

    @Column(length = 100)
    private String code;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String commonName;

    @Column(length = 100)
    private String requireJob;

    @Column(length = 100)
    private String category1;

    @Column(length = 100)
    private String category2;

    @Column(length = 100)
    private String category3;

    @Column(length = 100)
    private String category4;

    @Column(length = 100)
    private String position;

    @Column(length = 100)
    private String desc;

    @Column(length = 100)
    private String grade;

    @Column(nullable = false)
    private float price;

    @Column(length = 100)
    private String path;

    @Column(nullable = false)
    private String atk;

    @Column(nullable = false)
    private String def;

    @Column(nullable = false)
    private float str;

    @Column(nullable = false)
    private float dex;

    @Column(nullable = false)
    private float intt;

    @Column(nullable = false)
    private float fth;

    @Column(nullable = false)
    private float vit;

    @Column(nullable = false)
    private float hp;

    @Column(nullable = false)
    private float maxHp;

    @Column(nullable = false)
    private float regen;

    @Column(nullable = false)
    private float duration;

    @Column(nullable = false)
    private float skillCool;

    @Column(nullable = false)
    private float atkSpd;

    @Column(nullable = false)
    private float atkRange;

    @Column(nullable = false)
    private float critDamPer;

    @Column(nullable = false)
    private float critDamVal;

    @Column(nullable = false)
    private float skillDamVal;

    @Column(nullable = false)
    private float count;

    @Column(nullable = false)
    private float order;

    @Builder
    public ItemPotion(int idx, String code, String name, String commonName, String requireJob, String category1, String category2, String category3, String category4, String position, String desc, String grade, float price, String path, String atk, String def, float str, float dex, float intt, float fth, float vit, float hp, float maxHp, float regen, float duration, float skillCool, float atkSpd, float atkRange, float critDamPer, float critDamVal, float skillDamVal, float count, float order) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.commonName = commonName;
        this.requireJob = requireJob;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.category4 = category4;
        this.position = position;
        this.desc = desc;
        this.grade = grade;
        this.price = price;
        this.path = path;
        this.atk = atk;
        this.def = def;
        this.str = str;
        this.dex = dex;
        this.intt = intt;
        this.fth = fth;
        this.vit = vit;
        this.hp = hp;
        this.maxHp = maxHp;
        this.regen = regen;
        this.duration = duration;
        this.skillCool = skillCool;
        this.atkSpd = atkSpd;
        this.atkRange = atkRange;
        this.critDamPer = critDamPer;
        this.critDamVal = critDamVal;
        this.skillDamVal = skillDamVal;
        this.count = count;
        this.order = order;
    }
}
