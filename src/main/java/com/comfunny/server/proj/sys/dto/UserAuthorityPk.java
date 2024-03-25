package com.comfunny.server.proj.sys.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthorityPk implements Serializable {

    @Column(name = "biz_cd", unique = false)
    private String bizCd;
    @Column(name = "user_id", unique = false)
    private String userId;
    @Column(name = "authority_name", length = 50, unique = false)
    private String authorityName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserAuthorityPk that = (UserAuthorityPk) o;
        return Objects.equals(bizCd, that.bizCd) && Objects.equals(userId, that.userId) && Objects.equals(authorityName, that.authorityName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, userId, authorityName);
    }


}
