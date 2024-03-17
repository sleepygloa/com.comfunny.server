package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Area;
import com.comfunny.server.proj.sd.domain.Dc;
import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ZoneDao {
    List<Dc> selectLevelDcList(Params params);
    List<Area> selectLevelAreaList(Params params);
    List<Zone> selectLevelZoneList(Params params);

    List<Zone> selectZoneList(Params params);
}
