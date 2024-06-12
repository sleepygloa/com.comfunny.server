package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AreaDao {
    List<Map<String, Object>> selectDcList();
    List<Map<String, Object>> selectAreaList(Map map);
}
