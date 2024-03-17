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
@Table(name = "tb_ms_area")
public class Area extends BaseTimeEntity {

    @EmbeddedId
    private AreaPk areaPk;

    @Column(length = 100)
    private String areaNm;
    @Column(length = 20)
    private String keepTempeGbnCd;
    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;



}
