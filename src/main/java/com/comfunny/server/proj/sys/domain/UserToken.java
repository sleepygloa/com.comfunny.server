package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

/**
 * Client To Server
 * */
@Entity
@Table(name = "user_token")
@Getter
@Setter
@NoArgsConstructor
public class UserToken {

    @Id
    @Column(name = "user_id", length = 20)
    private String userId; //사용자ID

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "access_token_dt")
    private Timestamp accessTokenDt;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_dt")
    private Timestamp refreshTokenDt;


    @Builder
    public UserToken(String userId, String accessToken, Timestamp accessTokenDt, String refreshToken, Timestamp refreshTokenDt) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.accessTokenDt = accessTokenDt;
        this.refreshToken = refreshToken;
        this.refreshTokenDt = refreshTokenDt;
    }
}
