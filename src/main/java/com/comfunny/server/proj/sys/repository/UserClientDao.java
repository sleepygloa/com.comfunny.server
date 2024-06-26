package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.UserClient;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserClientDao {

    //사용자 조회
    List<Map> selectUserList(Map map);

    //고객사 조회
    List<Map> selectClientList(Map map);
    List<UserClient> selectUserClientList(Map map);

}
