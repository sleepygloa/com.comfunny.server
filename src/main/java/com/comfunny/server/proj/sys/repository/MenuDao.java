package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Menu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MenuDao {

    Menu select(String id);

    /**
     * @Program : 메인화면 사이드 메뉴조회
     * @Desc :
     * */
    List<Map<String, Object>> selectLeftMenu(Map map);
    /**
     * @Program : 메인화면 사이드 메뉴조회
     * @Desc :
     * */
    List<Map> findAllByTree2();
}
