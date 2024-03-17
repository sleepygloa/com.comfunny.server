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

@Setter
@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CodeGrpPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "BIZ_CD", length = 20)
    @NotBlank
    private String bizCd;

    @Column(name = "CODE_GRP_CD", length = 20)
    @NotBlank
    private String codeGrpCd;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CodeGrpPk codeGrpPk = (CodeGrpPk) o;
        return Objects.equals(bizCd, codeGrpPk.bizCd) && Objects.equals(codeGrpCd, codeGrpPk.codeGrpCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, codeGrpCd);
    }
}
