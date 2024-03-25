package com.comfunny.server.proj.sys.dto;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserPk;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Server To Client
 * */
//@Entity
@Setter
@Getter
//@Table(name = "tb_sy_user_info")
public class UserInfoSaveDto {

    private String bizCd;
    private Long userNo;
    private String userId;
    private String userPwd; //사용자비밀번호
    private String userNm;
    private String userPhone;
    private String userEmail;
    private String userPosition;
    private String userBirthDt;
    private String userRole;
    private int pwdFailCnt;
    private LocalDateTime latelyTry;
    private String lastLoginDt;
    private String tempPwd;
    private String pushId;
    private String adminYn;
    private String useYn;
    private String delYn;
    private String userJoinDate;
    private String pwdChgDt;
    private String userLang;
    private String userCountry;
    private String printDriver;

    @Builder
    public User toEntity(){
        return User.builder()
                .userPk(new UserPk(userId))
                .bizCd(bizCd)
                .password(userPwd)
                .build();

    }

}

