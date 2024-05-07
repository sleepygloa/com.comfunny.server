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
public class SupplierPk implements Serializable {

    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    private String clientCd;
    @Column(length = 20)
    private String supplierCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SupplierPk that = (SupplierPk) o;
        return Objects.equals(bizCd, that.bizCd) && Objects.equals(clientCd, that.clientCd) && Objects.equals(supplierCd, that.supplierCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, clientCd, supplierCd);
    }
}
