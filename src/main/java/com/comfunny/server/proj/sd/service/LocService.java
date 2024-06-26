package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Loc;
import com.comfunny.server.proj.sd.domain.LocPk;
import com.comfunny.server.proj.sd.repository.LocRepository;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
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
        locPk.setAreaCd((String)map.get("areaCd"));
        locPk.setZoneCd((String)map.get("zoneCd"));
        locPk.setLocCd((String)map.get("zoneCd") + (String)map.get("linCd") +(String)map.get("rowCd")+(String)map.get("levCd"));

        Loc loc = new Loc();
        loc.setLocPk(locPk);
        loc.setLinCd((String)map.get("linCd"));
        loc.setRowCd((String)map.get("rowCd"));
        loc.setLevCd((String)map.get("levCd"));
        loc.setLocTypeCd((String)map.get("locTypeCd"));
        loc.setHoldStCd((String)map.get("holdStCd"));

        loc.setLocPrioord(StringUtils.safeToFloat(map.get("locPrioord"), 0f));
        loc.setHorizontal(StringUtils.safeToFloat(map.get("horizontal"), 0f));
        loc.setVertical(StringUtils.safeToFloat(map.get("vertical"), 0f));
        loc.setHeight(StringUtils.safeToFloat(map.get("height"), 0f));
        loc.setCbm(StringUtils.safeToFloat(map.get("cbm"), 0f));
        loc.setWeight(StringUtils.safeToFloat(map.get("weight"), 0f));

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
            locPk.setAreaCd((String)map.get("areaCd"));
            locPk.setZoneCd((String)map.get("zoneCd"));
            locPk.setLocCd((String)map.get("locCd"));

            Loc loc = locRepository.findById(locPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+locPk.getLocCd()));
            locRepository.delete(loc);
    }


    /**
     * 로케이션 멀티등록 저장
     * */
    public void saveLocMultiReg(Map map) throws Exception{

        if(ObjectUtils.isEmpty(map.get("dcCd"))){
            throw new IllegalArgumentException("물류창고코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("areaCd"))){
            throw new IllegalArgumentException("구역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("zoneCd"))){
            throw new IllegalArgumentException("지역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("linCdFrom"))){
            throw new IllegalArgumentException("행 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("linCdTo"))){
            throw new IllegalArgumentException("행 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("rowCdFrom"))){
            throw new IllegalArgumentException("열 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("rowCdTo"))){
            throw new IllegalArgumentException("열 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("levCdFrom"))){
            throw new IllegalArgumentException("단 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("levCdTo"))){
            throw new IllegalArgumentException("단 는 필수 입력입니다.");
        }

        float linCdFrom = StringUtils.safeToFloat(map.get("linCdFrom"), 0f);
        float linCdTo = StringUtils.safeToFloat(map.get("linCdTo"), 0f);
        float rowCdFrom = StringUtils.safeToFloat(map.get("rowCdFrom"), 0f);
        float rowCdTo = StringUtils.safeToFloat(map.get("rowCdTo"), 0f);
        float levCdFrom = StringUtils.safeToFloat(map.get("levCdFrom"), 0f);
        float levCdTo = StringUtils.safeToFloat(map.get("levCdTo"), 0f);
        if (linCdFrom > linCdTo){
            throw new IllegalArgumentException("행(From)은 행(To)보다 작거나 같아야 합니다.");
        }
        if (rowCdFrom > rowCdTo) {
            throw new IllegalArgumentException("열(From)은 열(To)보다 작거나 같아야 합니다.");
        }
        if (levCdFrom > levCdTo) {
            throw new IllegalArgumentException("단(From)은 단(To)보다 작거나 같아야 합니다.");
        }

        LocPk locPk = new LocPk();
        locPk.setBizCd(Contraints.BIZ_CD);
        locPk.setDcCd((String)map.get("dcCd"));
        locPk.setAreaCd((String)map.get("areaCd"));
        locPk.setZoneCd((String)map.get("zoneCd"));

        for (float linCd = linCdFrom; linCd <= linCdTo; linCd++){
            for (float rowCd = rowCdFrom; rowCd <= rowCdTo; rowCd++){
                for (float levCd = levCdFrom; levCd <= levCdTo; levCd++){
                    String linCdStr = StringUtils.leftPad(String.valueOf((int)linCd), 2, "0");
                    String rowCdStr = StringUtils.leftPad(String.valueOf((int)rowCd), 2, "0");
                    String levCdStr = StringUtils.leftPad(String.valueOf((int)levCd), 2, "0");
                    locPk.setLocCd((String)map.get("zoneCd") + linCdStr + rowCdStr + levCdStr);

                    //기존 데이터가 있는지 확인
                    if (locRepository.findById(locPk).isPresent()){
                        throw new IllegalArgumentException("이미 등록된 데이터가 있습니다. locCd="+locPk.getLocCd());
                    }

                    Loc loc = new Loc();
                    loc.setLocPk(locPk);
                    loc.setLinCd(linCdStr);
                    loc.setRowCd(rowCdStr);
                    loc.setLevCd(levCdStr);

                    //기본값 설정
                    loc.setUseYn("Y");
                    loc.setInUserId((String)map.get("s_userId"));
                    loc.setUpUserId((String)map.get("s_userId"));

                    locRepository.save(loc);
                }
            }
        }

    }
}
