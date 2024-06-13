package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LocDao {
    List<Map<String, Object>> selectDcList();
    List<Map<String, Object>> selectDcAreaList();
    List<Map<String, Object>> selectDcAreaZoneList();
    List<Map<String, Object>> selectLocList(Map map);
}
