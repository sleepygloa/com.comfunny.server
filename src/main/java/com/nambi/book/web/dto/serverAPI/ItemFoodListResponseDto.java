package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Item;
import com.nambi.book.domain.ServerAPI.ItemFood;
import lombok.Getter;


@Getter
public class ItemFoodListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String commonName;
    private String requireJob;
    private String position;
    private String desc;
    private String grade;
    private float price;
    private String category1;
    private String category2;
    private String category3;
    private String category4;
    private String path;
    private String atk;
    private String def;
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
    private float order;

    public ItemFoodListResponseDto(ItemFood entity) {
        this.idx = entity.getIdx();
        this.code = getCode();
        this.name = getName();
        this.commonName = getCommonName();
        this.requireJob = getRequireJob();
        this.position = getPosition();
        this.desc = getDesc();
        this.grade = getGrade();
        this.price = getPrice();
        this.category1 = getCategory1();
        this.category2 = getCategory2();
        this.category3 = getCategory3();
        this.category4 = getCategory4();
        this.path = getPath();
        this.atk = getAtk();
        this.def = getDef();
        this.str = getStr();
        this.dex = getDex();
        this.intt = getIntt();
        this.fth = getFth();
        this.vit = getVit();
        this.hp = getHp();
        this.maxHp = getMaxHp();
        this.regen = getRegen();
        this.duration = getDuration();
        this.skillCool = getSkillCool();
        this.atkSpd = getAtkSpd();
        this.atkRange = getAtkRange();
        this.critDamPer = getCritDamPer();
        this.critDamVal = getCritDamVal();
        this.skillDamVal = getSkillDamVal();
        this.count = getCount();
        this.order = getOrder();
    }
}
