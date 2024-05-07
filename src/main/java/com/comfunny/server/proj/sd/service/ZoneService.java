package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.proj.sd.domain.ZonePk;
import com.comfunny.server.proj.sd.repository.ZoneRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class ZoneService {

    @Resource
    ZoneRepository zoneRepository;
    /**
     * 존 저장
     * */
    public void saveZone(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("bizCd"))){
            throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("dcCd"))){
            throw new IllegalArgumentException("물류창고코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("areaCd"))){
            throw new IllegalArgumentException("구역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("zoneCd"))){
            throw new IllegalArgumentException("지역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("zoneNm"))){
            throw new IllegalArgumentException("지역명 는 필수 입력입니다.");
        }

        ZonePk zonePk = new ZonePk();
        zonePk.setBizCd((String)map.get("bizCd"));
        zonePk.setDcCd((String)map.get("dcCd"));
        zonePk.setAreaCd((String)map.get("areaCd"));
        zonePk.setZoneCd((String)map.get("zoneCd"));

        Zone zone = new Zone();
        zone.setZonePk(zonePk);
        zone.setZoneNm((String)map.get("zoneNm"));
        zone.setKeepTypeCd((String)map.get("keepTypeCd"));
        zone.setHoldStCd((String)map.get("holdStCd"));
        zone.setRemark((String)map.get("remark"));
        zone.setUseYn((String)map.get("useYn"));
        zone.setInUserId((String)map.get("s_userId"));
        zone.setUpUserId((String)map.get("s_userId"));

        zoneRepository.save(zone);
    }
    /**
     * 존 삭제
     * */
    public void deleteZone(Map map) throws Exception{

            ZonePk zonePk = new ZonePk();
            zonePk.setBizCd((String)map.get("bizCd"));
            zonePk.setDcCd((String)map.get("dcCd"));
            zonePk.setAreaCd((String)map.get("areaCd"));
            zonePk.setZoneCd((String)map.get("zoneCd"));

            Zone zone = zoneRepository.findById(zonePk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+zonePk.getZoneCd()));
            zoneRepository.delete(zone);
    }
}
