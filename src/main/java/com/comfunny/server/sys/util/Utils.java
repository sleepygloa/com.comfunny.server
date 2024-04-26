package com.comfunny.server.sys.util;

import org.modelmapper.ModelMapper;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Utils {

    // Entity 리스트를 Map 리스트로 변환하는 메서드
    public static <T> List<Map> convertEntityListToMapList(List<T> entityList) {
        AtomicInteger counter = new AtomicInteger(1);
        return entityList.stream()
                .map(entity -> entityToMap(entity, counter.getAndIncrement(), false))
                .collect(Collectors.toList());
    }


    // Entity 객체를 Map으로 변환하여 순번을 추가하는 메서드
    public static <T> Map entityToMap(T entity, int id, boolean camel) {
        Map<String, Object> map = new HashMap<>();
        // Entity 객체의 각 필드를 동적으로 가져와서 Map에 추가
        try {
            Class<?> clazz = entity.getClass();
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    if(camel){
                        map.put(convertSnakeToCamel(field.getName()), field.get(entity));
                    }else{
                        map.put(field.getName(), field.get(entity));
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 순번을 Map에 추가
        map.put("id", id);
        return map;
    }

    //Snake 를 Camel 로 변경하는 함수
    //주로 쿼리 의 데이터를 변경
    public static String convertSnakeToCamel(String snakeCase) {
        StringBuilder camelCase = new StringBuilder();

        // 문자열을 '_'로 분리하여 배열로 저장
        String[] parts = snakeCase.split("_");

        // 첫 단어는 소문자로 유지
        camelCase.append(parts[0].toLowerCase());

        // 나머지 단어의 첫 글자만 대문자로 변환하여 이어붙임
        for (int i = 1; i < parts.length; i++) {
            camelCase.append(Character.toUpperCase(parts[i].charAt(0)));
            if (parts[i].length() > 1) {
                camelCase.append(parts[i].substring(1).toLowerCase());
            }
        }

        return camelCase.toString();
    }


    /* Map 에 있는 SnakeCase 를 CamelCase 로 변경 */
    public static List<Map<String, Object>> convertSnakeCaseKeysToCamelCase(List<Map<String, Object>> list) {
        int cnt = 1;
        List<Map<String, Object>> newList = new ArrayList();
        for (Map<String, Object> map : list) {
            map = convertSnakeCaseKeysToCamelCase(map);
            map.put("id", cnt++);
            newList.add(map);
        }
        return newList;
    }
    public static Map<String, Object> convertSnakeCaseKeysToCamelCase(Map<String, Object> map) {
        Map<String, Object> newMap = new HashMap<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String oldKey = entry.getKey();
            String newKey = convertSnakeCaseToCamelCase(oldKey);
            newMap.put(newKey, entry.getValue());
        }
        return newMap;
    }

    public static String convertSnakeCaseToCamelCase(String snakeCase) {
        StringBuilder camelCase = new StringBuilder();

        // 문자열을 '_'로 분리하여 배열로 저장
        String[] parts = snakeCase.split("_");

        // 첫 단어는 소문자로 유지
        camelCase.append(parts[0].toLowerCase());

        // 나머지 단어의 첫 글자만 대문자로 변환하여 이어붙임
        for (int i = 1; i < parts.length; i++) {
            camelCase.append(Character.toUpperCase(parts[i].charAt(0)));
            if (parts[i].length() > 1) {
                camelCase.append(parts[i].substring(1).toLowerCase());
            }
        }
        return camelCase.toString();
    }

    public static String toProperCase(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
}
