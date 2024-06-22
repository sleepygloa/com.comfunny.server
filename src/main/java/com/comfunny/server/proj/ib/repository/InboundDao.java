package com.comfunny.server.proj.ib.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InboundDao {

    List<Map<String, Object>> selectInboundOrderList(Map map);

    List<Map<String, Object>> selectInboundOrderDetailList(Map map);
}
