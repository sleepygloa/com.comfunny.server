package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.dto.BizReqSchDto;
import com.comfunny.server.proj.sd.dto.BizResDto;
import com.comfunny.server.proj.sd.domain.Biz;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BizDao  {
    List<BizResDto> selectList(BizReqSchDto dto);
    Biz select(Long id);
    Long selectMaxId();

    List<Map<String, String>> selectBizCmb();
}
