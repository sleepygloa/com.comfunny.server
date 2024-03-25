package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.UserDc;
import com.comfunny.server.proj.sys.repository.UserDcDao;
import com.comfunny.server.proj.sys.repository.UserDcRepository;
import com.comfunny.server.proj.sys.service.UserDcService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
@Slf4j
@RequestMapping("/api/sys/userDc")
public class UserDcController {

    @Resource
    private UserDcRepository userDcRepository;
    @Resource
    private UserDcDao userDcDao;

    @Autowired
    private UserDcService userDcService;

    /**
     * @Program : 사용자물류센터 화면이동
     * @Desc :
     * */
    @RequestMapping
    public String sysUserDc(){
        return "/sys/sysUserDc";
    }

//
//    /**
//     * @Program : 사용자물류센터관리 조회
//     * @Desc : 사용자 데이터 조회
//     * */
//    @RequestMapping("/selectUserList")
//    public Params selectUserList(Params params){
//        Params outParams = new CommParams();
//        outParams.setParam("dt_list", userDcDao.selectUserList(params));
//        return outParams;
//    }
//
//
//    /**
//     * @Program : 사용자물류센터관리 조회
//     * @Desc : 물류센터 데이터 조회
//     * */
//    @RequestMapping("/selectDcList")
//    public Params selectDcList(Params params){
//        Params outParams = new CommParams();
//        outParams.setParam("dt_list", userDcDao.selectDcList(params));
//        return outParams;
//    }
//
//    /**
//     * @Program : 사용자물류센터관리 조회
//     * @Desc : 사용자물류센터 데이터 조회
//     * */
//    @RequestMapping("/selectUserDcList")
//    public Params selectUserDcList(Params params){
//        List<UserDc> list = userDcDao.selectUserDcList(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        outParams.setParam("dt_grid", list);
//        return outParams;
//    }
//
//
//    /**
//     * @Program : 사용자물류센터관리 조회
//     * @Desc : 사용자물류센터 데이터 저장
//     * */
//    @RequestMapping("/saveUserDc")
//    public Params saveUserDc(Params params){
//        userDcService.saveUserDc(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    /**
//     * @Program : 사용자물류센터관리 조회
//     * @Desc : 사용자물류센터 데이터 삭제
//     * */
//    @RequestMapping("/deleteUserDc")
//    public Params deleteUserDc(Params params){
//        userDcService.deleteUserDc(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
}
