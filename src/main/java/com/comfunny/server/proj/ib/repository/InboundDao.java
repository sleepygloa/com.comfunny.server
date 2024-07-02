package com.comfunny.server.proj.ib.repository;

import com.comfunny.server.proj.ib.domain.Inbound;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InboundDao {

    //입고전표 목록 조회
    List<Map<String, Object>> selectInboundOrderList(Map map);

    //입고전표 상세 목록 조회
    List<Map<String, Object>> selectInboundOrderDetailList(Map map);

    //입고전표 대상 조회
    Map<String, Object> selectInbound(Map map);

    //입고전표상세 대상 조회
    Map<String, Object> selectInboundDetail(Map map);

    //입고전표상세 갯수 조회
    int selectInboundDetailCnt(Map map);

    //입고전표 상세 처리가능상태 목록 조회
    List<Map<String, Object>> selectInboundDetailTargetStatus(Map map);



}
