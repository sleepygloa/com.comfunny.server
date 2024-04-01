package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface UserDao {
    List<User> selectUserList(Map map);
}
