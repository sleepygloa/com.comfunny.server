package com.nambi.book.domain.ServerAPI;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class InitCharStat {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 11)
    private int str;

    @Column(length = 11)
    private int dex;

    @Column(length = 11)
    private int intt;

    @Column(length = 11)
    private int fth;

    @Column(length = 11)
    private int vit;


    @Builder
    public InitCharStat(int idx, String code, int str, int dex, int intt, int fth, int vit) {
        this.idx = idx;
        this.code = code;
        this.str = str;
        this.dex = dex;
        this.intt = intt;
        this.fth = fth;
        this.vit = vit;
    }
}
