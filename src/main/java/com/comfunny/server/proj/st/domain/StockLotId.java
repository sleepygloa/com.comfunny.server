package com.comfunny.server.proj.st.domain;

import com.comfunny.server.proj.ib.domain.InboundPk;
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
 * LOT_ID
 */
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_st_lot_id")
public class StockLotId extends BaseTimeEntity {

    @EmbeddedId
    private StockLotIdPk stockLotIdPk;


    /* 제조LOT */
    @Column(length = 20)
    private String makeLot;

    /* 유통기한일자 */
    @Column(length = 8)
    private String distExpiryYmd;

    /* 제조일자 */
    @Column(length = 8)
    private String makeYmd;

    /* LOT속성1 */
    @Column(length = 20)
    private String lotAttr1;

    /* LOT속성2 */
    @Column(length = 20)
    private String lotAttr2;

    /* LOT속성3 */
    @Column(length = 20)
    private String lotAttr3;

    /* LOT속성4 */
    @Column(length = 20)
    private String lotAttr4;

    /* LOT속성5 */
    @Column(length = 20)
    private String lotAttr5;
    /* 원LOT_ID */
    @Column(length = 20)
    private String srcLotId;

    /* 비고 */
    @Column(length = 500)
    private String remark;

    /* 사용여부 */
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;

}
