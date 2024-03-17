package com.comfunny.server.proj.sys.domain;


import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="tb_sy_auth_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser extends BaseTimeEntity {

    //키
    @EmbeddedId
    private AuthUserPk authUserPk;

    @NotBlank
    @ColumnDefault("'N'")
    private String delYn;

}
