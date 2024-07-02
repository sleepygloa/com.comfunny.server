package com.comfunny.server.proj.ib.service;

import com.comfunny.server.proj.ib.domain.Inbound;
import com.comfunny.server.proj.ib.domain.InboundDetail;
import com.comfunny.server.proj.ib.domain.InboundDetailPk;
import com.comfunny.server.proj.ib.domain.InboundPk;
import com.comfunny.server.proj.ib.repository.InboundDetailRepository;
import com.comfunny.server.proj.ib.repository.InboundRepository;
import com.comfunny.server.proj.sys.service.CommonService;
import com.comfunny.server.sys.config.Contraints;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static com.comfunny.server.sys.util.StringUtils.safeToLong;

@Service
@Slf4j
public class InboundPlanService extends CommonService {



    //입고예정마스터 Repository 주입
    @Resource
    InboundRepository inboundRepository;

    //입고예정상세 Repository 주입
    @Resource
    InboundDetailRepository inboundDetailRepository;

    //입고예정 마스터 저장
    public void saveInboundPlan(Map map){

        if("I".equals(map.get("modFlag"))) {
            insertInboundPlan(map);

            for (Map<String, Object> detail : (List<Map<String, Object>>) map.get("data")) {
                detail.put("ibNo", map.get("ibNo"));
                detail.put("ibPlanYmd", map.get("ibPlanYmd"));
                insertInboundPlanDetail(detail);
            }
        }else if("U".equals(map.get("modFlag"))) {
            updateInboundPlan(map);

            for (Map<String, Object> detail : (List<Map<String, Object>>) map.get("data")) {
                if ("I".equals(detail.get("modFlag")))
                    insertInboundPlanDetail(detail);
                else if ("U".equals(detail.get("modFlag")))
                    updateInboundPlanDetail(detail);
                else if("D".equals(detail.get("modFlag")))
                    deleteInboundPlanDetail(detail);
            }
        }else if("D".equals(map.get("modFlag"))) {
            for (Map<String, Object> detail : (List<Map<String, Object>>) map.get("data")) {
                deleteInboundPlanDetail(detail);
            }
            deleteInboundPlan(map);
        }
    }


    //입고예정마스터 신규등록
    private void insertInboundPlan(Map map){

        InboundPk inboundPk = new InboundPk();
        inboundPk.setBizCd(Contraints.BIZ_CD);

        //입고번호 채번
        String ibNo = getMaxSeq(Contraints.IB_NO, map);
        inboundPk.setIbNo(ibNo);

        Inbound inbound = new Inbound();
        inbound.setInboundPk(inboundPk);
        inbound.setDcCd((String)map.get("dcCd"));
        inbound.setClientCd((String)map.get("clientCd"));
        inbound.setIbGbnCd((String)map.get("ibGbnCd"));
        inbound.setIbProgStCd((String)map.get("ibProgStCd")); //10
        inbound.setIbPlanYmd((String)map.get("ibPlanYmd"));
        inbound.setSupplierCd((String)map.get("supplierCd"));
        inbound.setCarNo((String)map.get("carNo"));
        inbound.setUserCol1((String)map.get("userCol1"));
        inbound.setUserCol2((String)map.get("userCol2"));
        inbound.setUserCol3((String)map.get("userCol3"));
        inbound.setUserCol4((String)map.get("userCol4"));
        inbound.setUserCol5((String)map.get("userCol5"));
        inbound.setRemark((String)map.get("remark"));
        inbound.setUseYn((String)map.get("useYn"));

        inboundRepository.save(inbound);

        map.put("ibNo", ibNo);
    }


    //입고예정마스터 수정
    private void updateInboundPlan(Map map){
        InboundPk inboundPk = new InboundPk();
        inboundPk.setBizCd(Contraints.BIZ_CD);
        inboundPk.setIbNo((String)map.get("ibNo"));

        Inbound inbound = inboundRepository.findById(inboundPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+inboundPk.getIbNo()));

        if(!"10".equals(inbound.getIbProgStCd())){
            throw new IllegalArgumentException("입고진행상태[입고예정] 이 아닌 데이터는 삭제할 수 없습니다. id="+inboundPk.getIbNo());
        }

        inbound.setCarNo((String)map.get("carNo"));
        inbound.setUserCol1((String)map.get("userCol1"));
        inbound.setUserCol2((String)map.get("userCol2"));
        inbound.setUserCol3((String)map.get("userCol3"));
        inbound.setUserCol4((String)map.get("userCol4"));
        inbound.setUserCol5((String)map.get("userCol5"));
        inbound.setRemark((String)map.get("remark"));
        inbound.setUseYn((String)map.get("useYn"));

