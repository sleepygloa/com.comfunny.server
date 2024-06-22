package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.ItemClass;
import com.comfunny.server.proj.sd.domain.ItemClassPk;
import com.comfunny.server.proj.sd.domain.ItemUom;
import com.comfunny.server.proj.sd.domain.ItemUomPk;
import com.comfunny.server.proj.sd.repository.ItemClassRepository;
import com.comfunny.server.proj.sd.repository.ItemUomRepository;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class ItemUomService {

    @Resource
    ItemUomRepository itemUomRepository;
    /**
     * 상품단위 저장
     * */
    public void saveItemUom(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("clientCd"))){
            throw new IllegalArgumentException("고객사 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("itemCd"))){
            throw new IllegalArgumentException("상품 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("stdUomCd"))){
            throw new IllegalArgumentException("기준단위 는 필수 입력입니다.");
        }

        ItemUomPk itemUomPk = new ItemUomPk();
        itemUomPk.setBizCd(Contraints.BIZ_CD);
        itemUomPk.setClientCd((String)map.get("clientCd"));
        itemUomPk.setItemCd((String)map.get("itemCd"));
        itemUomPk.setStdUomCd((String)map.get("stdUomCd"));

        //Item set
        ItemUom itemUom = new ItemUom();
        itemUom.setItemUomPk(itemUomPk);
        itemUom.setConvUomCd((String)map.get("convUomCd"));
        itemUom.setConvUomQty(StringUtils.safeToLong(map.get("convUomQty"), 0l));
        itemUom.setRemark((String)map.get("remark"));
        itemUom.setUseYn((String)map.get("useYn"));

        itemUomRepository.save(itemUom);
    }
    /**
     * 상품단위 삭제
     * */
    public void deleteItemUom(Map map) throws Exception{

        ItemUomPk itemUomPk = new ItemUomPk();
        itemUomPk.setBizCd(Contraints.BIZ_CD);
        itemUomPk.setClientCd((String)map.get("clientCd"));
        itemUomPk.setItemCd((String)map.get("itemCd"));
        itemUomPk.setStdUomCd((String)map.get("stdUomCd"));

        ItemUom itemUom = itemUomRepository.findById(itemUomPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+itemUomPk.getItemCd()));
        itemUomRepository.delete(itemUom);
    }
}
