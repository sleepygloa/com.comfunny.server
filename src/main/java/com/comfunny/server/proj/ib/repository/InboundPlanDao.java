package com.comfunny.server.proj.ib.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InboundPlanDao {

    // 입고지시서 조회
    List<Map<String, Object>> selectInboundPlanList(Map map);

    // 입고지시서 상세 조회
    List<Map<String, Object>> selectInboundPlanDetailList(Map map);

    // 물류센터 조회
    List<Map<String, Object>> selectDcCmbList();

    // 고객사 조회
    List<Map<String, Object>> selectClientCmbList();
    // 공급처 조회
    List<Map<String, Object>> selectSupplierCmbList(Map map);
    // 입고예정의 상품 조회
    List<Map<String, Object>> selectInboundPlanItemPopList(Map map);
}
