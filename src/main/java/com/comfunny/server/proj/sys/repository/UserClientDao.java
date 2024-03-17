package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.UserClient;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserClientDao {

    //사용자 조회
    List<Map> selectUserList(Params params);

    //고객사 조회
    List<Map> selectClientList(Params params);
    List<UserClient> selectUserClientList(Params params);

}
