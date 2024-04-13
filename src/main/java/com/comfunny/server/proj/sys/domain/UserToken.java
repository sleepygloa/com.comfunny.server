package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.sql.Timestamp;

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

    @Id
    @Column(name = "bgn_dt")
    private Date bgnDt;

    @Column(name = "user_id", length = 20)
    private String userId; //사용자ID

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

}
