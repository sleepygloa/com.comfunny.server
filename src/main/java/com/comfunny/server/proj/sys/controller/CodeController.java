package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.repository.CodeDao;
import com.comfunny.server.proj.sys.service.CodeService;
import com.comfunny.server.sys.paramaters.CommParams;
import com.comfunny.server.sys.paramaters.Params;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@Slf4j
@RequestMapping("/api/sys/code")
public class CodeController {

    @Autowired
    private CodeService codeService;

    @Resource
    private CodeDao codeDao;


    /*********************************************************************************
     * 공통영역
     ******************************************************************************* */
    /**
     * @Program : 공통영역
     * @Desc : select box 에서 사용하는 공통코드 리스트 조회
     */
    @PostMapping("/getCodeListForSelectBox")
    public Params getCodeListForSelectBox(Params params) {
        Params outParams = new CommParams();
        outParams.setParam("dt_list", codeService.getCodeListForSelectBox(params));
        return outParams;
    }

    /**
     * @Program : 공통영역
     * @Desc : select box 에서 사용하는 공통코드 리스트 조회
     * 공통코드 VALUE : CODE_CD, NAME :CODE_NM || CODE_DESC
     */
    @PostMapping("/getCodeDescListForSelectBox")
    public Params getCodeDescListForSelectBox(Params params) {
        Params outParams = new CommParams();
        outParams.setParam("dt_list", codeService.getCodeDescListForSelectBox(params));
        return  outParams;
    }

    /*********************************************************************************
     * 프로그램영역
     ******************************************************************************* */

    /**
     * 코드관리 페이지이동
     * */
    @GetMapping
    public String codePgMove() {
        return "sys/sysCode";
    }


    /**
     * @Program : 코드관리
     * @Desc : 코드그룹 조회
     * */
    @RequestMapping("/selectCodeGrpList")
    public Params selectCodeGrpList(Params params){
        Params outParams = new CommParams();
        outParams.setParam("dt_grid", codeDao.selectCodeGrpList(params));
        return  outParams;
    }
    /**
     * @Program : 코드관리
     * @Desc : 코드 조회
     * */
    @RequestMapping("/selectCodeList")
    public Params selectCodeList(Params params){
        Params outParams = new CommParams();
        outParams.setParam("dt_grid", codeDao.selectCodeList(params));
        return outParams;
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드그룹 저장
     * */
    @RequestMapping("/saveCodeGrp")
    public Params saveCodeGrp(Params params) throws Exception{
        codeService.saveCodeGrp(params);
        Params outParams = new CommParams();
        outParams.setStsCd(200);
        return outParams;
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드그룹 삭제
     * */
    @RequestMapping("/deleteCodeGrp")
    public Params deleteCodeGrp(Params params) throws Exception{
        codeService.deleteCodeGrp(params);
        Params outParams = new CommParams();
        outParams.setStsCd(200);
        return outParams;
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드 저장
     * */
    @RequestMapping("/saveCode")
    public Params saveCode(Params params) throws Exception{
        codeService.saveCode(params);

        Params outParams = new CommParams();
        outParams.setStsCd(200);
        return outParams;
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드 삭제
     * */
    @RequestMapping("/deleteCode")
    public Params deleteCode(Params params) throws Exception{
        codeService.deleteCode(params);
        Params outParams = new CommParams();
        outParams.setStsCd(200);
        return outParams;
    }

}
