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
public class ItemPk implements Serializable {

    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    private String clientCd;
    @Column(length = 20)
    private String itemCd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemPk itemPk = (ItemPk) o;
        return Objects.equals(bizCd, itemPk.bizCd) && Objects.equals(clientCd, itemPk.clientCd) && Objects.equals(itemCd, itemPk.itemCd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, clientCd, itemCd);
    }
}
