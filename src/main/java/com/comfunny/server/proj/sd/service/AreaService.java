package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Area;
import com.comfunny.server.proj.sd.domain.AreaPk;
import com.comfunny.server.proj.sd.repository.AreaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class AreaService {

    @Resource
    AreaRepository areaRepository;
    /**
     * 구역 저장
     * */
    public void saveArea(Map map) throws Exception{

        if(ObjectUtils.isEmpty(map.get("bizCd"))){
            throw new IllegalArgumentException("사업자코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("dcCd"))){
            throw new IllegalArgumentException("물류창고코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("areaCd"))){
            throw new IllegalArgumentException("구역코드 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("areaNm"))){
            throw new IllegalArgumentException("구역명 는 필수 입력입니다.");
        }

        AreaPk areaPk = new AreaPk();
        areaPk.setBizCd((String)map.get("bizCd"));
        areaPk.setDcCd((String)map.get("dcCd"));
        areaPk.setAreaCd((String)map.get("areaCd"));

        Area area = new Area();
        area.setAreaPk(areaPk);
        area.setAreaNm((String)map.get("areaNm"));
        area.setKeepTempeGbnCd((String)map.get("keepTempeGbnCd"));
        area.setRemark((String)map.get("remark"));
        area.setUseYn((String)map.get("useYn"));
        area.setInUserId((String)map.get("s_userId"));
        area.setUpUserId((String)map.get("s_userId"));

        areaRepository.save(area);
    }
    /**
     * 구역 삭제
     * */
    public void deleteArea(Map map) throws Exception{

            AreaPk areaPk = new AreaPk();
            areaPk.setBizCd((String)map.get("bizCd"));
            areaPk.setDcCd((String)map.get("dcCd"));
            areaPk.setAreaCd((String)map.get("areaCd"));

            Area area = areaRepository.findById(areaPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+areaPk.getAreaCd()));
            areaRepository.delete(area);
    }
}
