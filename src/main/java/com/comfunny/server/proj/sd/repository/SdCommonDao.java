package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SdCommonDao {
    //고객사 공통코드
    List<Map<String, Object>> selectClientCmbList(Map map);
    //물류창고 공통코드
    List<Map<String, Object>> selectDcCmbList(Map map);
    //구역 공통코드
    List<Map<String, Object>> selectAreaCmbList(Map map);
}
