package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.UserCnnLog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserCnnLogDao {

    List<UserCnnLog> selectUserCnnLogList(Map map);

}
