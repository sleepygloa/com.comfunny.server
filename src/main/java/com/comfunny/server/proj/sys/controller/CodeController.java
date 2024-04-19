package com.comfunny.server.proj.sys.controller;

import com.comfunny.server.proj.sys.domain.Code;
import com.comfunny.server.proj.sys.domain.CodeGrp;
import com.comfunny.server.proj.sys.repository.CodeDao;
import com.comfunny.server.proj.sys.service.CodeService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static com.comfunny.server.sys.util.Utils.*;

@Controller
@Slf4j
@RequestMapping("/wms/sys/code")
public class CodeController {

    @Autowired
    private CodeService codeService;

    @Resource
    private CodeDao codeDao;

    @PostMapping("/code")
    public void getCodeListForSelectBox() {
    }
//
//
//    /*********************************************************************************
//     * 공통영역
//     ******************************************************************************* */
//    /**
//     * @Program : 공통영역
//     * @Desc : select box 에서 사용하는 공통코드 리스트 조회
//     */
//    @PostMapping("/getCodeListForSelectBox")
//    public Params getCodeListForSelectBox(Params params) {
//        Params outParams = new CommParams();
//        outParams.setParam("dt_list", codeService.getCodeListForSelectBox(params));
//        return outParams;
//    }
//
//    /**
//     * @Program : 공통영역
//     * @Desc : select box 에서 사용하는 공통코드 리스트 조회
//     * 공통코드 VALUE : CODE_CD, NAME :CODE_NM || CODE_DESC
//     */
//    @PostMapping("/getCodeDescListForSelectBox")
//    public Params getCodeDescListForSelectBox(Params params) {
//        Params outParams = new CommParams();
//        outParams.setParam("dt_list", codeService.getCodeDescListForSelectBox(params));
//        return  outParams;
//    }
//
    /*********************************************************************************
     * 프로그램영역
     ******************************************************************************* */
    /**
     * @Program : 코드관리
     * @Desc : 코드그룹 조회
     * */
    @RequestMapping("/selectCodeGrpList")
    public ResponseEntity selectCodeGrpList(@RequestBody Map map){
        List<Map> list =  convertEntityListToMapList(codeDao.selectCodeGrpList(map));
        return ResponseEntity.ok().body(list);
    }
    /**
     * @Program : 코드관리
     * @Desc : 코드 조회
     * */
    @RequestMapping("/selectCodeList")
    public ResponseEntity selectCodeList(@RequestBody Map map){
        List<Map> list =  convertEntityListToMapList(codeDao.selectCodeList(map));
        return ResponseEntity.ok().body(list);
    }


    /**
     * @Program : 코드관리
     * @Desc : 코드그룹 저장
     * */
    @RequestMapping("/saveCodeGrp")
    public ResponseEntity saveCodeGrp(@RequestBody Map map) {
        codeService.saveCodeGrp(map);
        return ResponseEntity.ok().build();
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드그룹 삭제
     * */
    @RequestMapping("/deleteCodeGrp")
    public ResponseEntity deleteCodeGrp(@RequestBody Map map) {
        codeService.deleteCodeGrp(map);
        return ResponseEntity.ok().build();
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드 저장
     * */
    @RequestMapping("/saveCode")
    public ResponseEntity saveCode(@RequestBody Map map) {
        codeService.saveCode(map);
        return ResponseEntity.ok().build();
    }

    /**
     * @Program : 코드관리
     * @Desc : 코드 삭제
     * */
    @RequestMapping("/deleteCode")
    public ResponseEntity deleteCode(@RequestBody Map map) {
        codeService.deleteCode(map);
        return ResponseEntity.ok().build();
    }

}
