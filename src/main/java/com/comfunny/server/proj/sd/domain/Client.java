package com.comfunny.server.proj.sd.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.*;
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
@Table(name = "tb_ms_client")
public class Client extends BaseTimeEntity {

    @EmbeddedId
    private ClientPk clientPk;

    @Column(length = 100)
    private String clientNm;
    @Column(length = 20)
    private String bizNo;
    @Column(length = 100)
    private String bizNm;
    @Column(length = 50)
    private String ceoNm;
    @Column(length = 100)
    private String bizTp;
    @Column(length = 100)
    private String bizKnd;
    @Column(length = 20)
    private String telNo;
    @Column(length = 20)
    private String faxNo;
    @Column(length = 20)
    private String countryCd;
    @Column(length = 20)
    private String cityCd;
    @Column(length = 50)
    private String contactNm;
    @Column(length = 20)
    private String contactTelNo;
    @Column(length = 100)
    private String contactEmail;
    @Column(length = 100)
    private String userCol1;
    @Column(length = 100)
    private String userCol2;
    @Column(length = 100)
    private String userCol3;
    @Column(length = 100)
    private String userCol4;
    @Column(length = 100)
    private String userCol5;
    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;


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
