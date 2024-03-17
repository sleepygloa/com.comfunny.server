package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Dc;
import com.comfunny.server.proj.sd.domain.DcPk;
import com.comfunny.server.proj.sd.repository.DcRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class DcService {

    @Resource
    DcRepository dcRepository;
    /**
     * 물류센터 저장
     * */
    public void save(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            DcPk dcPk = new DcPk();
            dcPk.setBizCd(params.getString("s_bizCd"));
            dcPk.setDcCd(dr.getString("dcCd"));

            Dc dc = new Dc();
            dc.setDcPk(dcPk);
            dc.setDcNm(dr.getString("dcNm"));
            dc.setBizNo(dr.getString("bizNo"));
            dc.setBizNm(dr.getString("bizNm"));
            dc.setCeoNm(dr.getString("ceoNm"));
            dc.setPostNo(dr.getString("postNo"));
            dc.setBasicAddr(dr.getString("basicAddr"));
            dc.setDetailAddr(dr.getString("detailAddr"));
            dc.setBizTp(dr.getString("bizTp"));
            dc.setBizKnd(dr.getString("bizKnd"));
            dc.setTelNo(dr.getString("telNo"));
            dc.setFaxNo(dr.getString("faxNo"));
            dc.setCountryCd(dr.getString("countryCd"));
            dc.setCityCd(dr.getString("cityCd"));
            dc.setContactNm(dr.getString("contactNm"));
            dc.setContactTelNo(dr.getString("contactTelNo"));
            dc.setContactEmail(dr.getString("contactEmail"));
            dc.setUserCol1(dr.getString("userCol1"));
            dc.setUserCol2(dr.getString("userCol2"));
            dc.setUserCol3(dr.getString("userCol3"));
            dc.setUserCol4(dr.getString("userCol4"));
            dc.setUserCol5(dr.getString("userCol5"));
            dc.setRemark(dr.getString("remark"));
            dc.setUseYn(dr.getString("useYn"));
            dc.setInUserId(dr.getString("s_userId"));
            dc.setUpUserId(dr.getString("s_userId"));

            dcRepository.save(dc);
        }
    }
    /**
     * 물류센터 삭제
     * */
    public void delete(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            DcPk dcPk = new DcPk();
            dcPk.setBizCd(dr.getString("bizCd"));
            dcPk.setDcCd(dr.getString("dcCd"));

            Dc dc = dcRepository.findById(dcPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+dcPk.getDcCd()));
            dcRepository.delete(dc);
        }
    }
}
