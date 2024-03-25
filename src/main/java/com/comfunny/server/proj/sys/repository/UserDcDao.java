package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.UserDc;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDcDao {
    //사용자 조회
    List<Map> selectUserList(Map map);

    //물류센터 조회
    List<Map> selectDcList(Map map);

    List<UserDc> selectUserDcList(Map map);

}
