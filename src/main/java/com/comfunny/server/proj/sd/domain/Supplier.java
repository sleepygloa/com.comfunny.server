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
@Table(name = "tb_ms_supplier")
public class Supplier extends BaseTimeEntity {

    @EmbeddedId
    private SupplierPk supplierPk;

    @Column(length = 100)
    private String supplierNm;
    @Column(length = 20)
    private String bizNo;
    @Column(length = 100)
    private String bizNm;
    @Column(length = 50)
    private String ceoNm;
    @Column(length = 20)
    private String postNo;
    @Column(length = 500)
    private String basicAddr;
    @Column(length = 500)
    private String detailAddr;
    @Column(length = 100)
    private String bizTp;
    @Column(length = 100)
    private String bizKnd;
    @Column(length = 20)
    private String telNo;
    @Column(length = 20)
    private String faxNo;
    @Column(length = 20)
    private String countryCd;
    @Column(length = 20)
    private String cityCd;
    @Column(length = 20)
    private String contactNm;
    @Column(length = 20)
    private String contactTelNo;
    @Column(length = 100)
    private String contactEmail;
    @Column(length = 8)
    private String dealStartYmd;
    @Column(length = 8)
    private String dealEndYmd;
    @Column(length = 20)
    private String dealGbnCd;
    @Column(length = 100)
    private String userCol1;
    @Column(length = 100)
    private String userCol2;
    @Column(length = 100)
    private String userCol3;
    @Column(length = 100)
    private String userCol4;
    @Column(length = 100)
    private String userCol5;
    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;


}
