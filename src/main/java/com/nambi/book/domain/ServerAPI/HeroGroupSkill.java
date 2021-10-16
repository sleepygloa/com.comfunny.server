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
public class HeroGroupSkill {

    @Id
    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 200, nullable = false)
    private String name;

    @Builder
    public HeroGroupSkill(String code, String name) {
        this.code = code;
        this.name = name;
    }
}
