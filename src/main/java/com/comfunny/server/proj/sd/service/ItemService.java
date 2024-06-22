package com.comfunny.server.proj.sd.service;

import com.comfunny.server.proj.sd.domain.Item;
import com.comfunny.server.proj.sd.domain.ItemPk;
import com.comfunny.server.proj.sd.domain.Zone;
import com.comfunny.server.proj.sd.domain.ZonePk;
import com.comfunny.server.proj.sd.repository.ItemRepository;
import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.Map;

@Service
@Slf4j
public class ItemService {

    @Resource
    ItemRepository itemRepository;
    /**
     * 상품 저장
     * */
    public void saveItem(Map map) throws Exception{
        if(ObjectUtils.isEmpty(map.get("clientCd"))){
            throw new IllegalArgumentException("고객사 는 필수 입력입니다.");
        }
        if(ObjectUtils.isEmpty(map.get("itemNm"))){
            throw new IllegalArgumentException("상품명 는 필수 입력입니다.");
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

        ItemPk itemPk = new ItemPk();
        itemPk.setBizCd(Contraints.BIZ_CD);
        itemPk.setClientCd((String)map.get("clientCd"));
        itemPk.setItemCd((String)map.get("itemCd"));

        //Item set
        Item item = new Item();
        item.setItemPk(itemPk);
        item.setItemNm((String)map.get("itemNm"));
        item.setItemSpec((String)map.get("itemSpec"));
        item.setItemGbnCd((String)map.get("itemGbnCd"));
        item.setLargeClassCd((String)map.get("largeClassCd"));
        item.setMiddleClassCd((String)map.get("middleClassCd"));
        item.setSmallClassCd((String)map.get("smallClassCd"));

        long ibCost = StringUtils.safeToLong(map.get("ibCost"), 0l);
        long obCost = StringUtils.safeToLong(map.get("obCost"), 0l);
        float horizontal = StringUtils.safeToFloat(map.get("horizontal"), 0f);
        float vertical = StringUtils.safeToFloat(map.get("vertical"), 0f);
        float height = StringUtils.safeToFloat(map.get("height"), 0f);
        float cbm = StringUtils.safeToFloat(map.get("cbm"), 0f);
        float weight = StringUtils.safeToFloat(map.get("weight"), 0f);
        long distExpiryDays = StringUtils.safeToLong(map.get("distExpiryDays"), 9999l);

        item.setIbCost(ibCost);
        item.setObCost(obCost);
        item.setHorizontal(horizontal);
        item.setVertical(vertical);
        item.setHeight(height);
        item.setCbm(cbm);
        item.setWeight(weight);

        item.setItemBarcode((String)map.get("itemBarcode"));
        item.setBoxBarcode((String)map.get("boxBarcode"));
        item.setKeepTempeGbnCd((String)map.get("keepTempeGbnCd"));
        item.setReplaceItemCd((String)map.get("replaceItemCd"));
        item.setDistExpiryDays(distExpiryDays);
        item.setMinUomCd((String)map.get("minUomCd"));
        item.setVatYn((String)map.get("vatYn"));
        item.setUserCol1((String)map.get("userCol1"));
        item.setUserCol2((String)map.get("userCol2"));
        item.setUserCol3((String)map.get("userCol3"));
        item.setUserCol4((String)map.get("userCol4"));
        item.setUserCol5((String)map.get("userCol5"));
        item.setRemark((String)map.get("remark"));
        item.setUseYn((String)map.get("useYn"));

        itemRepository.save(item);
    }
    /**
     * 상품 삭제
     * */
    public void deleteItem(Map map) throws Exception{

        ItemPk itemPk = new ItemPk();
        itemPk.setBizCd(Contraints.BIZ_CD);
        itemPk.setClientCd((String)map.get("clientCd"));
        itemPk.setItemCd((String)map.get("itemCd"));

        Item item = itemRepository.findById(itemPk)
                .orElseThrow(()->new IllegalArgumentException("해당 데이터가 없습니다. id="+itemPk.getItemCd()));
        itemRepository.delete(item);
    }
}
