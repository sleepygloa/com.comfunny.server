package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SdCommonDao {
    //고객사 공통코드
    List<Map> selectClientCmbList(Params params);
    //물류창고 공통코드
    List<Map> selectDcCmbList(Params params);
    //구역 공통코드
    List<Map> selectAreaCmbList(Params params);
}
