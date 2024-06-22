package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BizDao  {
    List<Map<String, Object>> selectList(Map map);

}
