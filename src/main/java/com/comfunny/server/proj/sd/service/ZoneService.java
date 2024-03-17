package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.proj.sd.domain.ZonePk;
import com.comfunny.server.proj.sd.repository.ZoneRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class ZoneService {

    @Resource
    ZoneRepository zoneRepository;
    /**
     * 존 저장
     * */
    public void saveZone(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            ZonePk zonePk = new ZonePk();
            zonePk.setBizCd(params.getString("s_bizCd"));
            zonePk.setDcCd(dr.getString("dcCd"));
            zonePk.setAreaCd(dr.getString("areaCd"));
            zonePk.setZoneCd(dr.getString("zoneCd"));

            Zone zone = new Zone();
            zone.setZonePk(zonePk);
            zone.setZoneNm(dr.getString("zoneNm"));
            zone.setKeepTypeCd(dr.getString("keepTypeCd"));
            zone.setHoldStCd(dr.getString("holdStCd"));
            zone.setRemark(dr.getString("remark"));
            zone.setUseYn(dr.getString("useYn"));
            zone.setInUserId(dr.getString("s_userId"));
            zone.setUpUserId(dr.getString("s_userId"));

            zoneRepository.save(zone);
        }
    }
    /**
     * 존 삭제
     * */
    public void deleteZone(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            ZonePk zonePk = new ZonePk();
            zonePk.setBizCd(params.getString("s_bizCd"));
            zonePk.setDcCd(dr.getString("dcCd"));
            zonePk.setAreaCd(dr.getString("areaCd"));
            zonePk.setZoneCd(dr.getString("zoneCd"));

            Zone zone = zoneRepository.findById(zonePk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+zonePk.getZoneCd()));
            zoneRepository.delete(zone);
        }
    }
}
