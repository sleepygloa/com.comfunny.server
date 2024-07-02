package com.comfunny.server.proj.st.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

/**
 * 재고수불
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_st_inout_hist")
public class StockInoutHist extends BaseTimeEntity {

    @EmbeddedId
    private StockInoutHistPk stockInoutHistPk;

    /* 물류센터코드 */
    @Column(length = 20)
    private String dcCd;

    /* 고객사코드 */
    @Column(length = 20)
    private String clientCd;

    /* 수불일자 */
    @Column(length = 8)
    private String inoutYmd;

    /* 상품코드 */
    @Column(length = 20)
    private String itemCd;

    /* 상품상태코드 */
    @Column(length = 20)
    private String itemStCd;

    /* 입출고구분코드 */
    @Column(length = 20)
    private String iobGbnCd;

    /* 수불구분코드 */
    @Column(length = 20)
    private String inoutGbnCd;

    /* 수불수량 */
    @Column(length = 11)
    private long inoutQty;

    /* 비고 */
    @Column(length = 500)
    private String remark;

    /* 사용여부 */
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;

}
