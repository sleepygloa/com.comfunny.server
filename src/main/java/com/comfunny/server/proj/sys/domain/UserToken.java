package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
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

    @Column(name = "user_id", length = 20)
    @NotBlank
    private String userId; //사용자ID


    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "access_token_dt")
    private Timestamp accessTokenDt;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_dt")
    private Timestamp refreshTokenDt;

}
