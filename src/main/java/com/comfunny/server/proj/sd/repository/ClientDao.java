package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Client;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ClientDao {
    //고객사 드랍박스 조회
    List<Map<String, Object>> selectClientCmbList(Map map);

    List<Map<String, Object>> selectClientList(Map map);
}
