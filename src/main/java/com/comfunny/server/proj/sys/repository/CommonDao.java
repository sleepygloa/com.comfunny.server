package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Code;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommonDao {

    //[공통] 전역변수 공통코드 조회
    List<Map<String, Object>> selectCodeByGroupCodeAllList();


    List<Code>  selectAuthMenuList();
    Code select(String id);

    List<Map> getCodeListForSelectBox(Map map);

    List<Map> getCodeDescListForSelectBox(Map map);

    List<Map<String, Object>> selectCodeGrpList(Map map);

    List<Map<String, Object>> selectCodeList(Map map);

}
