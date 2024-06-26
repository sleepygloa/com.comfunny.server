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
@Table(name = "tb_ms_loc")
public class Loc extends BaseTimeEntity {

    @EmbeddedId
    private LocPk locPk;

    @Column(length = 20)
    private String linCd;
    @Column(length = 20)
    private String rowCd;
    @Column(length = 20)
    private String levCd;
    @Column(length = 20)
    private String locTypeCd;
    @Column(length = 20)
    private String holdStCd;
    @Column(length = 20)
    private float locPrioord;
    @Column(length = 11) //11.2
    private float horizontal;
    @Column(length = 11) //11.2
    private float vertical;
    @Column(length = 11) //11.2
    private float height;
    @Column(length = 15) //15.8
    private float cbm;
    @Column(length = 15) // 15.3
    private float weight;
    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;
}
