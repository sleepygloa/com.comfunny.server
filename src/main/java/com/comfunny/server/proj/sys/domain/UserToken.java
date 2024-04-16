package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Objects;

/**
 * Client To Server
 * */
@Entity
@Table(name = "user_token")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserToken {

    @EmbeddedId
    private UserTokenPk userTokenPk;

    /*  */
    @Column(name = "access_token")
    private String accessToken;
    /*  */
    @Column(name = "access_token_dt")
    private Date accessTokenDt;
    /*  */
    @Column(name = "refresh_token")
    private String refreshToken;
    /*  */
    @Column(name = "refresh_token_dt")
    private Date refreshTokenDt;

    /* 토큰사용종료일시 */
    @Column(name = "end_dt")
    private Date endDt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserToken userToken = (UserToken) o;
        return Objects.equals(userTokenPk, userToken.userTokenPk) && Objects.equals(accessToken, userToken.accessToken) && Objects.equals(accessTokenDt, userToken.accessTokenDt) && Objects.equals(refreshToken, userToken.refreshToken) && Objects.equals(refreshTokenDt, userToken.refreshTokenDt) && Objects.equals(endDt, userToken.endDt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userTokenPk, accessToken, accessTokenDt, refreshToken, refreshTokenDt, endDt);
    }
}
