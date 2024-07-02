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
 * LOT_ID PK
 */
@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class StockLotIdPk implements Serializable {

    /* 회사코드 */
    @Column(length = 20)
    private String bizCd;

    /* LOT_ID */
    @Column(length = 20)
    private String lotId;

    /* 물류센터코드 */
    @Column(length = 20)
    private String dcCd;

    /* 고객사코드 */
    @Column(length = 20)
    private String clientCd;

    /* 상품코드 */
    @Column(length = 20)
    private String itemCd;

    /* 상품상태코드 */
    @Column(length = 20)
    private String itemStCd;

    /* 입고번호 */
    @Column(length = 20)
    private String ibNo;

    /* 입고일자 */
    @Column(length = 8)
    private String ibYmd;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StockLotIdPk that = (StockLotIdPk) o;
        return Objects.equals(bizCd, that.bizCd) && Objects.equals(lotId, that.lotId) && Objects.equals(dcCd, that.dcCd) && Objects.equals(clientCd, that.clientCd) && Objects.equals(itemCd, that.itemCd) && Objects.equals(itemStCd, that.itemStCd) && Objects.equals(ibNo, that.ibNo) && Objects.equals(ibYmd, that.ibYmd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bizCd, lotId, dcCd, clientCd, itemCd, itemStCd, ibNo, ibYmd);
    }
}
