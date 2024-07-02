package com.comfunny.server.proj.ib.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_ib_d")
public class InboundDetail extends BaseTimeEntity {

    @EmbeddedId
    private InboundDetailPk inboundDetailPk;

    /* 발주상세순번 */
    @Column(length = 10)
    private long poDetailSeq;

    /* 입고진행상태코드 */
    @Column(length = 20)
    private String ibProgStCd;

    /* 상품코드 */
    @Column(length = 20)
    private String itemCd;

    /* 상품명 */
    @Column(length = 100)
    private String itemNm;

    /* 상품상태코드 */
    @Column(length = 20)
    private String itemStCd;

    /* 발주단위코드 */
    @Column(length = 20)
    private String poUomCd;

    /* 발주수량 */
    @Column(length = 11)
    private long poQty;

    /* 예정수량 */
    @Column(length = 11)
    private long planQty;

    /* 확정수량 */
    @Column(length = 11)
    private long confQty;

    /* 승인수량 */
    @Column(length = 11)
    private long apprQty;

    /* 검수수량 */
    @Column(length = 11)
    private long examQty;

    /* 지시수량 */
    @Column(length = 11)
    private long instQty;

    /* 적치수량 */
    @Column(length = 11)
    private long putwQty;

    /* 미입고사유코드 */
    @Column(length = 20)
    private String noIbRsnCd;

    /* 입고단가 */
    @Column(length = 11)
    private long ibCost;

    /* 입고부가세 */
    @Column(length = 11)
    private long ibVat;

    /* 입고금액 */
    @Column(length = 11)
    private long ibAmt;

    /* 제조LOT */
    @Column(length = 20)
    private String makeLot;

    /* 제조일자 */
    @Column(length = 8)
    private String makeYmd;

    /* 유통기한일자 */
    @Column(length = 8)
    private String distExpiryYmd;

    /* LOT_ID */
    @Column(length = 20)
    private String lotId;

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

    /* 이고출고상세순번 */
    @Column(length = 11)
    private String tcObDetailSeq;

    /* 승인일시 */
    @Column(length = 14)
    private String apprDt;

    /* 승인자 */
    @Column(length = 20)
    private String apprUserId;

    /* 사용자컬럼1 */
    @Column(length = 100)
    private String userCol1;

    /* 사용자컬럼2 */
    @Column(length = 100)
    private String userCol2;

    /* 사용자컬럼3 */
    @Column(length = 100)
    private String userCol3;

    /* 사용자컬럼4 */
    @Column(length = 100)
    private String userCol4;

    /* 사용자컬럼5 */
    @Column(length = 100)
    private String userCol5;

    /* 비고 */
    @Column(length = 500)
    private String remark;

    /* 사용여부 */
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;

}
