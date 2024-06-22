package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemUomDao {
    List<Map<String, Object>> selectItemUomList(Map map);
}
