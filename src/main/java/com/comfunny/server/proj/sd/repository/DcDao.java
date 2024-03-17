package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Dc;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DcDao {
    List<Dc> selectDcList(Params params);
}
