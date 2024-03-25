package com.comfunny.server.proj.sys.repository;


import com.comfunny.server.proj.sys.domain.User;
import com.comfunny.server.proj.sys.dto.UserInfoReqDto;
import com.comfunny.server.proj.sys.dto.UserInfoResDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface UserDao {
    List<UserInfoResDto> selectMainBy(UserInfoReqDto dto);
    List<UserInfoResDto> selectLoginUserId(User dto);
    List<UserInfoResDto> selectLoginUserPwd(User dto);

    List<User> selectUserList(Map map);
}
