package com.comfunny.server.proj.sys.dto;

import com.comfunny.server.proj.sys.domain.User;
import lombok.*;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Server To Client
 * */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResDto {

    private int id;
    private String bizCd;
    private String userId;
    private String password; //사용자비밀번호
    private String userNo;
    private String nickname;
    private String username;
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

    public Page<UserInfoResDto> toDtoList(Page<User> entity){
        AtomicInteger cnt = new AtomicInteger(1);
        Page<UserInfoResDto> list = entity.map(m -> UserInfoResDto.builder()
                .id(cnt.getAndIncrement())
                .bizCd(m.getBizCd())
                .userId(m.getUserPk().getUserId())
                .password(m.getPassword())
                .userNo(m.getUserNo())
                .nickname(m.getNickname())
                .username(m.getUsername())
                .userPhone(m.getUserPhone())
                .userEmail(m.getUserEmail())
                .userPosition(m.getUserPosition())
                .pwdFailCnt(m.getPwdFailCnt())
                .latelyTry(m.getLatelyTry())
                .lastLoginDt(m.getLastLoginDt())
                .pushId(m.getPushId())
                .adminYn(m.getAdminYn())
                .userJoinDt(m.getUserJoinDt())
                .pwdChgDt(m.getPwdChgDt())
                .userLangCd(m.getUserLangCd())
                .userCountryCd(m.getUserCountryCd())
                .printerIp(m.getPrinterIp())
                .useYn(m.getUseYn())
                .delYn(m.getDelYn())
                .build());
        return list;
    }
}

