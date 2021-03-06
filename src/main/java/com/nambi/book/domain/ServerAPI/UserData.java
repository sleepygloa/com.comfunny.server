package com.nambi.book.domain.ServerAPI;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class UserData {

    @Id
    @GeneratedValue
    private int idx;

    @Column(length = 100, nullable = false)
    private String id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String type;

    @Column(length = 100, nullable = false)
    private String path;

    @Column(length = 100, nullable = false)
    private String pw;

    @Builder
    public UserData(String id, String name, String email, String type, String path, String pw) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
        this.path = path;
        this.pw = pw;
    }

}
