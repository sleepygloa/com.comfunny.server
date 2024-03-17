package com.comfunny.server.sys.dto;

import com.comfunny.server.sys.util.StringUtils;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.*;


@Slf4j
@Data
public class CommonLinkedDto {
    private String _LEVEL_ = "LEVEL";
    private String _DEFAULT_ORDER_ = "ROW_ORDER";
    private String _ISLEAF_ = "ISLEAF";
    private String _CHILE_COUNT_ = "CHILE_CNT";
    private String _CUSTOM_KEY_ = "ROW_KEY";
    private String _CUSTOM_PARENT_KEY_ = "ROW_PARENT_KEY";
    private String _CUSTOM_ORDER_ = "ROW_ORDER";
    private String _CUSTOM_ORDER_KEY_ = "LINKED_ORDER";


    public List<Map> createTree(List<Map> l, String customParentKey, String customKey, String customOrder) {
        this._CUSTOM_PARENT_KEY_ = customParentKey;
        this._CUSTOM_KEY_ = customKey;
        this._CUSTOM_ORDER_ = customOrder;
        log.debug("Create a level data table name : "+ l);

        if(_CUSTOM_ORDER_ == null){
            _CUSTOM_ORDER_ = _DEFAULT_ORDER_;
        }

        //레벨 체크 맵
        Map<String,Map<String,String>> paramLinkedCheckMap = new HashMap<String,Map<String,String>>();
        try {
            for (Map<String,Object> orimap : l) {
                Map<String,String> map = new HashMap<String, String>();
                String levelkey = orimap.get(_CUSTOM_KEY_).toString();
                if(!paramLinkedCheckMap.containsKey(levelkey)){
                    map.put(_CUSTOM_KEY_, levelkey);
                    map.put(_CUSTOM_PARENT_KEY_, orimap.get(_CUSTOM_PARENT_KEY_).toString());
                    map.put(_LEVEL_, "0");
                    map.put(_CHILE_COUNT_, "0");
                    map.put(_ISLEAF_, "true");
                    if(!_CUSTOM_ORDER_.equals(_DEFAULT_ORDER_)||_CUSTOM_ORDER_.equals("ROW_ORDER")){
                        map.put(_CUSTOM_ORDER_, StringUtils.leftPad(orimap.get(_CUSTOM_ORDER_).toString(),5,"0"));
                    }else{
                        map.put(_CUSTOM_ORDER_, StringUtils.leftPad(levelkey,5,"0"));
                    }
                    paramLinkedCheckMap.put(levelkey, map);
                }
            }
        } catch (Exception e) {
            log.error("키가 존재 하지 않습니다.",e);
        }



        for (Map targetDataRow : l) {
            String originalKey = (String)targetDataRow.get(_CUSTOM_KEY_);
            String originalParentKey = (String)targetDataRow.get(_CUSTOM_PARENT_KEY_);
//            String originalKey = (String)targetDataRow.get(_CUSTOM_KEY_);
//            String originalParentKey = (String)targetDataRow.get(_CUSTOM_PARENT_KEY_);
            if(paramLinkedCheckMap.containsKey(originalParentKey)){
                String parentLevel = paramLinkedCheckMap.get(originalParentKey).get(_LEVEL_);
                Map<String,String> myLinkedCheckMap = paramLinkedCheckMap.get(originalKey);
                myLinkedCheckMap.put(_LEVEL_, (Integer.parseInt(parentLevel)+1)+"");

                Map<String,String> parentLinkedCheckMap = paramLinkedCheckMap.get(originalParentKey);
                String parentChildCount = parentLinkedCheckMap.get(_CHILE_COUNT_);
                parentLinkedCheckMap.put(_CHILE_COUNT_, (Integer.parseInt(parentChildCount)+1)+"");
                parentLinkedCheckMap.put(_ISLEAF_, "false");

                String childOrderValue = originalKey;
                if(!_CUSTOM_ORDER_.equals(_DEFAULT_ORDER_)||_CUSTOM_ORDER_.equals("ROW_ORDER")){
                    childOrderValue = (String)targetDataRow.get(_CUSTOM_ORDER_);
                }
                myLinkedCheckMap.put(_CUSTOM_ORDER_, paramLinkedCheckMap.get(originalParentKey).get(_CUSTOM_ORDER_)+StringUtils.leftPad(childOrderValue,5,"0"));
                paramLinkedCheckMap.put(originalKey, myLinkedCheckMap);
            }else{
                //00뎁스
                Map<String,String> firstLevelMap = paramLinkedCheckMap.get(originalKey);
                paramLinkedCheckMap.put(originalKey, firstLevelMap);
            }
        }

        List<Map> returnDataTalbe =  new ArrayList<Map>();
        for (Map originalDataRow : l) {
            originalDataRow.put(_LEVEL_, paramLinkedCheckMap.get(originalDataRow.get(_CUSTOM_KEY_)).get(_LEVEL_));
            originalDataRow.put(_CUSTOM_ORDER_KEY_, paramLinkedCheckMap.get(originalDataRow.get(_CUSTOM_KEY_)).get(_CUSTOM_ORDER_));
//        	originalDataRow.put(_CUSTOM_ORDER_, StringUtils.rightPad(paramLinkedCheckMap.get(originalDataRow.getVal(_CUSTOM_KEY_).toString()).get(_CUSTOM_ORDER_),30,"0"));
            originalDataRow.put(_ISLEAF_, paramLinkedCheckMap.get(originalDataRow.get(_CUSTOM_KEY_)).get(_ISLEAF_));
            originalDataRow.put(_CHILE_COUNT_, paramLinkedCheckMap.get(originalDataRow.get(_CUSTOM_KEY_)).get(_CHILE_COUNT_));
            originalDataRow.put("expanded", "true");
            returnDataTalbe.add(originalDataRow);
        }

        return returnDataTalbe;
    }
}
