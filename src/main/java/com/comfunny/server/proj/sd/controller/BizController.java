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
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@Slf4j
public class BizController {
    @Autowired
    private BizService bizService;

    @Resource
    BizRepository bizRepository;

    @Resource
    BizDao bizDao;

    @GetMapping("/api/sd/biz/{id}")
    public @ResponseBody BizResDto select(@PathVariable Long id){
        Biz entity = bizDao.select(id);
        return new BizResDto(entity);
    }

    @PostMapping("/api/sd/biz")
    public @ResponseBody List<BizResDto> selectList(@Nullable @RequestBody BizReqSchDto dto){
        return bizDao.selectList(dto);
    }

    @PutMapping("/api/sd/biz")
    public BizReqSaveDto save(@RequestBody BizReqSaveDto dto){
        return bizService.save(dto);
    }

    @DeleteMapping("/api/sd/biz/{id}")
    public void delete(@PathVariable Long id){
        bizService.delete(id);
    }
}
