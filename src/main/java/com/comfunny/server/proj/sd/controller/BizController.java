package com.comfunny.server.proj.sd.controller;

import com.comfunny.server.proj.sd.dto.BizReqSaveDto;
import com.comfunny.server.proj.sd.dto.BizReqSchDto;
import com.comfunny.server.proj.sd.dto.BizResDto;
import com.comfunny.server.proj.sd.domain.Biz;
import com.comfunny.server.proj.sd.repository.BizDao;
import com.comfunny.server.proj.sd.repository.BizRepository;
import com.comfunny.server.proj.sd.service.BizService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Controller
@Slf4j
@RequestMapping("/wms/sd/biz")
public class BizController {
    @Autowired
    private BizService bizService;

    @Resource
    BizRepository bizRepository;

    @Resource
    BizDao bizDao;

    @RequestMapping("/selectBizList")
    public ResponseEntity selectBizList(@RequestBody Map map){
        List<Map<String, Object>> list =  convertSnakeCaseKeysToCamelCase(bizDao.selectBizList(map));
        return ResponseEntity.ok().body(list);
    }

    /**
     * @Program : 사업자 관리
     * @Desc : 사업자 저장
     * */
    @RequestMapping("/saveBiz")
    public ResponseEntity saveBiz(@RequestBody Map map){
        bizService.save(map);
        return ResponseEntity.ok().build();
    }

    /**
     * @Program : 사업자 관리
     * @Desc : 사업자 삭제
     * */
    @RequestMapping("/deleteBiz")
    public ResponseEntity deleteBiz(@RequestBody Map map){
        bizService.delete(map);
        return ResponseEntity.ok().build();
    }
}
