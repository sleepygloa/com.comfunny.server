package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Domain;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface DomainDao {

    List<Domain> selectDomainList(Map map);

}
