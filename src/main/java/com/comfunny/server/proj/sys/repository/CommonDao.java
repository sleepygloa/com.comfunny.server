package com.comfunny.server.proj.sys.repository;

import com.comfunny.server.proj.sys.domain.Code;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface CommonDao {

    //[공통] 전역변수 공통코드 조회
    List<Map<String, Object>> selectCodeByGroupCodeAllList();

    //[공통] 물류창고 공통코드 조회
    List<Map<String, Object>> selectDcList();

    //[공통] 고객사 공통코드 조회
    List<Map<String, Object>> selectClientList();

    //[공통] 신규채번 아이템코드

    //상품코드 MAX 조회
    public String findMaxItemCd(String bizCd, String clientCd);

    //공급처 MAX 조회
    public String findMaxSupplierCd(String bizCd, String clientCd);

    //배송처 MAX 조회
    public String findMaxStoreCd(String bizCd, String clientCd);

    //물류센터 MAX 조회
    public String findMaxDcCd(String bizCd);

    //고객사 MAX 조회
    public String findMaxClientCd(String bizCd);

    //입고번호 MAX 조회
    public String findMaxIbNo(String bizCd, String ibPlanYmd);
    //입고상세순번 MAX 조회
    public String findMaxIbDetailSeq(String bizCd, String ibNo);
    //재고번호 MAX 조회
    public String findMaxStockNo(String bizCd, String ibPlanYmd);

    //LOT_ID MAX 조회
    public String findMaxLotId(String bizCd, String dcCd, String clientCd, String itemCd, String ibNo, String ibPlanYmd);

    //INOUT_HIST_NO MAX 조회
    public String findMaxInoutHistNo(String bizCd, String ibPlanYmd);


}
