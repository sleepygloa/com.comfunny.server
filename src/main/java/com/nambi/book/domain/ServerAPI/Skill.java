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
public class Skill {

    @Id
    private int idx;

    @Column(length = 100, nullable = false)
    private String code;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String desc;

    @Column(length = 100, nullable = false)
    private String img;

    @Column(length = 100, nullable = false)
    private String target;

    @Column(length = 100, nullable = false)
    private String attr;

    @Column(length = 100, nullable = false)
    private String cal;

    @Column(length = 100, nullable = false)
    private float duration;

    @Column(length = 100, nullable = false)
    private float val;

    @Column(length = 100, nullable = false)
    private float currentCooltime;

    @Column(length = 100, nullable = false)
    private float cooltime;

    @Column(length = 100, nullable = false)
    private String animation;

    @Column(length = 100, nullable = false)
    private float targetCnt;

    @Column(length = 100, nullable = false)
    private float ticCnt;

    @Builder
    public Skill(int idx, String code, String name, String desc, String img, String target, String attr, String cal, float duration, float val, float currentCooltime, float cooltime, String animation, float targetCnt, float ticCnt) {
        this.idx = idx;
        this.code = code;
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.target = target;
        this.attr = attr;
        this.cal = cal;
        this.duration = duration;
        this.val = val;
        this.currentCooltime = currentCooltime;
        this.cooltime = cooltime;
        this.animation = animation;
        this.targetCnt = targetCnt;
        this.ticCnt = ticCnt;
    }
}
