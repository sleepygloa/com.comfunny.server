package com.comfunny.server.proj.st.repository;

import com.comfunny.server.proj.st.domain.StockInoutHist;
import com.comfunny.server.proj.st.domain.StockInoutHistPk;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 재고수불 Dao
 * */
@Mapper
public interface StockInoutHistDao {
    // 재고수불 이력 등록
    void insertStockInoutHist(Map map);


    // 재고수불 이력 삭제
    void deleteStockInoutHist(Map map);
}
