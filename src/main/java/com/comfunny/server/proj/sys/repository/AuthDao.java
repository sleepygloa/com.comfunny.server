package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.*;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AuthDao {
    List<AuthGrp>  selectAuthGrpList();
    List<AuthUser>  selectAuthUserList(Params params);
    List<User>  selectNonAuthUserList();
    List<AuthMenu>  selectAuthMenuList(Params params);

}
