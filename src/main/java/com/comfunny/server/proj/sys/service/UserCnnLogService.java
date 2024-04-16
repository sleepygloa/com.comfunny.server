package com.comfunny.server.proj.sys.service;

import com.comfunny.server.proj.sys.domain.UserCnnLog;
import com.comfunny.server.proj.sys.domain.UserCnnLogPk;
import com.comfunny.server.proj.sys.repository.UserCnnLogDao;
import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/* 클라이언트 및 서버 환경에서 작업시 로그를 저장하는 Service */
@Service
@Slf4j
public class UserCnnLogService extends CommonService {

    @Resource
    UserCnnLogRepository userCnnLogRepository;
    @Resource
    UserCnnLogDao UserCnnLogDao;

    public String getToday() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate today = LocalDate.now();
        return today.format(formatter);
    }

    /* 로그저장  */
    public void insertUserCnnLog(HttpServletRequest request, String userId, String code, String value){
        // 클라이언트의 IP 주소 가져오기
        String clientIp = request.getRemoteAddr();
        // 클라이언트의 User-Agent 정보 가져오기 (device 정보를 얻을 수 있음)
        String userAgent = request.getHeader("User-Agent");

        UserCnnLogPk userCnnLogPk = new UserCnnLogPk();
        Long seq = userCnnLogRepository.getMaxSequenceForToday(getToday());
        userCnnLogPk.setSeq(seq);

        UserCnnLog userCnnLog = new UserCnnLog();
        userCnnLog.setUserId(userId);
        userCnnLog.setCode(code);
        userCnnLog.setValue(value);
        userCnnLog.setLoginOs(userAgent);
        userCnnLog.setLoginIp(clientIp);
        userCnnLog.setUserCnnLogPk(userCnnLogPk);

        userCnnLogRepository.save(userCnnLog);
    }
}
