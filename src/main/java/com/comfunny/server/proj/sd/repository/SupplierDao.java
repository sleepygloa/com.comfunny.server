package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Supplier;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SupplierDao {

    List<Map<String, Object>> selectSupplierList(Map map);
}
