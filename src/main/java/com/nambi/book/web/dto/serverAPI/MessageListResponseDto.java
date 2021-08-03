package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Animal;
import com.nambi.book.domain.ServerAPI.Message;
import lombok.Getter;

@Getter
public class MessageListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String lang;

    public MessageListResponseDto(Message entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.lang = entity.getLang();
    }
}
