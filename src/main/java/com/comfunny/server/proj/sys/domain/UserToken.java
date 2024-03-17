package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Client To Server
 * */
@Entity
@Table(name = "user_token")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserToken {
    @EmbeddedId
    private UserPk userPk;

    public String getUserId(){
        return userPk.getUserId();
    }

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "access_token_dt")
    private Timestamp accessTokenDt;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_dt")
    private Timestamp refreshTokenDt;

}
