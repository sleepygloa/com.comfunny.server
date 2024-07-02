package com.comfunny.server.proj.st.repository;

import com.comfunny.server.proj.st.domain.Stock;
import com.comfunny.server.proj.st.domain.StockPk;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 재고 Dao
 * */
@Mapper
public interface StockDao {
    //재고 생성
    void insertStock(Map map);

//    void updateStock(Stock stock);

    //재고 삭제
    void deleteStock(Map map);
}
