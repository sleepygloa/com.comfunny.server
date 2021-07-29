package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Animal;
import lombok.Getter;

@Getter
public class AnimalListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String desc;
    private String path;
    private String attr1;
    private String attr1Cd;
    private float attr1Val;

    public AnimalListResponseDto(Animal entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.desc = entity.getDesc();
        this.path = entity.getPath();
        this.attr1 = entity.getAttr1();
        this.attr1Cd = entity.getAttr1Cd();
        this.attr1Val = entity.getAttr1Val();
    }
}
