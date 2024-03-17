package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Scheduler;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SchedulerDao {

    List<Scheduler> selectSchedulerList(Params params);

}
