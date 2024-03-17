package com.comfunny.server.proj.sd.dto;

import com.comfunny.server.proj.sd.domain.Biz;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class BizResDto {

    private long id;
    private String bizCd;
    private String bizNm;
    private String bizSnm;
    private String ceo;
    private String bizNo;
    private String zip;
    private String addr;
    private String induty;
    private String bizCnd;
    private String tel;
    private String fax;
    private String etcTp1;
    private String etcTp2;
    private String etcNo1;
    private String etcNo2;
    private String useYn;
    private String extCol1;
    private String extCol2;
    private String extCol3;
    private String extCol4;
    private String extCol5;


    public BizResDto(Biz entity) {
        this.bizCd = entity.getBizCd();
        this.bizNm = entity.getBizNm();
        this.bizSnm = entity.getBizSnm();
        this.ceo = entity.getCeo();
        this.bizNo = entity.getBizNo();
        this.zip = entity.getZip();
        this.addr = entity.getAddr();
        this.induty = entity.getInduty();
        this.bizCnd = entity.getBizCnd();
        this.tel = entity.getTel();
        this.fax = entity.getFax();
        this.etcTp1 = entity.getEtcTp1();
        this.etcTp2 = entity.getEtcTp2();
        this.etcNo1 = entity.getEtcNo1();
        this.etcNo2 = entity.getEtcNo2();
        this.useYn = entity.getUseYn();
        this.extCol1 = entity.getExtCol1();
        this.extCol2 = entity.getExtCol2();
        this.extCol3 = entity.getExtCol3();
        this.extCol4 = entity.getExtCol4();
        this.extCol5 = entity.getExtCol5();
    }
}
