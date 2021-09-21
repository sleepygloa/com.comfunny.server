package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Item;
import lombok.Getter;


@Getter
public class ItemListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String commonName;
    private String requireJob;
    private String category1;
    private String category2;
    private String category3;
    private String category4;
    private String position;
    private String desc;

    public ItemListResponseDto(Item entity) {
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.commonName = entity.getCommonName();
        this.requireJob = entity.getRequireJob();
        this.category1 = entity.getCategory1();
        this.category2 = entity.getCategory2();
        this.category3 = entity.getCategory3();
        this.category4 = entity.getCategory4();
        this.position = entity.getPosition();
        this.desc = entity.getDesc();
    }
}
