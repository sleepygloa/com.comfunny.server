package com.comfunny.server.proj.sd.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class AreaPk implements Serializable {

    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    private String dcCd;
    @Column(length = 20)
    private String areaCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AreaPk areaPk = (AreaPk) o;
        return Objects.equals(bizCd, areaPk.bizCd) && Objects.equals(dcCd, areaPk.dcCd) && Objects.equals(areaCd, areaPk.areaCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, dcCd, areaCd);
    }
}
