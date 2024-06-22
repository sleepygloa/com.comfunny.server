package com.comfunny.server.proj.ib.controller;


import com.comfunny.server.proj.ib.repository.InboundDao;
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
@RequestMapping("/wms/ib/inbound")
public class InboundController {

    /**
     * 입고지시서 Dao
     */
    @Resource
    private InboundDao inboundDao;

    /**
     * 입고지시서 조회
     * */
    @RequestMapping("/selectInboundOrderList")
    public ResponseEntity selectInboundOrderList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundDao.selectInboundOrderList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * 입고지시서 상세 조회
     * */
    @RequestMapping("/selectInboundOrderDetailList")
    public ResponseEntity selectInboundOrderDetailList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundDao.selectInboundOrderDetailList(map));
        return ResponseEntity.ok().body(list);
    }

}
