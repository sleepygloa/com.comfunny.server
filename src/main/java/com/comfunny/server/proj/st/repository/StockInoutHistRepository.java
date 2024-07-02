package com.comfunny.server.proj.st.repository;

import com.comfunny.server.proj.st.domain.Stock;
import com.comfunny.server.proj.st.domain.StockInoutHist;
import com.comfunny.server.proj.st.domain.StockInoutHistPk;
import com.comfunny.server.proj.st.domain.StockPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 재고수불 Repository
 * */
@Repository
public interface StockInoutHistRepository extends JpaRepository<StockInoutHist, StockInoutHistPk> {

}
