package com.comfunny.server.proj.ib.domain;

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

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_ib_m")
public class Inbound extends BaseTimeEntity {

    @EmbeddedId
    private InboundPk inboundPk;

    /* 물류센터코드 */
    @Column(length = 20)
    private String dcCd;

    /* 고객사코드 */
    @Column(length = 20)
    private String clientCd;

    /* 입고구분코드 */
    @Column(length = 20)
    private String ibGbnCd;

    /* 입고진행상태코드 */
    @Column(length = 20)
    private String ibProgStCd;

    /* 입고예정일자 */
    @Column(length = 8)
    private String ibPlanYmd;

    /* 입고일자 */
    @Column(length = 8)
    private String ibYmd;

    /* 발주번호 */
    @Column(length = 20)
    private String poNo;

    /* 발주일자 */
    @Column(length = 8)
    private String poYmd;

    /* 공급처코드 */
    @Column(length = 20)
    private String supplierCd;

    /* 차량번호 */
    @Column(length = 20)
    private String carNo;

    /* 이고출고번호 */
    @Column(length = 20)
    private String tcObNo;

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
