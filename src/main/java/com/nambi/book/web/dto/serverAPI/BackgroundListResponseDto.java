package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Animal;
import com.nambi.book.domain.ServerAPI.Background;
import lombok.Getter;

@Getter
public class BackgroundListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String desc;
    private String path;

    public BackgroundListResponseDto(Background entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.desc = entity.getDesc();
        this.path = entity.getPath();
    }
}
