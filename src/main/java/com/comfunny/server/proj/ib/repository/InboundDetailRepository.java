package com.comfunny.server.proj.ib.repository;

import com.comfunny.server.proj.ib.domain.InboundDetail;
import com.comfunny.server.proj.ib.domain.InboundDetailPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InboundDetailRepository extends JpaRepository<InboundDetail, InboundDetailPk> {

    //입고검수상세 갯수 조회
    @Query(value = "SELECT COUNT(*) FROM tb_ib_d WHERE BIZ_CD = ?1 AND IB_NO = ?2", nativeQuery = true)
    public int countByInboundDetailPkBizCdAndInboundDetailPkIbNo(String bizCd, String ibNo);

    //입고상세 상태 조회
    @Query(value = "SELECT * FROM tb_ib_d WHERE BIZ_CD = ?1 AND IB_NO = ?2 AND IB_PROG_ST_CD = ?3", nativeQuery = true)
    public List<InboundDetail> findByInboundDetailPkBizCdAndInboundDetailPkIbNoAndIbProgStCd(String bizCd, String ibNo, String ibProgStCd);

    //입고상세 상태 조회(IN)
    @Query(value = "SELECT * FROM tb_ib_d WHERE BIZ_CD = ?1 AND IB_NO = ?2 AND IB_PROG_ST_CD IN (?3)", nativeQuery = true)
    public List<InboundDetail> findByInboundDetailPkBizCdAndInboundDetailPkIbNoAndIbProgStCds(String bizCd, String ibNo, String ibProgStCd);
}
