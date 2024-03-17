package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.dto.BizReqSaveDto;
import com.comfunny.server.proj.sd.domain.Biz;
import com.comfunny.server.proj.sd.repository.BizDao;
import com.comfunny.server.proj.sd.repository.BizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class BizService {

    @Resource
    BizRepository bizRepository;

    @Resource
    BizDao bizDao;

    public BizReqSaveDto save(BizReqSaveDto dto){
        if(dto.getId() < 1){
            Long id = bizDao.selectMaxId();
            dto.setId(id);
            bizRepository.save(dto.toEntity());
        }else{
            bizRepository.save(dto.toEntity());
        }
        return dto;
    }

    public void delete(Long id){
        Biz biz = bizRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+id));

        bizRepository.delete(biz);
    }
}
