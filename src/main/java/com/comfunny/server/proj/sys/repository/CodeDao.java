package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Code;
import com.comfunny.server.proj.sys.domain.CodeGrp;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CodeDao {
    List<Code>  selectAuthMenuList();
    Code select(String id);

    List<Map> getCodeListForSelectBox(Map map);

    List<Map> getCodeDescListForSelectBox(Map map);

    List<CodeGrp> selectCodeGrpList(Map map);

    List<Code> selectCodeList(Map map);

}
