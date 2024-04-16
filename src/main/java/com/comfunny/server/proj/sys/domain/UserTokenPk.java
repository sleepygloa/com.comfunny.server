package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.sql.Date;

/**
 * Client To Server
 * */
@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserTokenPk implements Serializable {

    @Column(name = "bgn_dt")
    @NotBlank
    private Date bgnDt;

    @Column(name = "user_id", length = 20)
    @NotBlank
    private String userId; //사용자ID

}
