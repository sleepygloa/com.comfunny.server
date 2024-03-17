package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Store;
import com.comfunny.server.proj.sd.domain.StorePk;
import com.comfunny.server.proj.sd.repository.StoreRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class StoreService {

    @Resource
    StoreRepository storeRepository;
    /**
     * 배송처 저장
     * */
    public void saveStore(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            StorePk storePk = new StorePk();
            storePk.setBizCd(params.getString("s_bizCd"));
            storePk.setClientCd(dr.getString("clientCd"));
            storePk.setStoreCd(dr.getString("storeCd"));

            Store store = new Store();
            store.setStorePk(storePk);
            store.setStoreNm(dr.getString("storeNm"));
            store.setBizNo(dr.getString("bizNo"));
            store.setBizNm(dr.getString("bizNm"));
            store.setCeoNm(dr.getString("ceoNm"));
            store.setPostNo(dr.getString("postNo"));
            store.setBasicAddr(dr.getString("basicAddr"));
            store.setDetailAddr(dr.getString("detailAddr"));
            store.setBizTp(dr.getString("bizTp"));
            store.setBizKnd(dr.getString("bizKnd"));
            store.setTelNo(dr.getString("telNo"));
            store.setFaxNo(dr.getString("faxNo"));
            store.setCountryCd(dr.getString("countryCd"));
            store.setCityCd(dr.getString("cityCd"));
            store.setContactNm(dr.getString("contactNm"));
            store.setContactTelNo(dr.getString("contactTelNo"));
            store.setContactEmail(dr.getString("contactEmail"));
            store.setDealStartYmd(dr.getString("dealBgnYmd"));
            store.setDealEndYmd(dr.getString("dealEndYmd"));
            store.setDealGbnCd(dr.getString("dealGbnCd"));


            store.setDeliveryDcCd(dr.getString("deliveryDcCd"));
            store.setDeliveryDomainCd(dr.getString("deliveryDomainCd"));
            store.setAllocPrioordCd(dr.getString("allocPrioordCd"));
            store.setChannelGbnCd(dr.getString("channelGbCd"));


            store.setUserCol1(dr.getString("userCol1"));
            store.setUserCol2(dr.getString("userCol2"));
            store.setUserCol3(dr.getString("userCol3"));
            store.setUserCol4(dr.getString("userCol4"));
            store.setUserCol5(dr.getString("userCol5"));
            store.setRemark(dr.getString("remark"));
            store.setUseYn(dr.getString("useYn"));
            store.setInUserId(dr.getString("s_userId"));
            store.setUpUserId(dr.getString("s_userId"));

            if("INSERT".equals(dr.getString("modFlag"))){
                storeRepository.findById(storePk).ifPresent( a -> { throw new IllegalArgumentException("이미 등록되어있습니다. "); });

                storeRepository.save(store);
            }else if("UPDATE".equals(dr.getString("modFlag"))){
                storeRepository.save(store);
            }
        }
    }
    /**
     * 배송처 삭제
     * */
    public void deleteStore(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            StorePk storePk = new StorePk();
            storePk.setBizCd(params.getString("s_bizCd"));
            storePk.setClientCd(dr.getString("clientCd"));
            storePk.setStoreCd(dr.getString("storeCd"));

            Store store = storeRepository.findById(storePk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+storePk.getStoreCd()));
            storeRepository.delete(store);
        }
    }
}
