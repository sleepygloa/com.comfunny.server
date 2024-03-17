package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Supplier;
import com.comfunny.server.proj.sd.domain.SupplierPk;
import com.comfunny.server.proj.sd.repository.SupplierRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class SupplierService {

    @Resource
    SupplierRepository supplierRepository;
    /**
     * 공급처 저장
     * */
    public void saveSupplier(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            SupplierPk supplierPk = new SupplierPk();
            supplierPk.setBizCd(params.getString("s_bizCd"));
            supplierPk.setClientCd(dr.getString("clientCd"));
            supplierPk.setSupplierCd(dr.getString("supplierCd"));

            Supplier supplier = new Supplier();
            supplier.setSupplierPk(supplierPk);
            supplier.setSupplierNm(dr.getString("supplierNm"));
            supplier.setBizNo(dr.getString("bizNo"));
            supplier.setBizNm(dr.getString("bizNm"));
            supplier.setCeoNm(dr.getString("ceoNm"));
            supplier.setPostNo(dr.getString("postNo"));
            supplier.setBasicAddr(dr.getString("basicAddr"));
            supplier.setDetailAddr(dr.getString("detailAddr"));
            supplier.setBizTp(dr.getString("bizTp"));
            supplier.setBizKnd(dr.getString("bizKnd"));
            supplier.setTelNo(dr.getString("telNo"));
            supplier.setFaxNo(dr.getString("faxNo"));
            supplier.setCountryCd(dr.getString("countryCd"));
            supplier.setCityCd(dr.getString("cityCd"));
            supplier.setContactNm(dr.getString("contactNm"));
            supplier.setContactTelNo(dr.getString("contactTelNo"));
            supplier.setContactEmail(dr.getString("contactEmail"));
            supplier.setDealStartYmd(dr.getString("dealBgnYmd"));
            supplier.setDealEndYmd(dr.getString("dealEndYmd"));
            supplier.setDealGbnCd(dr.getString("dealGbnCd"));
            supplier.setUserCol1(dr.getString("userCol1"));
            supplier.setUserCol2(dr.getString("userCol2"));
            supplier.setUserCol3(dr.getString("userCol3"));
            supplier.setUserCol4(dr.getString("userCol4"));
            supplier.setUserCol5(dr.getString("userCol5"));
            supplier.setRemark(dr.getString("remark"));
            supplier.setUseYn(dr.getString("useYn"));
            supplier.setInUserId(dr.getString("s_userId"));
            supplier.setUpUserId(dr.getString("s_userId"));

            if("INSERT".equals(dr.getString("modFlag"))){
                supplierRepository.findById(supplierPk).ifPresent( a -> { throw new IllegalArgumentException("이미 등록되어있습니다. "); });

                supplierRepository.save(supplier);
            }else if("UPDATE".equals(dr.getString("modFlag"))){
                supplierRepository.save(supplier);
            }
        }
    }
    /**
     * 공급처 삭제
     * */
    public void deleteSupplier(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            SupplierPk supplierPk = new SupplierPk();
            supplierPk.setBizCd(params.getString("s_bizCd"));
            supplierPk.setClientCd(dr.getString("clientCd"));
            supplierPk.setSupplierCd(dr.getString("supplierCd"));

            Supplier supplier = supplierRepository.findById(supplierPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+supplierPk.getSupplierCd()));
            supplierRepository.delete(supplier);
        }
    }
}
