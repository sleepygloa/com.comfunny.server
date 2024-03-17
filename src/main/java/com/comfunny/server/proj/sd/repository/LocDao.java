package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Dc;
import com.comfunny.server.proj.sd.domain.Loc;
import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LocDao {
    List<Dc> selectLevelDcList(Params params);
    List<Zone> selectLevelDcZoneList(Params params);
    List<Loc> selectLevelDcZoneLocList(Params params);
    List<Loc> selectLocList(Params params);
}
