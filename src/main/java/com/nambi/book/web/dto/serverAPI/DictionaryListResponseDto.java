package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Dictionary;
import lombok.Getter;

@Getter
public class DictionaryListResponseDto {

    private String code;
    private String name;
    private String desc;
    private int value;


    public DictionaryListResponseDto(Dictionary entity){
        this.code = entity.getCode();
        this.name = entity.getName();
        this.desc = entity.getDesc();
        this.value = entity.getValue();
    }

}
