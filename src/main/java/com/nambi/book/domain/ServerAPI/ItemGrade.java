package com.nambi.book.domain.ServerAPI;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class ItemGrade {

    @Column
    private int idx;

    @Id
    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String path;

    @Column(length = 100, nullable = false)
    @ColumnDefault("C")
    private String grade;

    @Column(length = 100, nullable = false)
    private String category4;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float price;

    @Column(length = 100)
    private String desc;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float frAtk;

    @Column(nullable = true)
    @ColumnDefault("0")
    private String toAtk;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float frDef;

    @Column(nullable = true)
    @ColumnDefault("0")
    private String toDef;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float str;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float dex;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float intt;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float fth;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float vit;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float hp;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float maxHp;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float regen;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float duration;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float skillCool;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float atkSpd;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float atkRange;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float critDamPer;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float critDamVal;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float skillDamVal;

    @Column(nullable = true)
    @ColumnDefault("1")
    private float count;

    //일반
    @Column(nullable = true)
    @ColumnDefault("")
    private String ccAttr;

    @Column(nullable = true)
    @ColumnDefault("")
    private String ccAttr2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ccFrVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ccToVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ccFrVal2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ccToVal2;

    //
    @Column(nullable = true)
    @ColumnDefault("")
    private String ucAttr;

    @Column(nullable = true)
    @ColumnDefault("")
    private String ucAttr2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ucFrVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ucToVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ucFrVal2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float ucToVal2;

    //매직
    @Column(nullable = true)
    @ColumnDefault("")
    private String mmAttr;

    @Column(nullable = true)
    @ColumnDefault("")
    private String mmAttr2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float mmFrVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float mmToVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float mmFrVal2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float mmToVal2;

    //에픽
    @Column(nullable = true)
    @ColumnDefault("")
    private String eeAttr;

    @Column(nullable = true)
    @ColumnDefault("")
    private String eeAttr2;

    @Column(nullable = true)
    @ColumnDefault("")
    private float eeFrVal;

    @Column(nullable = true)
    @ColumnDefault("")
    private float eeToVal;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float eeFrVal2;

    @Column(nullable = true)
    @ColumnDefault("0")
    private float eeToVal2;
}