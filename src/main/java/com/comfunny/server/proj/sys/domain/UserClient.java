package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Client To Server
 * */
@Entity
@Table(name = "tb_sy_user_client")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserClient extends BaseTimeEntity {

    @EmbeddedId
    private UserClientPk userClientPk;

    @Column(name = "ordr", length = 20)
    @ColumnDefault("0")
    private int ordr; //우선순위

    @Column(name = "rmrk", length = 500)
    private String rmrk;

    @Column(name = "use_yn", length = 1)
    private String useYn;
}
