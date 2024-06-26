package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Item;
import com.comfunny.server.proj.sd.domain.ItemClass;
import com.comfunny.server.proj.sd.domain.ItemClassPk;
import com.comfunny.server.proj.sd.domain.ItemPk;
import com.comfunny.server.proj.sd.repository.ItemClassRepository;
import com.comfunny.server.proj.sd.repository.ItemRepository;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class ItemClassService {

    @Resource
    ItemClassRepository itemClassRepository;

    /**
     * 상품분류 저장
     * */
    public void saveItemClass(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("clientCd"))){
            throw new IllegalArgumentException("고객사 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("largeClassCd"))){
            throw new IllegalArgumentException("대분류 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("middleClassCd"))){
            throw new IllegalArgumentException("중분류 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("smallClassCd"))){
            throw new IllegalArgumentException("소분류 는 필수 입력입니다.");
        }

        String itemClassCd = (String)map.get("largeClassCd") + (String)map.get("middleClassCd") + (String)map.get("smallClassCd");

        ItemClassPk itemClassPk = new ItemClassPk();
        itemClassPk.setBizCd(Contraints.BIZ_CD);
        itemClassPk.setClientCd((String)map.get("clientCd"));
        itemClassPk.setItemClassCd(itemClassCd);

        //Item set
        ItemClass itemClass = new ItemClass();
        itemClass.setItemClassPk(itemClassPk);
        itemClass.setLargeClassCd((String)map.get("largeClassCd"));
        itemClass.setLargeClassNm((String)map.get("largeClassNm"));
        itemClass.setMiddleClassCd((String)map.get("middleClassCd"));
        itemClass.setMiddleClassNm((String)map.get("middleClassNm"));
        itemClass.setSmallClassCd((String)map.get("smallClassCd"));
        itemClass.setSmallClassNm((String)map.get("smallClassNm"));
        itemClass.setRemark((String)map.get("remark"));
        itemClass.setUseYn((String)map.get("useYn"));

        Optional<ItemClass> optItemClass = itemClassRepository.findById(itemClassPk);
        if(optItemClass.isPresent()){
            if(Contraints.ADMIN_ID.equals(itemClass.getInUserId())){
                new IllegalArgumentException("관리자가 등록한 데이터는 수정 할 수 없습니다.");
            }
        }

        itemClassRepository.save(itemClass);
    }

    /**
     * 상품분류 삭제
     * */
    public void deleteItemClass(Map map) throws Exception{

        ItemClassPk itemClassPk = new ItemClassPk();
        itemClassPk.setBizCd(Contraints.BIZ_CD);
        itemClassPk.setClientCd((String)map.get("clientCd"));
        itemClassPk.setItemClassCd((String)map.get("itemClassCd"));

        ItemClass itemClass = itemClassRepository.findById(itemClassPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+itemClassPk.getItemClassCd()));

        if(Contraints.ADMIN_ID.equals(itemClass.getInUserId())){
            new IllegalArgumentException("관리자가 등록한 데이터는 수정 할 수 없습니다.");
        }

        itemClassRepository.delete(itemClass);
    }


    /**
     * 상품분류리스트 저장
     * */
    public void saveItemClassList(List list) throws Exception{
        for(int i=0; i<list.size(); i++){
            Map map = (Map)list.get(i);
            if("I".equals(map.get("flag")) || "U".equals(map.get("flag"))){
                saveItemClass(map);
            }else if("D".equals(map.get("flag"))) {
                deleteItemClass(map);
            }
        }

    }
}
