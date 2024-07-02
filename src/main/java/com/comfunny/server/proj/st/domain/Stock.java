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
 * 재고
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_st_stock")
public class Stock extends BaseTimeEntity {

    @EmbeddedId
    private StockPk stockPk;

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

    /* 로케이션코드 */
    @Column(length = 20)
    private String locCd;

    /* LOT_ID */
    @Column(length = 8)
    private String lotId;

    /* 파레트ID */
    @Column(length = 20)
    private String pltId;

    /* 재고수량 */
    @Column(length = 11)
    private long stockQty;
    /* 입고수량 */
    @Column(length = 11)
    private long ibPlanQty;
    /* 출고수량 */
    @Column(length = 11)
    private long obPlanQty;
    /* 보류수량 */
    @Column(length = 11)
    private long holdQty;


    /* 비고 */
    @Column(length = 500)
    private String remark;

    /* 사용여부 */
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;

}