        inboundRepository.save(inbound);
    }

    //입고예정마스터 삭제
    private void deleteInboundPlan(Map map){
        InboundPk inboundPk = new InboundPk();
        inboundPk.setBizCd(Contraints.BIZ_CD);
        inboundPk.setIbNo((String)map.get("ibNo"));

        Inbound inbound = inboundRepository.findById(inboundPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+inboundPk.getIbNo()));

        if(!"10".equals(inbound.getIbProgStCd())){
            throw new IllegalArgumentException("입고진행상태[입고예정] 이 아닌 데이터는 삭제할 수 없습니다. id="+inboundPk.getIbNo());
        }

        inboundRepository.delete(inbound);
    }

    //입고예정상세 신규등록
    private void insertInboundPlanDetail(Map map){
        if(ObjectUtils.isEmpty(map.get("ibNo"))){
            throw new IllegalArgumentException("입고번호 은(는) 필수 입력입니다.");
        }
        if (ObjectUtils.isEmpty(map.get("itemCd"))){
            throw new IllegalArgumentException("상품코드 은(는) 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("itemNm"))){
            throw new IllegalArgumentException("상품명 은(는) 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("planQty"))){
            throw new IllegalArgumentException("예정수량 은(는) 필수 입력입니다.");
        }

        InboundDetailPk inboundDetailPk = new InboundDetailPk();
        inboundDetailPk.setBizCd(Contraints.BIZ_CD);
        inboundDetailPk.setIbNo((String)map.get("ibNo"));

        String ibDetailSeq = getMaxSeq(Contraints.IB_DETAIL_SEQ, map);
        inboundDetailPk.setIbDetailSeq(Integer.parseInt(ibDetailSeq));

        InboundDetail inboundDetail = new InboundDetail();
        inboundDetail.setInboundDetailPk(inboundDetailPk);
        inboundDetail.setIbProgStCd((String)map.get("ibProgStCd")); //10
        inboundDetail.setItemCd((String)map.get("itemCd"));
        inboundDetail.setItemNm((String)map.get("itemNm"));
        inboundDetail.setItemStCd((String)map.get("itemStCd"));


        //int to long
        int planQty = (int)map.get("planQty");
        int ibCost = (int)map.get("ibCost");
        int ibVat = (int)map.get("ibVat");
        int ibAmt = (int)map.get("ibAmt");

        inboundDetail.setPlanQty((long)planQty);
        inboundDetail.setIbCost((long)ibCost);
        inboundDetail.setIbVat((long)ibVat);
        inboundDetail.setIbAmt((long)ibAmt);

        inboundDetail.setUseYn((String)map.get("useYn"));

        //제조LOT 확인하는 로직(제조LOT이 없으면 생성(입고번호를 사용))
        if(ObjectUtils.isEmpty(map.get("makeLot"))){
            inboundDetail.setMakeLot((String)map.get("ibNo"));
        }
        if(ObjectUtils.isEmpty(map.get("makeYmd"))){
            inboundDetail.setMakeLot((String)map.get("ibPlanYmd"));
        }

        inboundDetailRepository.save(inboundDetail);
    }

    //입고예정상세 수정
    private void updateInboundPlanDetail(Map map){
        InboundDetailPk inboundDetailPk = new InboundDetailPk();
        inboundDetailPk.setBizCd(Contraints.BIZ_CD);
        inboundDetailPk.setIbNo((String)map.get("ibNo"));
        inboundDetailPk.setIbDetailSeq((int)map.get("ibDetailSeq"));

        InboundDetail inboundDetail = inboundDetailRepository.findById(inboundDetailPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. 입고번호["+inboundDetailPk.getIbNo()+"] 입고상세순번["+inboundDetailPk.getIbDetailSeq()+"]"));

        if(!"10".equals(inboundDetail.getIbProgStCd())){
            throw new IllegalArgumentException("입고진행상태[입고예정] 이 아닌 데이터는 수정할 수 없습니다. 입고번호["+inboundDetailPk.getIbNo()+"] 입고상세순번["+inboundDetailPk.getIbDetailSeq()+"]");
        }

        inboundDetail.setPlanQty(safeToLong((String)map.get("planQty"), 0l));
        inboundDetail.setIbCost(safeToLong((String)map.get("ibCost"), 0l));
        inboundDetail.setIbVat(safeToLong((String)map.get("ibVat"), 0l));
        inboundDetail.setIbAmt(safeToLong((String)map.get("ibAmt"), 0l));

        inboundDetail.setUseYn((String)map.get("useYn"));

        inboundDetailRepository.save(inboundDetail);
    }

    //입고예정상세 삭제
    private void deleteInboundPlanDetail(Map map){
        InboundDetailPk inboundDetailPk = new InboundDetailPk();
        inboundDetailPk.setBizCd(Contraints.BIZ_CD);
        inboundDetailPk.setIbNo((String)map.get("ibNo"));
        inboundDetailPk.setIbDetailSeq((int)map.get("ibDetailSeq"));

        InboundDetail inboundDetail = inboundDetailRepository.findById(inboundDetailPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. 입고번호["+inboundDetailPk.getIbNo()+"] 입고상세순번["+inboundDetailPk.getIbDetailSeq()+"]"));

        if(!"10".equals(inboundDetail.getIbProgStCd())){
            throw new IllegalArgumentException("입고진행상태[입고예정] 이 아닌 데이터는 삭제할 수 없습니다. 입고번호["+inboundDetailPk.getIbNo()+"] 입고상세순번["+inboundDetailPk.getIbDetailSeq()+"]");
        }

        inboundDetailRepository.delete(inboundDetail);
    }
}
