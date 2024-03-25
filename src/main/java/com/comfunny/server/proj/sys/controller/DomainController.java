package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.Domain;
import com.comfunny.server.proj.sys.repository.DomainDao;
import com.comfunny.server.proj.sys.repository.DomainRepository;
import com.comfunny.server.proj.sys.service.DomainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/api/sys/domain")
public class DomainController {

//    private DomainService domainService;

    @Resource
    private DomainRepository domainRepository;
    @Resource
    private DomainDao domainDao;

    @Autowired
    private DomainService domainService;
//
//    /**
//     * @Program : 도메인 화면이동
//     * @Desc :
//     * */
//    @RequestMapping
//    public String selectLeftMenu(){
//        return "/sys/sysDomain";
//    }
//
//    /**
//     * @Program : 도메인 데이터 조회
//     * @Desc :
//     * */
//    @GetMapping("/getCoreDomain")
//    public Params getDomain(Params params){
//        List<Domain> domainList = domainRepository.findAllByDomainPkBizCdAndDomainPkLangCd(params.getString("s_bizCd"), params.getString("s_language"));
//        Map map = new HashMap();
//        for(Domain domain : domainList){
//            map.put(domain.getDomainPk().getDomainId(), domain.getDomainNm());
//        }
//        params.setParam("dt_domain", map);
//        return params;
//    }
//
//
//
//    /**
//     * @Program : 도메인관리 조회
//     * @Desc : 도메인데이터조회
//     * */
//    @RequestMapping("/selectDomainList")
//    public Params selectDomainList(Params params){
//        List<Domain> list = domainDao.selectDomainList(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        outParams.setParam("dt_grid", list);
//        return outParams;
//    }
//
//    /**
//     * @Program : 도메인 관리
//     * @Desc : 도메인 저장
//     * */
//    @RequestMapping("/saveDomain")
//    public Params saveDomain(Params params) throws Exception{
//        domainService.saveDomain(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
}
