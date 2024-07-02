package com.comfunny.server.proj.ib.service;

import com.comfunny.server.proj.ib.domain.Inbound;
import com.comfunny.server.proj.ib.domain.InboundDetail;
import com.comfunny.server.proj.ib.domain.InboundDetailPk;
import com.comfunny.server.proj.ib.domain.InboundPk;
import com.comfunny.server.proj.ib.repository.InboundDao;
import com.comfunny.server.proj.ib.repository.InboundDetailRepository;
import com.comfunny.server.proj.ib.repository.InboundExamDao;
import com.comfunny.server.proj.ib.repository.InboundRepository;
import com.comfunny.server.proj.st.domain.*;
import com.comfunny.server.proj.st.repository.*;
import com.comfunny.server.proj.sys.service.CommonService;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.comfunny.server.sys.util.StringUtils.safeToInt;
import static com.comfunny.server.sys.util.StringUtils.safeToLong;
import static com.comfunny.server.sys.util.Utils.convertSnakeCaseKeysToCamelCase;

@Service
@Slf4j
public class InboundExamService extends CommonService {

    //입고 Dao 주입
    @Resource
    InboundDao inboundDao;
    //입고검수 Dao 주입
    @Resource
    InboundExamDao inboundExamDao;

    //입고검수 Repository 주입
    @Resource
    InboundRepository inboundRepository;

    //입고검수상세 Repository 주입
    @Resource
    InboundDetailRepository inboundDetailRepository;

    //재고 Repository 주입
    @Resource
    StockRepository stockRepository;
    //재고 Dao 주입
    @Resource
    StockDao stockDao;

    //재고수불 Repository 주입
    @Resource
    StockInoutHistRepository stockInoutHistRepository;
    //재고수불 Dao 주입
    @Resource
    StockInoutHistDao stockInoutHistDao;

    //재고LOTID Repository 주입
    @Resource
    StockLotIdRepository stockLotIdRepository;
    //재고LOTID Dao 주입
    @Resource
    StockLotIdDao stockLotIdDao;

    //입고검수 저장(전표 검수완료)
    @Transactional
    public void saveInboundExam(Map map){
        //자주사용하는 변수 선언
        String bizCd = Contraints.BIZ_CD;
        String ibNo = (String)map.get("ibNo");
        String todayYmd = StringUtils.getToday();

        //입고전표 대상 조회(TB_IB_M)
        Map inbound = inboundDao.selectInbound(map);
        if(inbound.isEmpty()){
            throw new IllegalArgumentException("입고전표가 존재하지 않습니다. id="+ibNo);
        }

        //입고상세 대상 조회(TB_IB_D)
        int inboundDetailCnt = inboundDao.selectInboundDetailCnt(map);
        if(inboundDetailCnt == 0){
            throw new IllegalArgumentException("입고전표의 상세 데이터들이 존재하지 않습니다. id="+ibNo);
        }

        //입고상세 검수완료 데이터 조회(입고진행상태가 30:입고검수, 1건이라도 없으면 검수완료할 수 없음)
        map.put("ibProgStCd", "30");
        List<Map<String, Object>> inboundDetailList = convertSnakeCaseKeysToCamelCase(inboundDao.selectInboundDetailTargetStatus(map));
        if(inboundDetailList.isEmpty()){
            throw new IllegalArgumentException("검수완료할 데이터가 존재하지 않습니다. id="+ibNo);
        }

        //입고전표 상태 변경(입고진행상태 30:검수완료)
        map.put("ibProgStCd", "30");
        map.put("ibYmd", todayYmd);
        inboundExamDao.updateInboundExamCompl(map);


        for(Map<String, Object> inboundDetail : inboundDetailList){
            inboundDetail.put("dcCd", map.get("dcCd"));
            inboundDetail.put("clientCd", map.get("clientCd"));
            inboundDetail.put("ibPlanYmd", map.get("ibPlanYmd"));

            //LOT 생성
            String lotId = getMaxSeq(Contraints.LOT_ID, inboundDetail);
            inboundDetail.put("lotId", lotId);
            inboundDetail.put("ibNo", ibNo);
            inboundDetail.put("ibYmd", todayYmd);
            stockLotIdDao.insertStockLotId(inboundDetail);

            //EA 생성
            //재고 생성
            String stockNo = getMaxSeq(Contraints.STOCK_NO, inboundDetail);
            inboundDetail.put("stockNo", stockNo);
//            inboundDetail.setLocCd(inboundDetail.getLocCd());
            inboundDetail.put("lotId", lotId);
            inboundDetail.put("pltId", "");
            //수량
            inboundDetail.put("stockQty", 0);
            inboundDetail.put("ibPlanQty", inboundDetail.get("examQty"));
            inboundDetail.put("obPlanQty", 0);
            inboundDetail.put("holdQty", 0);
            stockDao.insertStock(inboundDetail);

            //수불생성
            String inoutHistNo = getMaxSeq(Contraints.INOUT_HIST_NO, inboundDetail);
            inboundDetail.put("inoutHistNo", inoutHistNo);
            inboundDetail.put("inoutYmd", todayYmd);
            inboundDetail.put("iobGbnCd", "1");
            inboundDetail.put("inoutQty", inboundDetail.get("examQty"));
            stockInoutHistDao.insertStockInoutHist(inboundDetail);
        }
    }


