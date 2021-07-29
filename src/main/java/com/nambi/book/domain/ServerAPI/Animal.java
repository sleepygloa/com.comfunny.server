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
public class Animal {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String desc;

    @Column(length = 100, nullable = false)
    private String path;

    @Column(length = 100, nullable = false)
    private String attr1;

    @Column(name = "ATTR1_CD",length = 100, nullable = false)
    private String attr1Cd;

    @Column(name = "ATTR1_VAL",length = 100, nullable = false)
    private float attr1Val;

    @Builder
    public Animal(int idx, String code, String name, String desc, String path, String attr1, String attr1Cd, float attr1Val) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.desc = desc;
        this.path = path;
        this.attr1 = attr1;
        this.attr1Cd = attr1Cd;
        this.attr1Val = attr1Val;
    }
}
