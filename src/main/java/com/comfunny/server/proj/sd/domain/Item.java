package com.comfunny.server.proj.sd.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_ms_item")
public class Item extends BaseTimeEntity {

    @EmbeddedId
    private ItemPk itemPk;

    @Column(length = 100)
    private String itemNm;
    @Column(length = 100)
    private String itemSpec;
    @Column(length = 20)
    private String itemGbnCd;
    @Column(length = 20)
    private String largeClassCd;
    @Column(length = 20)
    private String middleClassCd;
    @Column(length = 20)
    private String smallClassCd;
    @Column(length = 11) //11.2
    private long ibCost;
    @Column(length = 11) //11.2
    private long obCost;
    @Column(length = 11) //11.2
    private float horizontal;
    @Column(length = 11) //11.2
    private float vertical;
    @Column(length = 11) //11.2
    private float height;
    @Column(length = 15) //15.3
    private float cbm;
    @Column(length = 15) //15.3
    private float weight;
    @Column(length = 100)
    private String itemBarcode;
    @Column(length = 100)
    private String boxBarcode;
    @Column(length = 20)
    private String keepTempeGbnCd;
    @Column(length = 20)
    private String replaceItemCd;
    @Column(length = 11)
    private long distExpiryDays;
    @Column(length = 20)
    private String minUomCd;
    @Column(length = 1)
    private String setItemYn;
    @Column(length = 1)
    private String vatYn;
    @Column(length = 20)
    private String userCol1;
    @Column(length = 20)
    private String userCol2;
    @Column(length = 20)
    private String userCol3;
    @Column(length = 20)
    private String userCol4;
    @Column(length = 20)
    private String userCol5;

    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;



}
