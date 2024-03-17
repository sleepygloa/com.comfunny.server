package com.comfunny.server.sys.dto;

import lombok.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;


@Data
public class CommonDto  {

    Map map = new HashMap();

    private String bizCd;
    private String bizNm;
    private String dcCd;
    private String dcNm;
    private String clientCd;
    private String clientNm;
    private String loginOs;

    private String langCd;
    private String countryCd;
    private String userId;
    private String userNm;
    private String inUserId;
    private String upUserId;


    //코드그룹  공통
    private String codeCd;
    private String codeGrpCd;
    private String iobGbn;

    private int stsCd;
    private int msgCd;
    private String msgTxt;

    public Object get(String key) {
        return map.get(key);
    }

    public void put(String key, Object value) {
        map.put(key, value);
    }

    public Object remove(String key) {
        return map.remove(key);
    }

    public boolean containsKey(String key) {
        return map.containsKey(key);
    }

    public boolean containsValue(Object value) {
        return map.containsValue(value);
    }

    public void clear() {
        map.clear();
    }

    public Set<Map.Entry<String, Object>> entrySet() {
        return map.entrySet();
    }

    public Set<String> keySet() {
        return map.keySet();
    }

    public boolean isEmpty() {
        return map.isEmpty();
    }

    public void putAll(Map<? extends String, ? extends Object> m) {
        map.putAll(m);
    }

    public Map<String, Object> getMap() {
        return map;
    }
}
