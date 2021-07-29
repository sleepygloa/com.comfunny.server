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
public class Background {

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



    @Builder
    public Background(int idx, String code, String name, String desc, String path) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.desc = desc;
        this.path = path;
    }
}
