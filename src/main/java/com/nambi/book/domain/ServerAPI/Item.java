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
public class Item {

    @Id
    private int idx;

    @Column(length = 100)
    private String code;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String commonName;

    @Column(length = 100)
    private String requireJob;

    @Column(length = 100)
    private String category1;

    @Column(length = 100)
    private String category2;

    @Column(length = 100)
    private String category3;

    @Column(length = 100)
    private String category4;

    @Column(length = 100)
    private String position;

    @Column(length = 100)
    private String desc;

    @Builder
    public Item(int idx, String code, String name, String commonName, String requireJob, String category1, String category2, String category3, String category4, String position, String desc) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.commonName = commonName;
        this.requireJob = requireJob;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
        this.category4 = category4;
        this.position = position;
        this.desc = desc;
    }
}
