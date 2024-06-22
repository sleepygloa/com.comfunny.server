package com.comfunny.server.proj.ib.controller;


import com.comfunny.server.proj.ib.repository.InboundPlanDao;
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
     * 입고지시서 Dao
     */
    @Resource
    private InboundPlanDao inboundPlanDao;

    /**
     * 입고지시서 조회
     * */
    @RequestMapping("/selectInboundOrderList")
    public ResponseEntity selectInboundOrderList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectInboundList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * 입고지시서 상세 조회
     * */
    @RequestMapping("/selectInboundOrderDetailList")
    public ResponseEntity selectInboundOrderDetailList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundPlanDao.selectInboundDetailList(map));
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

}