    //입고검수 취소(전표 검수완료취소)
    @Transactional
    public void saveInboundExamCncl(Map map){
        //자주사용하는 변수 선언
        String bizCd = Contraints.BIZ_CD;
        String ibNo = (String)map.get("ibNo");
        String todayYmd = StringUtils.getToday();

        //입고전표 대상 조회(TB_IB_M)
        InboundPk inboundPk = new InboundPk();
        inboundPk.setBizCd(bizCd);
        inboundPk.setIbNo(ibNo);

        //입고상세 대상 조회(TB_IB_D)
        int inboundDetailCnt = inboundDao.selectInboundDetailCnt(map);
        if(inboundDetailCnt == 0){
            throw new IllegalArgumentException("입고전표의 상세 데이터들이 존재하지 않습니다. id="+ibNo);
        }

        //입고상세 검수완료 데이터 조회(입고진행상태가 30:입고검수, 1건이라도 없으면 검수완료할 수 없음)
        map.put("ibProgStCd", "30");
        List<Map<String, Object>> inboundDetailList = convertSnakeCaseKeysToCamelCase(inboundDao.selectInboundDetailTargetStatus(map));
        if(inboundDetailList.isEmpty()){
            throw new IllegalArgumentException("검수완료할 데이터가 존재하지 않습니다. id="+ibNo);
        }

        //입고전표 상태 변경(입고진행상태 30:검수완료)
        map.put("ibProgStCd", "10");
        inboundExamDao.updateInboundExamComplCncl(map);


        for(Map<String, Object> inboundDetail : inboundDetailList){
            inboundDetail.put("dcCd", map.get("dcCd"));
            inboundDetail.put("clientCd", map.get("clientCd"));
            inboundDetail.put("ibPlanYmd", map.get("ibPlanYmd"));

            //LOT 삭제
            String lotId = getMaxSeq(Contraints.LOT_ID, inboundDetail);
            inboundDetail.put("lotId", lotId);
            inboundDetail.put("ibNo", ibNo);
            inboundDetail.put("ibYmd", todayYmd);
            stockLotIdDao.deleteStockLotId(inboundDetail);

            //EA 삭제
            //재고 삭제
            String stockNo = getMaxSeq(Contraints.STOCK_NO, inboundDetail);
            inboundDetail.put("stockNo", stockNo);
//            inboundDetail.setLocCd(inboundDetail.getLocCd());
//            inboundDetail.put("lotId", lotId);
//            inboundDetail.put("pltId", "");
//            //수량
//            inboundDetail.put("stockQty", 0);
//            inboundDetail.put("ibPlanQty", inboundDetail.get("examQty"));
//            inboundDetail.put("obPlanQty", 0);
//            inboundDetail.put("holdQty", 0);
            stockDao.deleteStock(inboundDetail);

            //수불 삭제
            String inoutHistNo = getMaxSeq(Contraints.INOUT_HIST_NO, inboundDetail);
            inboundDetail.put("inoutHistNo", inoutHistNo);
//            inboundDetail.put("inoutYmd", todayYmd);
//            inboundDetail.put("iobGbnCd", "1");
//            inboundDetail.put("inoutQty", inboundDetail.get("examQty"));
            stockInoutHistDao.deleteStockInoutHist(inboundDetail);
        }
    }

