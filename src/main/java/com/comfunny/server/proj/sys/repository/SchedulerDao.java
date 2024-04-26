package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Scheduler;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 *
 * */
@Mapper
public interface SchedulerDao {

    // 스케쥴러관리 조회
    List<Map<String, Object>> selectSchedulerList(Map map);

}
