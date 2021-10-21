package com.nambi.book.web.dto.serverAPI;

import com.nambi.book.domain.ServerAPI.Achievement;
import lombok.Getter;

@Getter
public class AchievementListResponseDto {

    private String code;
    private String name;
    private String codeGroupCd;
    private String codeGroupNm;
    private int achievementCondition;
    private String achievementConditionNm;
    private int order;

    public AchievementListResponseDto(Achievement entity){
        this.code = entity.getCode();
        this.name = entity.getName();
        this.codeGroupCd = entity.getCodeGroupCd();
        this.codeGroupNm = entity.getCodeGroupNm();
        this.achievementCondition = entity.getAchievementCondition();
        this.achievementConditionNm = entity.getAchievementConditionNm();
        this.order = entity.getOrder();
    }
}
