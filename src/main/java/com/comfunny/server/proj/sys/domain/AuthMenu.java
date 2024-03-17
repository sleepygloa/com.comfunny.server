package com.comfunny.server.proj.sys.domain;


import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="tb_sy_auth_menu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthMenu extends BaseTimeEntity {

    //키
    @EmbeddedId
    private AuthMenuPk authMenuPk;

    //권한그룹명
    @Column(name = "auth_cd" , length = 500)
    private String authCd;

    //권한그룹상세
    @Column(name = "auth_yn", length = 1)
    private String authYn;

}
