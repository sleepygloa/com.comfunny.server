package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
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


    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "access_token_dt")
    private Timestamp accessTokenDt;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_dt")
    private Timestamp refreshTokenDt;

}
