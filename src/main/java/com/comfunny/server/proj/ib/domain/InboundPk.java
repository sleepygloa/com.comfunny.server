package com.comfunny.server.proj.ib.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * 입고지시서 상세 PK
 */
@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class InboundPk implements Serializable {

    /* 회사코드 */
    @Column(length = 20)
    private String bizCd;

    /* 입고번호 */
    @Column(length = 20)
    private String ibNo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InboundPk inboundPk = (InboundPk) o;
        return Objects.equals(bizCd, inboundPk.bizCd) && Objects.equals(ibNo, inboundPk.ibNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, ibNo);
    }
}
