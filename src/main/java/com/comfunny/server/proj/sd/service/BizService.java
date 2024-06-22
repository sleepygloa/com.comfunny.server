package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Biz;
import com.comfunny.server.proj.sd.repository.BizDao;
import com.comfunny.server.proj.sd.repository.BizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class BizService {

    @Resource
    BizRepository bizRepository;

    @Resource
    BizDao bizDao;

    public void save(Map map){

        if(ObjectUtils.isEmpty(map.get("bizCd"))){
            throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("bizNo"))){
            throw new IllegalArgumentException("사업자번호 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("bizNm"))){
            throw new IllegalArgumentException("사업자명 는 필수 입력입니다.");
        }

        Biz biz = new Biz();
        biz.setBizCd((String)map.get("bizCd"));
        biz.setBizNm((String)map.get("bizNm"));
        biz.setCeo((String)map.get("ceo"));
        biz.setBizNo((String)map.get("bizNo"));
//        biz.setInduty((String)map.get("induty"));
        biz.setBizCnd((String)map.get("bizCnd"));
        biz.setTelNo((String)map.get("telNo"));
        biz.setFaxNo((String)map.get("faxNo"));
        biz.setEtcTp1((String)map.get("etcTp1"));
        biz.setEtcTp2((String)map.get("etcTp2"));
        biz.setEtcNo1((String)map.get("etcNo1"));
        biz.setEtcNo2((String)map.get("etcNo2"));

        biz.setUseYn((String)map.get("useYn"));
        biz.setExtCol1((String)map.get("extCol1"));
        biz.setExtCol2((String)map.get("extCol2"));
        biz.setExtCol3((String)map.get("extCol3"));
        biz.setExtCol4((String)map.get("extCol4"));
        biz.setExtCol5((String)map.get("extCol5"));


        biz.setDeliveryNm((String)map.get("deliveryNm"));
        biz.setZip((String)map.get("zip"));
        biz.setJibunAddr((String)map.get("jibunAddr"));
        biz.setRoadAddr((String)map.get("roadAddr"));
        biz.setDetailAddr((String)map.get("detailAddr"));
        biz.setLat((String)map.get("lat"));
        biz.setLon((String)map.get("lon"));

        bizRepository.save(biz);
    }

    public void delete(Map map){
        Biz bizPk = new Biz();
        bizPk.setBizCd((String)map.get("bizCd"));

        Biz biz = bizRepository.findById(bizPk.getBizCd())
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+bizPk.getBizCd()));

        bizRepository.delete(biz);
    }
}
