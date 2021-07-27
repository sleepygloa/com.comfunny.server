package com.nambi.book.domain.ServerAPI;

import com.nambi.book.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Dictionary {

    @Id
    private String code;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String desc;

    @Column(nullable = false)
    private int value;

    @Builder
    public Dictionary(String code, String name, String desc, int value) {
        this.code = code;
        this.name = name;
        this.desc = desc;
        this.value = value;
    }

//    @Builder
//    public Dictionary(String title, String content, String author){
//        this.title = title;
//        this.content = content;
//        this.author = author;
//    }
}
