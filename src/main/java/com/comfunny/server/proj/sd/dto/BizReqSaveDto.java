package com.comfunny.server.proj.sd.dto;

import com.comfunny.server.proj.sd.domain.Biz;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class BizReqSaveDto {

    private long id;
    private String bizCd;
    private String bizNm;
    private String bizSnm;
    private String ceo;
    private String bizNo;
    private String zip;
    private String addr;
    private String detailAddr;
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

    public BizReqSaveDto(){

    }

    @Builder
    public BizReqSaveDto(long id, String biz, String bizNm, String bizSnm, String ceo, String bizNo, String zip, String addr, String detailAddr, String induty, String bizCnd, String tel, String fax, String etcTp1, String etcTp2, String etcNo1, String etcNo2, String useYn, String extCol1, String extCol2, String extCol3, String extCol4, String extCol5) {
        this.id = id;
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

    public Biz toEntity() {
        return  Biz.builder()
                .bizCd(bizCd)
                .bizNm(bizNm)
                .bizSnm(bizSnm)
                .ceo(ceo)
                .bizNo(bizNo)
                .zip(zip)
                .addr(addr)
                .detailAddr(detailAddr)
                .induty(induty)
                .bizCnd(bizCnd)
                .tel(tel)
                .fax(fax)
                .etcNo1(etcNo1)
                .etcNo2(etcNo2)
                .etcTp1(etcTp1)
                .etcTp2(etcTp2)
                .useYn(useYn)
                .extCol1(extCol1)
                .extCol2(extCol2)
                .extCol3(extCol3)
                .extCol4(extCol4)
                .extCol5(extCol5)
                .build();
    }
}
