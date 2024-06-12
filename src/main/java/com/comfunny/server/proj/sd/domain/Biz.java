package com.comfunny.server.proj.sd.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "tb_ms_biz")
public class Biz extends BaseTimeEntity {

    @Id
    @Column(length = 20)
    private String bizCd;
    @Column(length = 20)
    @NotBlank
    private String bizNm;
    @Column(length = 100)
    private String ceo;
    @Column(length = 100)
    private String bizNo;

    @Column(length = 100)
    private String induty;
    @Column(length = 100)
    private String bizCnd;
    @Column(length = 20)
    private String telNo;
    @Column(length = 20)
    private String faxNo;
    @Column(length = 20)
    private String etcTp1;
    @Column(length = 20)
    private String etcTp2;
    @Column(length = 20)
    private String etcNo1;
    @Column(length = 20)
    private String etcNo2;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;
    @Column(length = 200)
    private String extCol1;
    @Column(length = 200)
    private String extCol2;
    @Column(length = 200)
    private String extCol3;
    @Column(length = 200)
    private String extCol4;
    @Column(length = 200)
    private String extCol5;

    /* 장소명 */
    @Column(length = 100)
    private String deliveryNm;
    /* 위도 */
    @Column(length = 20)
    private String lat;
    /* 경도 */
    @Column(length = 20)
    private String lon;
    /* 우편번호 */
    @Column(length = 6)
    private String zip;
    /* 도로명주소 */
    @Column(length = 200)
    private String roadAddr;
    /* 지번주소 */
    @Column(length = 200)
    private String jibunAddr;
    /* 상세주소 */
    @Column(length = 200)
    private String detailAddr;
}
