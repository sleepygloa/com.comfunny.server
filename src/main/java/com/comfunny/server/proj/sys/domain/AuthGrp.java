package com.comfunny.server.proj.sys.domain;


import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="tb_sy_auth_grp")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthGrp extends BaseTimeEntity {

    //키
    @EmbeddedId
    private AuthGrpPk authGrpPk;

    @Column(name = "auth_grp_nm", length = 11)
    @NotBlank
    private long authGrpNm; //권한순번

    @Column(name = "auth_grp_desc", length = 11)
    @NotBlank
    private String authGrpDesc; //권한메뉴순번
    @NotBlank
    @ColumnDefault("'N'")
    private String delYn;

}
