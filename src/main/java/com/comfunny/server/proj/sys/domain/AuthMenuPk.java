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
public class AuthMenuPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "auth_grp_seq", length = 11)
    @NotBlank
    private long authGrpSeq; //권한그룹순번

    @Column(name = "menu_seq", length = 11)
    @NotBlank
    private long menuSeq; //권한그룹순번


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuthMenuPk that = (AuthMenuPk) o;
        return authGrpSeq == that.authGrpSeq && menuSeq == that.menuSeq;
    }

    @Override
    public int hashCode() {
        return Objects.hash(authGrpSeq, menuSeq);
    }
}
