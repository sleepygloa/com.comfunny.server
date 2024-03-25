package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Scheduler;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SchedulerDao {

    List<Scheduler> selectSchedulerList(Map map);

}
