package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Animal;
import com.nambi.book.domain.ServerAPI.Skill;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
public class SkillListResponseDto {

    private int idx;
    private String code;
    private String name;
    private String desc;
    private String img;
    private String target;
    private String attr;
    private String cal;
    private float duration;
    private float val;
    private float currentCooltime;
    private float cooltime;
    private String animation;
    private float targetCnt;
    private float ticCnt;


    public SkillListResponseDto(Skill entity){
        this.idx = entity.getIdx();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.desc = entity.getDesc();
        this.img = entity.getImg();
        this.target = entity.getTarget();
        this.attr = entity.getAttr();
        this.cal = entity.getCal();
        this.duration = entity.getDuration();
        this.val = entity.getVal();
        this.currentCooltime = entity.getCurrentCooltime();
        this.cooltime = entity.getCooltime();
        this.animation = entity.getAnimation();
        this.targetCnt = entity.getTargetCnt();
        this.ticCnt = entity.getTicCnt();
    }
}
