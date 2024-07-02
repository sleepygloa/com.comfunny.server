package com.comfunny.server.proj.ib.controller;


import com.comfunny.server.proj.ib.repository.InboundPlanDao;
import com.comfunny.server.proj.ib.service.InboundPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

/**
 * 입고지시서
 * */
@Controller
@RequestMapping("/wms/ib/inboundPlan")
public class InboundPlanController {

    /**
     * 입고예정 Dao
     */
    @Resource
    private InboundPlanDao inboundPlanDao;
    /**
     * 입고예정 Service
     */
    @Resource
    private InboundPlanService inboundPlanService;

    /**
     * 입고예정 조회
     * */
    @RequestMapping("/selectInboundPlanList")
    public ResponseEntity selectInboundPlanList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectInboundPlanList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * 입고예정 상세 조회
     * */
    @RequestMapping("/selectInboundPlanDetailList")
    public ResponseEntity selectInboundPlanDetailList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectInboundPlanDetailList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * 물류챵고 조회
     * */
    @RequestMapping("/selectDcCmbList")
    public ResponseEntity selectDcCmbList() {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectDcCmbList());
        return ResponseEntity.ok().body(list);
    }

    /**
     * 고객사 조회
     * */
    @RequestMapping("/selectClientCmbList")
    public ResponseEntity selectClientCmbList() {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectClientCmbList());
        return ResponseEntity.ok().body(list);
    }
    /**
     * 고객사 조회
     * */
    @RequestMapping("/selectSupplierCmbList")
    public ResponseEntity selectSupplierCmbList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectSupplierCmbList(map));
        return ResponseEntity.ok().body(list);
    }


    /**
     * 입고예정의 상품 조회
     * */
    @RequestMapping("/selectInboundPlanItemPopList")
    public ResponseEntity selectInboundPlanItemPopList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectInboundPlanItemPopList(map));
        return ResponseEntity.ok().body(list);
    }
    /**
     * 입고예정팝업 저장 조회
     * */
    @RequestMapping("/saveInboundPlan")
    public ResponseEntity saveInboundPlan(@RequestBody Map map) {
        inboundPlanService.saveInboundPlan(map);
        return ResponseEntity.ok().build();
    }

}
