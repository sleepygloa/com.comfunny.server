package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Supplier;
import com.comfunny.server.proj.sd.domain.SupplierPk;
import com.comfunny.server.proj.sd.repository.SupplierRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class SupplierService {

    @Resource
    SupplierRepository supplierRepository;
    /**
     * 공급처 저장
     * */
    public void saveSupplier(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("bizCd"))){
            throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("clientCd"))){
            throw new IllegalArgumentException("고객사코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("supplierCd"))){
            throw new IllegalArgumentException("공급처코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("supplierNm"))){
            throw new IllegalArgumentException("공급처명 는 필수 입력입니다.");
        }

        SupplierPk supplierPk = new SupplierPk();
        supplierPk.setBizCd((String)map.get("bizCd"));
        supplierPk.setClientCd((String)map.get("clientCd"));
        supplierPk.setSupplierCd((String)map.get("supplierCd"));

        Supplier supplier = new Supplier();
        supplier.setSupplierPk(supplierPk);
        supplier.setSupplierNm((String)map.get("supplierNm"));
        supplier.setBizNo((String)map.get("bizNo"));
        supplier.setBizNm((String)map.get("bizNm"));
        supplier.setCeoNm((String)map.get("ceoNm"));
        supplier.setPostNo((String)map.get("postNo"));
        supplier.setBasicAddr((String)map.get("basicAddr"));
        supplier.setDetailAddr((String)map.get("detailAddr"));
        supplier.setBizTp((String)map.get("bizTp"));
        supplier.setBizKnd((String)map.get("bizKnd"));
        supplier.setTelNo((String)map.get("telNo"));
        supplier.setFaxNo((String)map.get("faxNo"));
        supplier.setCountryCd((String)map.get("countryCd"));
        supplier.setCityCd((String)map.get("cityCd"));
        supplier.setContactNm((String)map.get("contactNm"));
        supplier.setContactTelNo((String)map.get("contactTelNo"));
        supplier.setContactEmail((String)map.get("contactEmail"));
        supplier.setDealStartYmd((String)map.get("dealBgnYmd"));
        supplier.setDealEndYmd((String)map.get("dealEndYmd"));
        supplier.setDealGbnCd((String)map.get("dealGbnCd"));
        supplier.setUserCol1((String)map.get("userCol1"));
        supplier.setUserCol2((String)map.get("userCol2"));
        supplier.setUserCol3((String)map.get("userCol3"));
        supplier.setUserCol4((String)map.get("userCol4"));
        supplier.setUserCol5((String)map.get("userCol5"));
        supplier.setRemark((String)map.get("remark"));
        supplier.setUseYn((String)map.get("useYn"));
        supplier.setInUserId((String)map.get("s_userId"));
        supplier.setUpUserId((String)map.get("s_userId"));

        supplierRepository.save(supplier);
    }
    /**
     * 공급처 삭제
     * */
    public void deleteSupplier(Map map) throws Exception{

            SupplierPk supplierPk = new SupplierPk();
            supplierPk.setBizCd((String)map.get("bizCd"));
            supplierPk.setClientCd((String)map.get("clientCd"));
            supplierPk.setSupplierCd((String)map.get("supplierCd"));

            Supplier supplier = supplierRepository.findById(supplierPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+supplierPk.getSupplierCd()));
            supplierRepository.delete(supplier);
    }
}
