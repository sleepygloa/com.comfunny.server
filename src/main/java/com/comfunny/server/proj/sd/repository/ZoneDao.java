package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ZoneDao {
    List<Map<String, Object>> selectLevelDcList(Map map);
    List<Map<String, Object>> selectLevelAreaList(Map map);
    List<Map<String, Object>> selectLevelZoneList(Map map);

    List<Map<String, Object>> selectZoneList(Map map);
}
