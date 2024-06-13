package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Loc;
import com.comfunny.server.proj.sd.domain.LocPk;
import com.comfunny.server.proj.sd.repository.LocRepository;
import com.comfunny.server.sys.config.Contraints;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class LocService {

    @Resource
    LocRepository locRepository;
    /**
     * 로케이션 저장
     * */
    public void saveLoc(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("dcCd"))){
                throw new IllegalArgumentException("물류창고코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("areaCd"))){
                throw new IllegalArgumentException("구역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("zoneCd"))){
                throw new IllegalArgumentException("지역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("linCd"))){
                throw new IllegalArgumentException("행 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("rowCd"))){
                throw new IllegalArgumentException("열 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("levCd"))){
                throw new IllegalArgumentException("단 는 필수 입력입니다.");
        }

        LocPk locPk = new LocPk();
        locPk.setBizCd(Contraints.BIZ_CD);
        locPk.setDcCd((String)map.get("dcCd"));
        locPk.setZoneCd((String)map.get("zoneCd"));
        locPk.setLocCd((String)map.get("linCd") +(String)map.get("rowCd")+(String)map.get("levCd"));

        Loc loc = new Loc();
        loc.setLocPk(locPk);
        loc.setLinCd((String)map.get("linCd"));
        loc.setRowCd((String)map.get("rowCd"));
        loc.setLevCd((String)map.get("levCd"));
        loc.setLocTypeCd((String)map.get("locTypeCd"));
        loc.setLoadGbnCd((String)map.get("loadGbnCd"));
        loc.setHoldStCd((String)map.get("holdStCd"));
        loc.setLocPrioord(Float.parseFloat((String)map.get("locPrioord")));
        loc.setItemMixLoadYn((String)map.get("itemMixLoadYn"));
        loc.setLotMixLoadYn((String)map.get("lotMixLoadYn"));
        loc.setHorizontal(Float.parseFloat((String)map.get("horizontal")));
        loc.setVertical(Float.parseFloat((String)map.get("vertical")));
        loc.setHeight(Float.parseFloat((String)map.get("height")));
        loc.setCbm(Float.parseFloat((String)map.get("cbm")));
        loc.setWeight(Float.parseFloat((String)map.get("weight")));
        loc.setRemark((String)map.get("remark"));
        loc.setUseYn((String)map.get("useYn"));
        loc.setInUserId((String)map.get("s_userId"));
        loc.setUpUserId((String)map.get("s_userId"));

        locRepository.save(loc);
    }
    /**
     * 로케이션 삭제
     * */
    public void deleteLoc(Map map) throws Exception{

            LocPk locPk = new LocPk();
            locPk.setBizCd(Contraints.BIZ_CD);
            locPk.setDcCd((String)map.get("dcCd"));
            locPk.setZoneCd((String)map.get("zoneCd"));
            locPk.setLocCd((String)map.get("locCd"));

            Loc loc = locRepository.findById(locPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+locPk.getLocCd()));
            locRepository.delete(loc);
    }
}
