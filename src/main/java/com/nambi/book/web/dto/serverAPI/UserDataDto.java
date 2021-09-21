package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.UserData;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDataDto {

    private String id;
    private String name;
    private String email;
    private String type;
    private String path;
    private String pw;
    private int returnType;

    @Builder
    public UserDataDto(UserData entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.type = entity.getType();
        this.path = entity.getPath();
        this.pw = entity.getPw();
    }

    public UserDataDto(){

    }

}
