package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.AuthGrp;
import com.comfunny.server.proj.sys.domain.AuthMenu;
import com.comfunny.server.proj.sys.domain.AuthUser;
import com.comfunny.server.proj.sys.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AuthDao {
    List<AuthGrp>  selectAuthGrpList();
    List<AuthUser>  selectAuthUserList(Map map);
    List<User>  selectNonAuthUserList();
    List<AuthMenu>  selectAuthMenuList(Map map);

}
