package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.UserCnnLog;
import com.comfunny.server.proj.sys.repository.UserCnnLogDao;
import com.comfunny.server.proj.sys.repository.UserCnnLogRepository;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Slf4j
@RequestMapping("/api/sys/userCnnLog")
public class UserCnnLogController {

    @Resource
    private UserCnnLogRepository userCnnLogRepository;
    @Resource
    private UserCnnLogDao userCnnLogDao;

    /**
     * @Program : 유저접속로그 화면이동
     * @Desc :
     * */
    @RequestMapping
    public String selectLeftMenu(){
        return "/sys/sysUserCnnLog";
    }



    /**
     * @Program : 유저접속로그관리 조회
     * @Desc : 유저접속로그 데이터 조회
     * */
    @RequestMapping("/selectUserCnnLogList")
    public Params selectUserCnnLogList(Params params){
        List<UserCnnLog> list = userCnnLogDao.selectUserCnnLogList(params);

        Params outParams = new CommParams();
        outParams.setStsCd(200);
        outParams.setParam("dt_grid", list);
        return outParams;
    }

}
