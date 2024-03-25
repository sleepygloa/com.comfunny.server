package com.comfunny.server.proj.sys.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MessageDao {

    List<Map> selectMessageList(Map map);

}
