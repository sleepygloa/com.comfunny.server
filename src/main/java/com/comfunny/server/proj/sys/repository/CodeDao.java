package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Code;
import com.comfunny.server.proj.sys.domain.CodeGrp;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

@Mapper
public interface CodeDao {
    List<Code>  selectAuthMenuList();
    Code select(String id);

    List<Map> getCodeListForSelectBox(Map map);

    List<Map> getCodeDescListForSelectBox(Map map);

    List<Map<String, Object>> selectCodeGrpList(Map map);

    List<Map<String, Object>> selectCodeList(Map map);

}
