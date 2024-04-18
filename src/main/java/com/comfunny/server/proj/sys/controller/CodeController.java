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
    public ResponseEntity selectCodeList(Map map){
        List<Map> list =  convertEntityListToMapList(codeDao.selectCodeList(map));
        return ResponseEntity.ok().body(list);
    }

    // Entity 리스트를 Map 리스트로 변환하는 메서드
    private <T> List<Map> convertEntityListToMapList(List<T> entityList) {
        AtomicInteger counter = new AtomicInteger(1);
        return entityList.stream()
                .map(entity -> entityToMap(entity, counter.getAndIncrement()))
                .collect(Collectors.toList());
    }
    // Entity 객체를 Map으로 변환하여 순번을 추가하는 메서드
    private <T> Map entityToMap(T entity, int id) {
        Map<String, Object> map = new HashMap<>();
        // Entity 객체의 각 필드를 동적으로 가져와서 Map에 추가
        try {
            Class<?> clazz = entity.getClass();
            Field tableField = clazz.getDeclaredField("table");
            tableField.setAccessible(true);
            Object[] table = (Object[]) tableField.get(entity);
            for (Object node : table) {
                if (node != null) {
                    Field keyField = node.getClass().getDeclaredField("key");
                    keyField.setAccessible(true);
                    Object key = keyField.get(node);
                    if (key != null) {
                        Field valueField = node.getClass().getDeclaredField("value");
                        valueField.setAccessible(true);
                        Object value = valueField.get(node);
                        if (value != null) {
                            map.put(convertSnakeToCamel(key.toString()), value.toString());
                        }
                    }
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        }
        // 순번을 Map에 추가
        map.put("id", id);
        return map;
    }

    private String convertSnakeToCamel(String snakeCase) {
        StringBuilder camelCase = new StringBuilder();

        // 문자열을 '_'로 분리하여 배열로 저장
        String[] parts = snakeCase.split("_");

        // 첫 단어는 소문자로 유지
        camelCase.append(parts[0].toLowerCase());

        // 나머지 단어의 첫 글자만 대문자로 변환하여 이어붙임
        for (int i = 1; i < parts.length; i++) {
            camelCase.append(Character.toUpperCase(parts[i].charAt(0)));
            if (parts[i].length() > 1) {
                camelCase.append(parts[i].substring(1).toLowerCase());
            }
        }

        return camelCase.toString();
    }
//
//    /**
//     * @Program : 코드관리
//     * @Desc : 코드그룹 저장
//     * */
//    @RequestMapping("/saveCodeGrp")
//    public Params saveCodeGrp(Params params) throws Exception{
//        codeService.saveCodeGrp(params);
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    /**
//     * @Program : 코드관리
//     * @Desc : 코드그룹 삭제
//     * */
//    @RequestMapping("/deleteCodeGrp")
//    public Params deleteCodeGrp(Params params) throws Exception{
//        codeService.deleteCodeGrp(params);
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    /**
//     * @Program : 코드관리
//     * @Desc : 코드 저장
//     * */
//    @RequestMapping("/saveCode")
//    public Params saveCode(Params params) throws Exception{
//        codeService.saveCode(params);
//
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }
//
//    /**
//     * @Program : 코드관리
//     * @Desc : 코드 삭제
//     * */
//    @RequestMapping("/deleteCode")
//    public Params deleteCode(Params params) throws Exception{
//        codeService.deleteCode(params);
//        Params outParams = new CommParams();
//        outParams.setStsCd(200);
//        return outParams;
//    }

}
