package com.comfunny.server.proj.sd.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemDao {

    //대분류 조회
    List<Map<String, Object>> selectLargeClassCdList(Map map);

    //중분류 조회
    List<Map<String, Object>> selectLargeMiddleClassCdList(Map map);

    //소분류 조회
    List<Map<String, Object>> selectLargeMiddleSmallClassCdList(Map map);

    //상품 조회
    List<Map<String, Object>> selectItemList(Map map);
}
