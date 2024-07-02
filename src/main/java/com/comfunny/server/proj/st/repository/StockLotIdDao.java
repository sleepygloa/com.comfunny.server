package com.comfunny.server.proj.st.repository;

import com.comfunny.server.proj.st.domain.StockLotId;
import com.comfunny.server.proj.st.domain.StockLotIdPk;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 재고LotId Dao
 * */
@Mapper
public interface StockLotIdDao {

    void insertStockLotId(Map map);
    void deleteStockLotId(Map map);
}
