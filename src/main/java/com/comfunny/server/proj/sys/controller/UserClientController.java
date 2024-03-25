package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.UserClient;
import com.comfunny.server.proj.sys.repository.UserClientDao;
import com.comfunny.server.proj.sys.repository.UserClientRepository;
import com.comfunny.server.proj.sys.service.UserClientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Slf4j
@RequestMapping("/api/sys/userClient")
public class UserClientController {

    @Resource
    private UserClientRepository userClientRepository;
    @Resource
    private UserClientDao userClientDao;

    @Autowired
    private UserClientService userClientService;

    /**
     * @Program : 사용자고객사 화면이동
     * @Desc :
     * */
    @RequestMapping
    public String sysUserClient(){
        return "/sys/sysUserClient";
    }
//
//
//    /**
//     * @Program : 사용자고객사관리 조회
//     * @Desc : 사용자 데이터 조회
//     * */
//    @RequestMapping("/selectUserList")
//    public Params selectUserList(Params params){
//        Params outParams = new CommParams();
//        outParams.setParam("dt_list", userClientDao.selectUserList(params));
//        return outParams;
//    }
//
//
//    /**
//     * @Program : 사용자고객사관리 조회
//     * @Desc : 고객사 데이터 조회
//     * */
//    @RequestMapping("/selectClientList")
//    public Params selectClientList(Params params){
//        Params outParams = new CommParams();
//        outParams.setParam("dt_list", userClientDao.selectClientList(params));
//        return outParams;
//    }
//
//    /**
//     * @Program : 사용자고객사관리 조회
//     * @Desc : 사용자고객사 데이터 조회
//     * */
//    @RequestMapping("/selectUserClientList")
//    public Params selectUserClientList(Params params){
//        List<UserClient> list = userClientDao.selectUserClientList(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        outParams.setParam("dt_grid", list);
//        return outParams;
//    }
//
//
//    /**
//     * @Program : 사용자고객사관리 조회
//     * @Desc : 사용자고객사 데이터 저장
//     * */
//    @RequestMapping("/saveUserClient")
//    public Params saveUserClient(Params params){
//        userClientService.saveUserClient(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    /**
//     * @Program : 사용자고객사관리 조회
//     * @Desc : 사용자고객사 데이터 삭제
//     * */
//    @RequestMapping("/deleteUserClient")
//    public Params deleteUserClient(Params params){
//        userClientService.deleteUserClient(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
}
