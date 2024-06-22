package com.comfunny.server.proj.sd.domain;

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
@Table(name = "tb_ms_item_uom")
public class ItemUom extends BaseTimeEntity {

    @EmbeddedId
    private ItemUomPk itemUomPk;

    @Column(length = 20)
    private String convUomCd;
    @Column(length = 11) //11.2
    private long convUomQty;

    @Column(length = 500)
    private String remark;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;



}
