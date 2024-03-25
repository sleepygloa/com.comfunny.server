package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "tb_sy_user_cnn_log")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCnnLog extends BaseTimeEntity {

    @Id
    @Column private String userId;
    @Column private String bizCd;
    @Column private String dcCd;
    @Column private String clientCd;
    @Column private String loginOs;
    @Column private String loginIp;
    @Column private String langCd;
    @Column private String countryCd;
}
