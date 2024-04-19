package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Setter
@Getter
@Table(name = "tb_sy_code_grp")
@NoArgsConstructor
public class CodeGrp extends BaseTimeEntity {

    @EmbeddedId
    private CodeGrpPk codeGrpPk;

    @Column(name = "CODE_GRP_NM", length = 50)
    private String codeGrpNm;

    @Column(name = "CODE_GRP_DESC", length = 200)
    private String codeGrpDesc;

    @Column(name = "CODE_GRP_TP", length = 20)
    private String codeGrpTp;


    @Column(name = "USE_YN", length = 1)
    @ColumnDefault("'Y'")
    private String useYn;

    @Column(name = "DEL_YN", length = 1)
    @ColumnDefault("'N'")
    private String delYn;


}
