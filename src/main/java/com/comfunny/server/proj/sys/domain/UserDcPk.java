package com.comfunny.server.proj.sys.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Objects;

/**
 * Client To Server
 * */
@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class UserDcPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "biz_cd", length = 20)
    @NotBlank
    private String bizCd; //회사코드

    @Column(name = "user_id", length = 20)
    @NotBlank
    private String userId; //사용자ID


    @Column(name = "dc_cd", length = 20)
    @NotBlank
    private String dcCd; //물류센터코드


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDcPk userDcPk = (UserDcPk) o;
        return Objects.equals(bizCd, userDcPk.bizCd) && Objects.equals(userId, userDcPk.userId) && Objects.equals(dcCd, userDcPk.dcCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, userId, dcCd);
    }
}
