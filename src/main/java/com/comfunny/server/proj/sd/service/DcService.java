package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Dc;
import com.comfunny.server.proj.sd.domain.DcPk;
import com.comfunny.server.proj.sd.repository.DcRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class DcService {

    @Resource
    DcRepository dcRepository;
    /**
     * 물류센터 저장
     * */
    public void save(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("bizCd"))){
            throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("dcCd"))){
            throw new IllegalArgumentException("물류창고코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("dcNm"))){
            throw new IllegalArgumentException("물류창고명 는 필수 입력입니다.");
        }

        DcPk dcPk = new DcPk();
        dcPk.setBizCd((String)map.get("bizCd"));
        dcPk.setDcCd((String)map.get("dcCd"));

        Dc dc = new Dc();
        dc.setDcPk(dcPk);
        dc.setDcNm((String)map.get("dcNm"));
        dc.setBizNo((String)map.get("bizNo"));
        dc.setBizNm((String)map.get("bizNm"));
        dc.setCeoNm((String)map.get("ceoNm"));
        dc.setBizTp((String)map.get("bizTp"));
        dc.setBizKnd((String)map.get("bizKnd"));
        dc.setTelNo((String)map.get("telNo"));
        dc.setFaxNo((String)map.get("faxNo"));
        dc.setCountryCd((String)map.get("countryCd"));
        dc.setCityCd((String)map.get("cityCd"));
        dc.setContactNm((String)map.get("contactNm"));
        dc.setContactTelNo((String)map.get("contactTelNo"));
        dc.setContactEmail((String)map.get("contactEmail"));
        dc.setUserCol1((String)map.get("userCol1"));
        dc.setUserCol2((String)map.get("userCol2"));
        dc.setUserCol3((String)map.get("userCol3"));
        dc.setUserCol4((String)map.get("userCol4"));
        dc.setUserCol5((String)map.get("userCol5"));
        dc.setRemark((String)map.get("remark"));
        dc.setUseYn((String)map.get("useYn"));
        dc.setInUserId((String)map.get("s_userId"));
        dc.setUpUserId((String)map.get("s_userId"));


        dc.setDeliveryNm((String)map.get("deliveryNm"));
        dc.setZip((String)map.get("zip"));
        dc.setJibunAddr((String)map.get("jibunAddr"));
        dc.setRoadAddr((String)map.get("roadAddr"));
        dc.setDetailAddr((String)map.get("detailAddr"));
        dc.setLat((String)map.get("lat"));
        dc.setLon((String)map.get("lon"));

        dcRepository.save(dc);
    }
    /**
     * 물류센터 삭제
     * */
    public void delete(Map map) throws Exception{

        DcPk dcPk = new DcPk();
        dcPk.setBizCd((String)map.get("bizCd"));
        dcPk.setDcCd((String)map.get("dcCd"));

            Dc dc = dcRepository.findById(dcPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+dcPk.getDcCd()));
            dcRepository.delete(dc);
    }
}
