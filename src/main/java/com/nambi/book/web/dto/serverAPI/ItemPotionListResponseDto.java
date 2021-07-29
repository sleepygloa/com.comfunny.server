package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Item;
import com.nambi.book.domain.ServerAPI.ItemPotion;
import lombok.Getter;


@Getter
public class ItemPotionListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String commonName;
    private String requireJob;
    private String category1;
    private String category2;
    private String category3;
    private String category4;
    private String position;
    private String desc;
    private String grade;
    private float price;
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

    public ItemPotionListResponseDto(ItemPotion entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.commonName = entity.getCommonName();
        this.requireJob = entity.getRequireJob();
        this.category1 = entity.getCategory1();
        this.category2 = entity.getCategory2();
        this.category3 = entity.getCategory3();
        this.category4 = entity.getCategory4();
        this.position = entity.getPosition();
        this.desc = entity.getDesc();
        this.grade = entity.getGrade();
        this.path = entity.getPath();
        this.price = entity.getPrice();
        this.atk = entity.getAtk();
        this.def = entity.getDef();
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
        this.order = entity.getOrder();
    }
}
