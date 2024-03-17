package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Area;
import com.comfunny.server.proj.sd.domain.AreaPk;
import com.comfunny.server.proj.sd.repository.AreaRepository;
import com.comfunny.server.sys.paramaters.Params;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

@Service
@Slf4j
public class AreaService {

    @Resource
    AreaRepository areaRepository;
    /**
     * 구역 저장
     * */
    public void saveArea(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            AreaPk areaPk = new AreaPk();
            areaPk.setBizCd(params.getString("s_bizCd"));
            areaPk.setDcCd(dr.getString("dcCd"));
            areaPk.setAreaCd(dr.getString("areaCd"));

            Area area = new Area();
            area.setAreaPk(areaPk);
            area.setAreaNm(dr.getString("areaNm"));
            area.setKeepTempeGbnCd(dr.getString("keepTempeGbnCd"));
            area.setRemark(dr.getString("remark"));
            area.setUseYn(dr.getString("useYn"));
            area.setInUserId(dr.getString("s_userId"));
            area.setUpUserId(dr.getString("s_userId"));

            areaRepository.save(area);
        }
    }
    /**
     * 구역 삭제
     * */
    public void deleteArea(Params params) throws Exception{
        for(DataRow dr : params.getDataTable()){

            AreaPk areaPk = new AreaPk();
            areaPk.setBizCd(dr.getString("bizCd"));
            areaPk.setDcCd(dr.getString("dcCd"));
            areaPk.setAreaCd(dr.getString("areaCd"));

            Area area = areaRepository.findById(areaPk)
                    .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+areaPk.getAreaCd()));
            areaRepository.delete(area);
        }
    }
}
