package com.comfunny.server.proj.ib.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InboundPlanDao {

    // 입고지시서 조회
    List<Map<String, Object>> selectInboundList(Map map);

    // 입고지시서 상세 조회
    List<Map<String, Object>> selectInboundDetailList(Map map);

    // 물류센터 조회
    List<Map<String, Object>> selectDcCmbList();

    // 고객사 조회
    List<Map<String, Object>> selectClientCmbList();
}