    //입고검수 검수완료
    public void saveInboundExamDetailCompl(Map map){


        for(Map<String, Object> data : (List<Map<String, Object>>)map.get("data")){

            //자주사용하는 변수 선언
            String bizCd = Contraints.BIZ_CD;
            String ibNo = (String)data.get("ibNo");
            String todayYmd = StringUtils.getToday();

            //입고상세 대상 조회(TB_IB_D)
            InboundDetailPk inboundDetailPk = new InboundDetailPk();
            inboundDetailPk.setBizCd(bizCd);
            inboundDetailPk.setIbNo(ibNo);
            inboundDetailPk.setIbDetailSeq((int)data.get("ibDetailSeq"));

            //입고전표 대상 조회(TB_IB_M)
            InboundPk inboundPk = new InboundPk();
            inboundPk.setBizCd(bizCd);
            inboundPk.setIbNo(ibNo);

            Inbound inbound = inboundRepository.findById(inboundPk)
                    .orElseThrow(()->new IllegalArgumentException("입고전표가 존재하지 않습니다. id="+inboundPk.getIbNo()));

            //입고상세 검수할 데이터 조회
            Optional<InboundDetail> optInboundDetail = inboundDetailRepository.findById(inboundDetailPk);
            if(optInboundDetail.isEmpty()){
                throw new IllegalArgumentException("검수처리할 데이터가 존재하지 않습니다. id="+inboundDetailPk.getIbNo());
            }

            InboundDetail inboundDetail = optInboundDetail.get();
            boolean chkStatus = ("10".equals(inboundDetail.getIbProgStCd()) || "20".equals(inboundDetail.getIbProgStCd()));
            if(!chkStatus){
                throw new IllegalArgumentException("입고예정[10], 입고승인[20] 상태에서만 검수 가능합니다. id="+inboundDetail.getItemCd());
            }

            //입고상세 상태 변경(입고진행상태 40:검수완료)
            inboundDetail.setIbProgStCd("30");
            inboundDetail.setExamQty((int)data.get("examQty"));
            inboundDetailRepository.save(inboundDetail);
        }
    }
    //입고검수 검수완료취소
    public void saveInboundExamDetailComplCncl(Map map){

        for(Map<String, Object> data : (List<Map<String, Object>>)map.get("data")){

            //자주사용하는 변수 선언
            String bizCd = Contraints.BIZ_CD;
            String ibNo = (String)data.get("ibNo");
            String todayYmd = StringUtils.getToday();

            //입고상세 대상 조회(TB_IB_D)
            InboundDetailPk inboundDetailPk = new InboundDetailPk();
            inboundDetailPk.setBizCd(bizCd);
            inboundDetailPk.setIbNo(ibNo);
            inboundDetailPk.setIbDetailSeq((int)data.get("ibDetailSeq"));

            //입고전표 대상 조회(TB_IB_M)
            InboundPk inboundPk = new InboundPk();
            inboundPk.setBizCd(bizCd);
            inboundPk.setIbNo(ibNo);

            Inbound inbound = inboundRepository.findById(inboundPk)
                    .orElseThrow(()->new IllegalArgumentException("입고전표가 존재하지 않습니다. id="+inboundPk.getIbNo()));

            //입고상세 검수할 데이터 조회(입고진행상태가 10:입고예정, 20:입고승인)
            Optional<InboundDetail> optInboundDetail = inboundDetailRepository.findById(inboundDetailPk);
            if(optInboundDetail.isEmpty()){
                throw new IllegalArgumentException("검수처리할 데이터가 존재하지 않습니다. id="+inboundDetailPk.getIbNo());
            }

            InboundDetail inboundDetail = optInboundDetail.get();
            boolean chkStatus = ("30".equals(inboundDetail.getIbProgStCd()));
            if(!chkStatus){
                throw new IllegalArgumentException("입고검수[30] 상태에서만 검수취소 가능합니다. id="+inboundDetail.getItemCd());
            }

            //입고상세 상태 변경(입고진행상태 40:검수완료)
            inboundDetail.setIbProgStCd("10");
            inboundDetail.setExamQty(0);
            inboundDetailRepository.save(inboundDetail);
        }
    }

}
