package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Loc;
import com.comfunny.server.proj.sd.domain.LocPk;
import com.comfunny.server.proj.sd.repository.LocRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class LocService {

    @Resource
    LocRepository locRepository;
    /**
     * 로케이션 저장
     * */
    public void saveLoc(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            LocPk locPk = new LocPk();
            locPk.setBizCd(params.getString("s_bizCd"));
            locPk.setDcCd(dr.getString("dcCd"));
            locPk.setZoneCd(dr.getString("zoneCd"));
            locPk.setLocCd(dr.getString("linCd") +dr.getString("rowCd")+dr.getString("levCd"));

            Loc loc = new Loc();
            loc.setLocPk(locPk);
            loc.setLinCd(dr.getString("linCd"));
            loc.setRowCd(dr.getString("rowCd"));
            loc.setLevCd(dr.getString("levCd"));
            loc.setLocTypeCd(dr.getString("locTypeCd"));
            loc.setLoadGbnCd(dr.getString("loadGbnCd"));
            loc.setHoldStCd(dr.getString("holdStCd"));
            loc.setLocPrioord(dr.getFloat("locPrioord"));
            loc.setItemMixLoadYn(dr.getString("itemMixLoadYn"));
            loc.setLotMixLoadYn(dr.getString("lotMixLoadYn"));
            loc.setHorizontal(dr.getFloat("horizontal"));
            loc.setVertical(dr.getFloat("vertical"));
            loc.setHeight(dr.getFloat("height"));
            loc.setCbm(dr.getFloat("cbm"));
            loc.setWeight(dr.getString("weight"));
            loc.setRemark(dr.getString("remark"));
            loc.setUseYn(dr.getString("useYn"));
            loc.setInUserId(dr.getString("s_userId"));
            loc.setUpUserId(dr.getString("s_userId"));

            locRepository.save(loc);
        }
    }
    /**
     * 로케이션 삭제
     * */
    public void deleteLoc(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            LocPk locPk = new LocPk();
            locPk.setBizCd(params.getString("s_bizCd"));
            locPk.setDcCd(dr.getString("dcCd"));
            locPk.setZoneCd(dr.getString("zoneCd"));
            locPk.setLocCd(dr.getString("locCd"));

            Loc loc = locRepository.findById(locPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+locPk.getLocCd()));
            locRepository.delete(loc);
        }
    }
}
