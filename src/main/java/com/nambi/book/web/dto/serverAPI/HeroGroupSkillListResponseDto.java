package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.HeroGroupSkill;
import lombok.Getter;

@Getter
public class HeroGroupSkillListResponseDto {

    private String code;
    private String name;

    public HeroGroupSkillListResponseDto(HeroGroupSkill entity){
        this.code = entity.getCode();
        this.name = entity.getName();
    }
}
