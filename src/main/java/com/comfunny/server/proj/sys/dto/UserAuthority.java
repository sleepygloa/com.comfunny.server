package com.comfunny.server.proj.sys.dto;

import lombok.*;

import javax.persistence.*;

/**
 * Client To Server
 * */
@Entity
@Table(name = "user_authority")
@Getter
@Setter
@NoArgsConstructor
public class UserAuthority {

    @EmbeddedId
    private UserAuthorityPk userAuthorityPk;

    public UserAuthority(UserAuthorityPk userAuthorityPk) {
        this.userAuthorityPk = userAuthorityPk;
    }
    public String getBizCd(){
        return userAuthorityPk.getBizCd();
    }
    public String getUserId(){
        return userAuthorityPk.getUserId();
    }
    public String getAuthorityName(){
        return userAuthorityPk.getAuthorityName();
    }
}
