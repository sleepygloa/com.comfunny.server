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
@Table(name = "tb_ms_item_class")
public class ItemClass extends BaseTimeEntity {

    @EmbeddedId
    private ItemClassPk itemClassPk;

    @Column(length = 20)
    private String largeClassCd;
    @Column(length = 100)
    private String largeClassNm;
    @Column(length = 20)
    private String middleClassCd;
    @Column(length = 100)
    private String middleClassNm;
    @Column(length = 20)
    private String smallClassCd;
    @Column(length = 100)
    private String smallClassNm;

    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;



}
