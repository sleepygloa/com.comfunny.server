package com.comfunny.server.proj.sys.domain;

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
import javax.validation.constraints.NotNull;

@Entity
@Setter
@Getter
@Table(name = "tb_sy_code")
@NoArgsConstructor
@AllArgsConstructor
public class Code extends BaseTimeEntity {

    @EmbeddedId
    private CodePk codePk;

    @Column(name = "CODE_NM", length = 50)
    @NotNull
    private String codeNm;

    @Column(name = "CODE_DESC", length = 200)
    private String codeDesc;

    @Column(name = "CODE_ORDER", length = 11)
    private String codeOrder;

    @Column(name = "CODE_OTHER1", length = 50)
    private String codeOther1;

    @Column(name = "CODE_OTHER2", length = 50)
    private String codeOther2;

    @Column(name = "CODE_OTHER3", length = 50)
    private String codeOther3;

    @Column(name = "CODE_OTHER4", length = 50)
    private String codeOther4;

    @Column(name = "CODE_OTHER5", length = 50)
    private String codeOther5;

    @Column(name = "USE_YN", length = 1)
    @ColumnDefault("'Y'")
    private String useYn;

    @Column(name = "DEL_YN", length = 1)
    @ColumnDefault("'N'")
    private String delYn;

}
