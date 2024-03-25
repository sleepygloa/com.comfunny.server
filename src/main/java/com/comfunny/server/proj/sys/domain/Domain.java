package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.Builder;
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
@NoArgsConstructor
@Table(name = "tb_sy_domain")
public class Domain extends BaseTimeEntity {

    @EmbeddedId
    private DomainPk domainPk;

    @Column(length = 500)
    private String domainIdCamel;
    @Column(length = 500)
    private String domainNm;
    @Column(length = 200)
    private String domainSimpNm;
    @Column(length = 500)
    private String domainDesc;
    @Column(length = 1)
    @ColumnDefault("'Y'")
    private String useYn;
    @Column(length = 1)
    @ColumnDefault("'N'")
    private String delYn;

    @Builder
    public Domain(DomainPk domainPk, String domainNm, String domainSimpNm, String langCd, String domainDesc, String useYn, String delYn) {
        this.domainPk = domainPk;
        this.domainNm = domainNm;
        this.domainSimpNm = domainSimpNm;
        this.domainDesc = domainDesc;
        this.useYn = useYn;
        this.delYn = delYn;
    }
}
