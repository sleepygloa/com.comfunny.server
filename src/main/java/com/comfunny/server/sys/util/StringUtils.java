package com.comfunny.server.sys.util;

import java.text.SimpleDateFormat;
import java.util.Locale;

public class StringUtils {

    /**
     * 문자열이 null 또는 빈 문자열인지 확인합니다.
     * @param str 확인할 문자열
     * @return 문자열이 null 또는 빈 문자열인 경우 true를 반환
     */
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    /**
     * 주어진 문자를 문자열에서 제거합니다.
     * @param str 처리할 문자열
     * @param remove 제거할 문자
     * @return 수정된 문자열
     */
    public static String remove(String str, char remove) {
        if (isEmpty(str)) {
            return str;
        }
        StringBuilder sb = new StringBuilder();
        for (char c : str.toCharArray()) {
            if (c != remove) {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    /**
     * 문자열에서 특정 부분을 다른 문자열로 대체합니다.
     * @param source 원본 문자열
     * @param subject 대체될 부분
     * @param object 대체할 문자열
     * @return 대체된 문자열
     */
    public static String replace(String source, String subject, String object) {
        if (isEmpty(source) || subject == null || object == null) {
            return source;
        }
        return source.replace(subject, object);
    }

    /**
     * 현재 시간을 yyyyMMddhhmmssSSS 형태의 문자열로 반환합니다.
     * @return 형식화된 시간 문자열
     */
    public static String getTimeStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmssSSS", Locale.KOREA);
        return sdf.format(System.currentTimeMillis());
    }

    /**
     * null 문자열을 빈 문자열로 변환합니다.
     * @param str 검사할 문자열
     * @return 원본 문자열이 null이 아닌 경우 원본 문자열, null인 경우 빈 문자열
     */
    public static String nullToEmpty(String str) {
        return str == null ? "" : str;
    }

    /**
     * 문자열을 정수로 변환합니다. 변환할 수 없는 경우 0을 반환합니다.
     * @param str 변환할 문자열
     * @return 변환된 정수 또는 0
     */
    public static int toInt(String str) {
        try {
            return Integer.parseInt(str.trim());
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    /**
     * 문자열의 앞뒤 공백을 제거합니다.
     * @param str 처리할 문자열
     * @return 공백이 제거된 문자열
     */
    public static String trim(String str) {
        return str == null ? null : str.trim();
    }

    /**
     * 두 문자 사이의 임의의 문자를 생성합니다.
     * @param startChar 시작 문자
     * @param endChar 종료 문자
     * @return 생성된 문자
     */
    public static String getRandomString(char startChar, char endChar) {
        if (startChar > endChar) {
            throw new IllegalArgumentException("시작 문자는 종료 문자보다 작아야 합니다.");
        }
        int start = (int) startChar;
        int end = (int) endChar;
        return Character.toString((char) (start + (int) (Math.random() * (end - start + 1))));
    }


    /**
     * Object를 int로 안전하게 변환합니다. Object가 null이거나 변환할 수 없는 경우 주어진 기본값을 반환합니다.
     * @param obj 변환할 객체
     * @param defaultValue 변환 실패 시 반환할 기본값
     * @return 변환된 int 값 또는 기본값
     */
    public static int safeToInt(Object obj, int defaultValue) {
        if (obj == null) return defaultValue;
        try {
            return Integer.parseInt(obj.toString().trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    /**
     * Object를 long으로 안전하게 변환합니다. Object가 null이거나 변환할 수 없는 경우 주어진 기본값을 반환합니다.
     * @param obj 변환할 객체
     * @param defaultValue 변환 실패 시 반환할 기본값
     * @return 변환된 long 값 또는 기본값
     */
    public static long safeToLong(Object obj, long defaultValue) {
        if (obj == null) return defaultValue;
        try {
            return Long.parseLong(obj.toString().trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    /**
     * Object를 double로 안전하게 변환합니다. Object가 null이거나 변환할 수 없는 경우 주어진 기본값을 반환합니다.
     * @param obj 변환할 객체
     * @param defaultValue 변환 실패 시 반환할 기본값
     * @return 변환된 double 값 또는 기본값
     */
    public static double safeToDouble(Object obj, double defaultValue) {
        if (obj == null) return defaultValue;
        try {
            return Double.parseDouble(obj.toString().trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    /**
     * Object를 float로 안전하게 변환합니다. Object가 null이거나 변환할 수 없는 경우 주어진 기본값을 반환합니다.
     * @param obj 변환할 객체
     * @param defaultValue 변환 실패 시 반환할 기본값
     * @return 변환된 float 값 또는 기본값
     */
    public static float safeToFloat(Object obj, float defaultValue) {
        if (obj == null) return defaultValue;
        try {
            return Float.parseFloat(obj.toString().trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    /**
     * 주어진 문자열을 왼쪽에서 지정된 길이만큼 특정 문자로 채워넣는다.
     * @param str 원본 문자열
     * @param size 총 길이
     * @param padChar 채워넣을 문자
     * @return 수정된 문자열
     */
    public static String leftPad(String str, int size, String padChar) {
        if (str == null) {
            return null;
        }
        int pads = size - str.length();
        if (pads <= 0) {
            return str; // 이미 충분히 길거나 더 길면 변경하지 않음
        }
        StringBuilder sb = new StringBuilder(size);
        for (int i = 0; i < pads; i++) {
            sb.append(padChar);
        }
        sb.append(str);
        return sb.toString();
    }

    /**
     * 주어진 문자열을 오른쪽에서 지정된 길이만큼 특정 문자로 채워넣는다.
     * @param str 원본 문자열
     * @param size 총 길이
     * @param padChar 채워넣을 문자
     * @return 수정된 문자열
     */
    public static String rightPad(String str, int size, String padChar) {
        if (str == null) {
            return null;
        }
        int pads = size - str.length();
        if (pads <= 0) {
            return str; // 이미 충분히 길거나 더 길면 변경하지 않음
        }
        StringBuilder sb = new StringBuilder(size);
        sb.append(str);
        for (int i = 0; i < pads; i++) {
            sb.append(padChar);
        }
        return sb.toString();
    }
}

