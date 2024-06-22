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
public class LocPk implements Serializable {

    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    private String dcCd;
    @Column(length = 20)
    private String areaCd;
    @Column(length = 20)
    private String zoneCd;
    @Column(length = 20)
    private String locCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LocPk locPk = (LocPk) o;
        return Objects.equals(bizCd, locPk.bizCd) && Objects.equals(dcCd, locPk.dcCd) && Objects.equals(areaCd, locPk.areaCd) && Objects.equals(zoneCd, locPk.zoneCd) && Objects.equals(locCd, locPk.locCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, dcCd, areaCd, zoneCd, locCd);
    }
}
