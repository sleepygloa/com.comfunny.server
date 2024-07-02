package com.comfunny.server.proj.ib.controller;


import com.comfunny.server.proj.ib.repository.InboundExamDao;
import com.comfunny.server.proj.ib.service.InboundExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

/**
 * 입고검수
 * */
@Controller
@RequestMapping("/wms/ib/inboundExam")
public class InboundExamController {

    /**
     * 입고검수 Dao
     */
    @Resource
    private InboundExamDao inboundExamDao;
    /**
     * 입고검수 Service
     */
    @Resource
    private InboundExamService inboundExamService;

    /**
     * 입고검수 조회
     * */
    @RequestMapping("/selectInboundExamList")
    public ResponseEntity selectInboundExamList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundExamDao.selectInboundExamList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * 입고검수 상세 조회
     * */
    @RequestMapping("/selectInboundExamDetailList")
    public ResponseEntity selectInboundExamDetailList(@RequestBody Map map) {
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(inboundExamDao.selectInboundExamDetailList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * 입고검수 저장(전표 검수완료)
     * */
    @RequestMapping("/saveInboundExam")
    public ResponseEntity saveInboundExam(@RequestBody Map map) {
        inboundExamService.saveInboundExam(map);
        return ResponseEntity.ok().build();
    }
    /**
     * 입고검수 저장(전표 검수완료취소)
     * */
    @RequestMapping("/saveInboundExamCncl")
    public ResponseEntity saveInboundExamCncl(@RequestBody Map map) {
        inboundExamService.saveInboundExamCncl(map);
        return ResponseEntity.ok().build();
    }

    /**
     * 입고검수 검수완료
     * */
    @RequestMapping("/saveInboundExamDetailCompl")
    public ResponseEntity saveInboundExamDetailCompl(@RequestBody Map map) {
        inboundExamService.saveInboundExamDetailCompl(map);
        return ResponseEntity.ok().build();
    }

    /**
     * 입고검수 검수완료취소
     * */
    @RequestMapping("/saveInboundExamDetailComplCncl")
    public ResponseEntity saveInboundExamDetailComplCncl(@RequestBody Map map) {
        inboundExamService.saveInboundExamDetailComplCncl(map);
        return ResponseEntity.ok().build();
    }

}
