package com.comfunny.server.proj.sys.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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
public class DomainPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(length = 20)
    @NotBlank
    private String bizCd;
    @Column(length = 100)
    @NotBlank
    private String domainId;
    @Column(length = 20)
    @NotBlank
    @ColumnDefault("'ko'")
    private String langCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DomainPk domainPk = (DomainPk) o;
        return Objects.equals(bizCd, domainPk.bizCd) && Objects.equals(domainId, domainPk.domainId) && Objects.equals(langCd, domainPk.langCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, domainId, langCd);
    }
}
