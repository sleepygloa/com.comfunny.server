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
@NoArgsConstructor
@Table(name = "tb_sy_menu")
public class Menu extends BaseTimeEntity {

    @EmbeddedId
    private MenuPk menuPk;

    @Column(length = 20)
    @ColumnDefault("0")
    private int menuParentSeq;
    @Column(length = 20)
    private String proCd;
    @Column(length = 100)
    private String menuNm;
    @Column(length = 100)
    private String callUrl;
    @Column(length = 100)
    private String menuSimpNm;
    @Column(length = 100)
    private String menuEnNm;
    @Column(length = 100)
    private String menuIco;
    @Column(length = 100)
    private String menuOrder;
    @Column(length = 500)
    private String domainId;
    @Column(length = 1)
    @ColumnDefault("'N'")
    private String pdaUseYn;
    @Column(length = 1)
    @ColumnDefault("'N'")
    private String favorYn;
    @Column(length = 1)
    @ColumnDefault("'Y'")
    private String useYn;

}
