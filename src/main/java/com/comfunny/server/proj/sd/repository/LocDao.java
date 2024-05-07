package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LocDao {
    List<Map<String, Object>> selectLevelDcList(Map map);
    List<Map<String, Object>> selectLevelDcZoneList(Map map);
    List<Map<String, Object>> selectLevelDcZoneLocList(Map map);
    List<Map<String, Object>> selectLocList(Map map);
}
