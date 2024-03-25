package com.comfunny.server.proj.sys.dto;

import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.domain.UserPk;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Client To Server
 * */
@Setter
@Getter
@NoArgsConstructor
public class UserInfoReqDto {

    private String userId;
    private String userNm;
    private String bizCd;

    private boolean activated;
    private String nickname;
    private String password;
    private String username;
    private String userNo;
    private String userPhone;
    private String userEmail;
    private String userPosition;
    private long pwdFailCnt;
    private LocalDateTime latelyTry;
    private LocalDateTime lastLoginDt;
    private String pushId;
    private String adminYn;
    private String userJoinDt;
    private String pwdChgDt;
    private String userLangCd;
    private String userCountryCd;
    private String printerIp;
    private String useYn;
    private String delYn;



}

