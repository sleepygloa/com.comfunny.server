package com.comfunny.server.proj.st.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * 재고수불 PK
 */
@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class StockInoutHistPk implements Serializable {

    /* 회사코드 */
    @Column(length = 20)
    private String bizCd;

    /* 재고번호 */
    @Column(length = 20)
    private String inoutHistNo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StockInoutHistPk that = (StockInoutHistPk) o;
        return Objects.equals(bizCd, that.bizCd) && Objects.equals(inoutHistNo, that.inoutHistNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, inoutHistNo);
    }
}
