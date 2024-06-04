package com.comfunny.server.proj.sd.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@Table(name = "tb_ms_delivery_info")
public class DeliveryInfo extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

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
    private float detailAddr;
}
