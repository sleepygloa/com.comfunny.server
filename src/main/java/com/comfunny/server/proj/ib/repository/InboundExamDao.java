package com.comfunny.server.proj.ib.repository;

import com.comfunny.server.proj.ib.domain.Inbound;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InboundExamDao {

    // 입고지시서 조회
    List<Map<String, Object>> selectInboundExamList(Map map);

    // 입고지시서 상세 조회
    List<Map<String, Object>> selectInboundExamDetailList(Map map);

    //검수완료 처리
    void updateInboundExamCompl(Map map);

    //검수완료취소 처리
    void updateInboundExamComplCncl(Map map);


}
