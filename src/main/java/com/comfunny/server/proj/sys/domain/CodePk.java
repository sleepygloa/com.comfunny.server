package com.comfunny.server.proj.sys.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CodePk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "BIZ_CD", length = 20)
    @NotBlank
    private String bizCd;
    @Column(name = "CODE_GRP_CD", length = 20)
    @NotBlank
    private String codeGrpCd;
    @Column(name = "CODE_CD", length = 20)
    @NotNull
    private String codeCd;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CodePk codePk = (CodePk) o;
        return Objects.equals(bizCd, codePk.bizCd) && Objects.equals(codeGrpCd, codePk.codeGrpCd) && Objects.equals(codeCd, codePk.codeCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, codeGrpCd, codeCd);
    }
}
