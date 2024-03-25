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

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class AuthUserPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "auth_grp_seq", length = 11)
    @NotBlank
    private long authGrpSeq; //권한순번

    @Column(name = "user_id", length = 20)
    @NotBlank
    private String userId; //권한메뉴순번

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthUserPk that = (AuthUserPk) o;
        return authGrpSeq == that.authGrpSeq && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authGrpSeq, userId);
    }
}
