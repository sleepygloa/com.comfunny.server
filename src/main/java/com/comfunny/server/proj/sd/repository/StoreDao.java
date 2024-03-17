package com.comfunny.server.proj.sd.repository;

import com.comfunny.server.proj.sd.domain.Store;
import com.comfunny.server.sys.paramaters.Params;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StoreDao {

    List<Store> selectStoreList(Params params);
}
