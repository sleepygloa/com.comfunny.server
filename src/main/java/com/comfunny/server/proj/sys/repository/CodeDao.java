package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Code;
import com.comfunny.server.proj.sys.domain.CodeGrp;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CodeDao {
    List<Code>  selectAuthMenuList();
    Code select(String id);

    List<Map> getCodeListForSelectBox(Params params);

    List<Map> getCodeDescListForSelectBox(Params params);

    List<CodeGrp> selectCodeGrpList(Params params);

    List<Code> selectCodeList(Params params);

}
