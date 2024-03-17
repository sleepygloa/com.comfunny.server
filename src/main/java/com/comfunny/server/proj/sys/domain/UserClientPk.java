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
public class UserClientPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "biz_cd", length = 20)
    @NotBlank
    private String bizCd; //회사코드

    @Column(name = "user_id", length = 20)
    @NotBlank
    private String userId; //사용자ID


    @Column(name = "client_cd", length = 20)
    @NotBlank
    private String clientCd; //고객사코드

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserClientPk that = (UserClientPk) o;
        return Objects.equals(bizCd, that.bizCd) && Objects.equals(userId, that.userId) && Objects.equals(clientCd, that.clientCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, userId, clientCd);
    }
}
