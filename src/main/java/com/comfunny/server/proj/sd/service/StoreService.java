package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Store;
import com.comfunny.server.proj.sd.domain.StorePk;
import com.comfunny.server.proj.sd.repository.StoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class StoreService {

    @Resource
    StoreRepository storeRepository;
    /**
     * 배송처 저장
     * */
    public void save(Map map) throws Exception{
            if(ObjectUtils.isEmpty(map.get("bizCd"))){
                    throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
            }
            if(ObjectUtils.isEmpty(map.get("clientCd"))){
                    throw new IllegalArgumentException("고객사코드 는 필수 입력입니다.");
            }
            if(ObjectUtils.isEmpty(map.get("storeCd"))){
                    throw new IllegalArgumentException("배송처코드 는 필수 입력입니다.");
            }
            if(ObjectUtils.isEmpty(map.get("storeNm"))){
                    throw new IllegalArgumentException("배송처명 는 필수 입력입니다.");
            }

            StorePk storePk = new StorePk();
            storePk.setBizCd((String)map.get("bizCd"));
            storePk.setClientCd((String)map.get("clientCd"));
            storePk.setStoreCd((String)map.get("storeCd"));

            Store store = new Store();
            store.setStorePk(storePk);
            store.setStoreNm((String)map.get("storeNm"));
            store.setBizNo((String)map.get("bizNo"));
            store.setBizNm((String)map.get("bizNm"));
            store.setCeoNm((String)map.get("ceoNm"));

            store.setBizTp((String)map.get("bizTp"));
            store.setBizKnd((String)map.get("bizKnd"));
            store.setTelNo((String)map.get("telNo"));
            store.setFaxNo((String)map.get("faxNo"));
            store.setCountryCd((String)map.get("countryCd"));
            store.setCityCd((String)map.get("cityCd"));
            store.setContactNm((String)map.get("contactNm"));
            store.setContactTelNo((String)map.get("contactTelNo"));
            store.setContactEmail((String)map.get("contactEmail"));
            store.setDealStartYmd((String)map.get("dealBgnYmd"));
            store.setDealEndYmd((String)map.get("dealEndYmd"));
            store.setDealGbnCd((String)map.get("dealGbnCd"));

            store.setDeliveryDcCd((String)map.get("deliveryDcCd"));
            store.setDeliveryDomainCd((String)map.get("deliveryDomainCd"));
            store.setAllocPrioordCd((String)map.get("allocPrioordCd"));
            store.setChannelGbnCd((String)map.get("channelGbCd"));

            store.setUserCol1((String)map.get("userCol1"));
            store.setUserCol2((String)map.get("userCol2"));
            store.setUserCol3((String)map.get("userCol3"));
            store.setUserCol4((String)map.get("userCol4"));
            store.setUserCol5((String)map.get("userCol5"));
            store.setRemark((String)map.get("remark"));
            store.setUseYn((String)map.get("useYn"));
            store.setInUserId((String)map.get("s_userId"));
            store.setUpUserId((String)map.get("s_userId"));

            store.setDeliveryNm((String)map.get("deliveryNm"));
            store.setZip((String)map.get("zip"));
            store.setJibunAddr((String)map.get("jibunAddr"));
            store.setRoadAddr((String)map.get("roadAddr"));
            store.setDetailAddr((String)map.get("detailAddr"));
            store.setLat((String)map.get("lat"));
            store.setLon((String)map.get("lon"));

            storeRepository.save(store);
    }
    /**
     * 배송처 삭제
     * */
    public void delete(Map map) throws Exception{

            StorePk storePk = new StorePk();
            storePk.setBizCd((String)map.get("bizCd"));
            storePk.setClientCd((String)map.get("clientCd"));
            storePk.setStoreCd((String)map.get("storeCd"));

            Store store = storeRepository.findById(storePk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+storePk.getStoreCd()));
            storeRepository.delete(store);
    }
}
