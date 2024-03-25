package com.comfunny.server.proj.sys.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
//@Builder
public class IndexVo {
    private String companyCd;
    private int userSeq;
    private String userId;
    private String userPwd;
    private String userNo;
    private String userNm;
    private String userPhone;
    private String userEmail;
    private String userPosition;
    private String userBirthDt;
    private String userRole;
    private int pwdFailCnt;
    private String latelyTry;
    private String lastLoginDt;
    private String tempPwd;
    private String pushId;
    private String adminYn;
    private String useYn;
    private String delYn;
    private String inUserId;
    private String upUserId;
    private String inDt;
    private String upDt;
    private String userJoinDate;
    private String pwdChgDt;
    private String userLang;
    private String userCountry;
    private String printDriver;

//    @Builder
//    public IndexVo(String companyCd, int userSeq, String userId, String userPwd, String userNo, String userNm, String userPhone, String userEmail, String userPosition, String userBirthDt, String userRole, int pwdFailCnt, String latelyTry, String lastLoginDt, String tempPwd, String pushId, String adminYn, String useYn, String delYn, String inUserId, String upUserId, String inDt, String upDt, String userJoinDate, String pwdChgDt, String userLang, String userCountry, String printDriver) {
//        this.companyCd = companyCd;
//        this.userSeq = userSeq;
//        this.userId = userId;
//        this.userPwd = userPwd;
//        this.userNo = userNo;
//        this.userNm = userNm;
//        this.userPhone = userPhone;
//        this.userEmail = userEmail;
//        this.userPosition = userPosition;
//        this.userBirthDt = userBirthDt;
//        this.userRole = userRole;
//        this.pwdFailCnt = pwdFailCnt;
//        this.latelyTry = latelyTry;
//        this.lastLoginDt = lastLoginDt;
//        this.tempPwd = tempPwd;
//        this.pushId = pushId;
//        this.adminYn = adminYn;
//        this.useYn = useYn;
//        this.delYn = delYn;
//        this.inUserId = inUserId;
//        this.upUserId = upUserId;
//        this.inDt = inDt;
//        this.upDt = upDt;
//        this.userJoinDate = userJoinDate;
//        this.pwdChgDt = pwdChgDt;
//        this.userLang = userLang;
//        this.userCountry = userCountry;
//        this.printDriver = printDriver;
//    }
}
