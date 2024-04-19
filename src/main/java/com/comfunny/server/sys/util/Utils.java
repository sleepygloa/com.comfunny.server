package com.comfunny.server.sys.util;

import org.modelmapper.ModelMapper;

import java.lang.reflect.Field;
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
                .map(entity -> entityToMap(entity, counter.getAndIncrement()))
                .collect(Collectors.toList());
    }
    // Entity 객체를 Map으로 변환하여 순번을 추가하는 메서드
    public static <T> Map entityToMap(T entity, int id) {
        Map<String, Object> map = new HashMap<>();
        // Entity 객체의 각 필드를 동적으로 가져와서 Map에 추가
        try {
            Class<?> clazz = entity.getClass();
            Field tableField = clazz.getDeclaredField("table");
            tableField.setAccessible(true);
            Object[] table = (Object[]) tableField.get(entity);
            for (Object node : table) {
                if (node != null) {
                    Field keyField = node.getClass().getDeclaredField("key");
                    keyField.setAccessible(true);
                    Object key = keyField.get(node);
                    if (key != null) {
                        Field valueField = node.getClass().getDeclaredField("value");
                        valueField.setAccessible(true);
                        Object value = valueField.get(node);
                        if (value != null) {
                            map.put(convertSnakeToCamel(key.toString()), value.toString());
                        }
                    }
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
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
}
