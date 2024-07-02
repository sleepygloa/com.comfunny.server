package com.comfunny.server.proj.st.repository;

import com.comfunny.server.proj.st.domain.Stock;
import com.comfunny.server.proj.st.domain.StockLotId;
import com.comfunny.server.proj.st.domain.StockLotIdPk;
import com.comfunny.server.proj.st.domain.StockPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 재고LotId Repository
 * */
@Repository
public interface StockLotIdRepository extends JpaRepository<StockLotId, StockLotIdPk> {

}
