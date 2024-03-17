package com.comfunny.server.proj.sd.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "tb_ms_biz")
public class Biz extends BaseTimeEntity {

    @Id
    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    @NotBlank
    private String bizNm;
    @Column(length = 100)
    private String bizSnm;
    @Column(length = 100)
    private String ceo;
    @Column(length = 100)
    private String bizNo;
    @Column(length = 20)
    private String zip;
    @Column(length = 200)
    private String addr;
    @Column(length = 200)
    private String detailAddr;
    @Column(length = 100)
    private String induty;
    @Column(length = 100)
    private String bizCnd;
    @Column(length = 20)
    private String tel;
    @Column(length = 20)
    private String fax;
    @Column(length = 20)
    private String etcTp1;
    @Column(length = 20)
    private String etcTp2;
    @Column(length = 20)
    private String etcNo1;
    @Column(length = 20)
    private String etcNo2;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;
    @Column(length = 200)
    private String extCol1;
    @Column(length = 200)
    private String extCol2;
    @Column(length = 200)
    private String extCol3;
    @Column(length = 200)
    private String extCol4;
    @Column(length = 200)
    private String extCol5;

    @Builder
    public Biz(String bizCd, String bizNm, String bizSnm, String ceo, String bizNo, String zip, String addr, String detailAddr, String induty, String bizCnd, String tel, String fax, String etcTp1, String etcTp2, String etcNo1, String etcNo2, String useYn, String extCol1, String extCol2, String extCol3, String extCol4, String extCol5) {
        this.bizCd = bizCd;
        this.bizNm = bizNm;
        this.bizSnm = bizSnm;
        this.ceo = ceo;
        this.bizNo = bizNo;
        this.zip = zip;
        this.addr = addr;
        this.detailAddr = detailAddr;
        this.induty = induty;
        this.bizCnd = bizCnd;
        this.tel = tel;
        this.fax = fax;
        this.etcTp1 = etcTp1;
        this.etcTp2 = etcTp2;
        this.etcNo1 = etcNo1;
        this.etcNo2 = etcNo2;
        this.useYn = useYn;
        this.extCol1 = extCol1;
        this.extCol2 = extCol2;
        this.extCol3 = extCol3;
        this.extCol4 = extCol4;
        this.extCol5 = extCol5;
    }
}
