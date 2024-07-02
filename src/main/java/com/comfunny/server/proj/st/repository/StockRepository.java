package com.comfunny.server.proj.st.repository;

import com.comfunny.server.proj.ib.domain.InboundDetail;
import com.comfunny.server.proj.ib.domain.InboundDetailPk;
import com.comfunny.server.proj.st.domain.Stock;
import com.comfunny.server.proj.st.domain.StockPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 재고 Repository
 * */
@Repository
public interface StockRepository extends JpaRepository<Stock, StockPk> {

}
