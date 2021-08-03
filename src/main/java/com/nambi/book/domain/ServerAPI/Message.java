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
public class Message {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 2000, nullable = false)
    private String name;

    @Column(length = 10, nullable = false)
    private String lang;

    @Builder
    public Message(int idx, String code, String name, String lang) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.lang = lang;
    }
}
