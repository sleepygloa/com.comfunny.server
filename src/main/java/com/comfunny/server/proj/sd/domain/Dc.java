package com.comfunny.server.proj.sd.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "tb_ms_dc")
public class Dc extends BaseTimeEntity {

    @EmbeddedId
    private DcPk dcPk;

    @Column(length = 100)
    private String dcNm;
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
    @Column(length = 50)
    private String contactNm;
    @Column(length = 20)
    private String contactTelNo;
    @Column(length = 100)
    private String contactEmail;
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


    @Builder
    public Dc(DcPk dcPk, String dcNm, String bizNo, String bizNm, String ceoNm, String postNo, String basicAddr, String detailAddr, String bizTp, String bizKnd, String telNo, String faxNo, String countryCd, String cityCd, String userCol1, String userCol2, String userCol3, String userCol4, String userCol5, String remark, String useYn, String inUserId, String upUserId) {
        this.dcPk = dcPk;
        this.dcNm = dcNm;
        this.bizNo = bizNo;
        this.bizNm = bizNm;
        this.ceoNm = ceoNm;
        this.postNo = postNo;
        this.basicAddr = basicAddr;
        this.detailAddr = detailAddr;
        this.bizTp = bizTp;
        this.bizKnd = bizKnd;
        this.telNo = telNo;
        this.faxNo = faxNo;
        this.countryCd = countryCd;
        this.cityCd = cityCd;
        this.userCol1 = userCol1;
        this.userCol2 = userCol2;
        this.userCol3 = userCol3;
        this.userCol4 = userCol4;
        this.userCol5 = userCol5;
        this.remark = remark;
        this.useYn = useYn;
        this.inUserId = inUserId;
        this.upUserId = upUserId;
    }
}
