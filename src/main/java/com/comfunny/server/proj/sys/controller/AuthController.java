package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.*;
import com.comfunny.server.proj.sys.repository.AuthDao;
import com.comfunny.server.proj.sys.repository.DomainRepository;
import com.comfunny.server.proj.sys.service.AuthService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/api/sys/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Resource
    private DomainRepository domainRepository;

    @Resource
    private AuthDao authDao;


    /**
     * @Program : 사용자  프로그램별 권한리스트
     * @Desc :
     * */
    @RequestMapping("/listCheckAuth")
    public Params listCheckAuth(HttpSession session, Params params) {


        String sBizCd = params.getString("s_bizCd");
        String sLangCd = params.getString("s_langCd");

        //전체 도메인 조회
        List<Domain> domainList = domainRepository.findAllByDomainPkBizCdAndDomainPkLangCd(sBizCd, sLangCd);
        Map domainMap = new HashMap<>();
        for(Domain d : domainList){
            domainMap.put(d.getDomainPk().getDomainId(), d.getDomainNm());
        }

        //변수세팅
        List<Map<String,String>> returnList = new ArrayList<>();
        String domains = params.getString("domains");
        String[] domainArr = domains.split(",");
        for(String domainId : domainArr){
            String domainNm = (domainMap.get(domainId) != null ? (String)domainMap.get(domainId) : "");

            if(!domainNm.equals("")){
                Map<String,String> nameMap = new HashMap<String, String>();
                nameMap.put("lang_key", domainId);
                nameMap.put("lang_text", domainNm);
                returnList.add(nameMap);
            }
        }

        Params outParams = new CommParams();
        outParams.setParam("dt_domainname", returnList);
        return outParams;
    }


    /*****************************************************************************************************
     * 권한관리 프로그램
     *************************************************************************************************** */



    /**
     * @Program : 권한관리 페이지이동
     * */
    @GetMapping
    public String authPgMove() {
        return "sys/sysAuth";
    }


    /**
     * @Program : 권한관리
     * @Desc : 권한그룹 조회
     * */
    @RequestMapping("/selectAuthGrpList")
    public Params selectAuthGrpList(Params params){
        Params outParams = new CommParams();
        List<AuthGrp> list = authDao.selectAuthGrpList();
        outParams.setStsCd(200);
        outParams.setParam("dt_grid", list);
        return outParams;
    }

    /**
     * @Program : 권한관리
     * @Desc : 권한사용자 조회
     * */
    @RequestMapping("/selectAuthUserList")
    public Params selectAuthUserList(Params params){
        Params outParams = new CommParams();
        List<AuthUser> list = authDao.selectAuthUserList(params);
        outParams.setStsCd(200);
        outParams.setParam("dt_grid", list);
        return outParams;
    }
    /**
     * @Program : 권한관리
     * @Desc : 미등록권한사용자 조회
     * */
    @RequestMapping("/selectNonAuthUserList")
    public Params selectNonAuthUserList(Params params){
        Params outParams = new CommParams();
        List<User> list = authDao.selectNonAuthUserList();
        outParams.setStsCd(200);
        outParams.setParam("dt_grid", list);
        return outParams;
    }

    /**
     * @Program : 권한관리
     * @Desc : 권한메뉴 조회
     * */
    @RequestMapping("/selectAuthMenuList")
    public Params selectAuthMenuList(Params params){
        Params outParams = new CommParams();
        List<AuthMenu> list = authDao.selectAuthMenuList(params);
        outParams.setStsCd(200);
        outParams.setParam("dt_grid", list);
        return outParams;
    }
//
//
//    /**
//     * @Program : 권한관리
//     * @Desc : 권한 저장
//     * */
//    @PostMapping("/api/sys/auth/saveAuth")
//    public void saveAuth(@RequestBody AuthReqDto dto){
//        authService.saveAuth(dto);
//    }
//
//    /**
//     * @Program : 권한관리
//     * @Desc : 권한 삭제
//     * */
//    @PostMapping("/api/sys/auth/deleteAuth")
//    public void deleteAuth(@RequestBody AuthReqDto dto){
//        authService.deleteAuth(dto);
//    }

}
