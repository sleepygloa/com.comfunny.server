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
public class MenuPk implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(length = 20)
    @NotBlank
    private String bizCd;
    @Column(length = 20)
    @NotBlank
    private int menuSeq;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MenuPk menuPk = (MenuPk) o;
        return menuSeq == menuPk.menuSeq && Objects.equals(bizCd, menuPk.bizCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, menuSeq);
    }
}
