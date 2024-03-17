package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

/**
 * Client To Server
 * */
@Entity
@Table(name = "tb_sy_user_dc")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDc extends BaseTimeEntity {

    @EmbeddedId
    private UserDcPk userDcPk;


    @Column(name = "ordr", length = 20)
    @ColumnDefault("0")
    private int ordr; //우선순위

    @Column(name = "rmrk", length = 500)
    private String rmrk;

    @Column(name = "use_yn", length = 1)
    private String useYn;

}
