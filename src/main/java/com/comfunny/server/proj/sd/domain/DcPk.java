package com.comfunny.server.proj.sd.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class DcPk implements Serializable {

    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    private String dcCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DcPk dcPk = (DcPk) o;
        return Objects.equals(bizCd, dcPk.bizCd) && Objects.equals(dcCd, dcPk.dcCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, dcCd);
    }
}
