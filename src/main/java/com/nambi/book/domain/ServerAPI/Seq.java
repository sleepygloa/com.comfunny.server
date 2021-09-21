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
public class Seq {

    @Id
    private String code;

    @Column
    private String yyyymmdd;

    @Column(length = 10)
    private Long count;

    @Builder
    public Seq(String code, String yyyymmdd, Long count) {
        this.code = code;
        this.yyyymmdd = yyyymmdd;
        this.count = count;
    }
}
