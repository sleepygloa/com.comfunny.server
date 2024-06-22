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
public class ItemUomPk implements Serializable {

    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    private String clientCd;
    @Column(length = 20)
    private String itemCd;
    @Column(length = 20)
    private String stdUomCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemUomPk itemUomPk = (ItemUomPk) o;
        return Objects.equals(bizCd, itemUomPk.bizCd) && Objects.equals(clientCd, itemUomPk.clientCd) && Objects.equals(itemCd, itemUomPk.itemCd) && Objects.equals(stdUomCd, itemUomPk.stdUomCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, clientCd, itemCd, stdUomCd);
    }
}
