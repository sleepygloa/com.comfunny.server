package com.comfunny.server.proj.sd.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class BizReqSchDto {

    private String bizNm;

    public BizReqSchDto(){

    }

    @Builder
    public BizReqSchDto(String bizNm) {
        this.bizNm = bizNm;
    }

}
