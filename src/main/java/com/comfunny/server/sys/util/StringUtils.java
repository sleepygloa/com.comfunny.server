package com.comfunny.server.sys.util;


import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

public class StringUtils {
    /**
     * 빈 문자열 <code>""</code>.
     */
    public static final String EMPTY = "";
    private static final char WHITE_SPACE = ' ';

    /**
     * <p>Padding을 할 수 있는 최대 수치</p>
     */
    //private static final int PAD_LIMIT = 8192;

    /**
     * <p>An array of <code>String</code>s used for padding.</p>
     * <p>Used for efficient space padding. The length of each String expands as needed.</p>
     */
    /*
	private static final String[] PADDING = new String[Character.MAX_VALUE];

	static {
		//space padding is most common, start with 64 chars
		PADDING[32] = "                                                                ";
	}
     */

    /**
     * 문자열이 지정한 길이를 초과했을때 지정한길이에다가 해당 문자열을 붙여주는 메서드.
     * @param source 원본 문자열 배열
     * @param output 더할문자열
     * @param slength 지정길이
     * @return 지정길이로 잘라서 더할분자열 합친 문자열
     */
    public static String cutString(String source, String output, int slength) {
        String returnVal = null;
        if (source != null) {
            if (source.length()>slength) {
                returnVal = source.substring(0, slength) + output;
            } else
                returnVal = source;
        }
        return returnVal;
    }

    /**
     * 문자열이 지정한 길이를 초과했을때 해당 문자열을 삭제하는 메서드
     * @param source 원본 문자열 배열
     * @param slength 지정길이
     * @return 지정길이로 잘라서 더할분자열 합친 문자열
     */
    public static String cutString(String source, int slength) {
        String result = null;
        if (source != null) {
            if (source.length()>slength) {
                result = source.substring(0, slength);
            } else
                result = source;
        }
        return result;
    }

    /**
     * <p>
     * String이 비었거나("") 혹은 null 인지 검증한다.
     * </p>
     *
     * <pre>
     *  StringUtil.isEmpty(null)      = true
     *  StringUtil.isEmpty("")        = true
     *  StringUtil.isEmpty(" ")       = false
     *  StringUtil.isEmpty("bob")     = false
     *  StringUtil.isEmpty("  bob  ") = false
     * </pre>
     *
     * @param str - 체크 대상 스트링오브젝트이며 null을 허용함
     * @return <code>true</code> - 입력받은 String 이 빈 문자열 또는 null인 경우
     */
    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0;
    }

    /**
     * <p>기준 문자열에 포함된 모든 대상 문자(char)를 제거한다.</p>
     *
     * <pre>
     * StringUtil.remove(null, *)       = null
     * StringUtil.remove("", *)         = ""
     * StringUtil.remove("queued", 'u') = "qeed"
     * StringUtil.remove("queued", 'z') = "queued"
     * </pre>
     *
     * @param str  입력받는 기준 문자열
     * @param remove  입력받는 문자열에서 제거할 대상 문자열
     * @return 제거대상 문자열이 제거된 입력문자열. 입력문자열이 null인 경우 출력문자열은 null
     */
    public static String remove(String str, char remove) {
        if (isEmpty(str) || str.indexOf(remove) == -1) {
            return str;
        }
        char[] chars = str.toCharArray();
        int pos = 0;
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] != remove) {
                chars[pos++] = chars[i];
            }
        }
        return new String(chars, 0, pos);
    }

    /**
     * <p>문자열 내부의 콤마 character(,)를 모두 제거한다.</p>
     *
     * <pre>
     * StringUtil.removeCommaChar(null)       = null
     * StringUtil.removeCommaChar("")         = ""
     * StringUtil.removeCommaChar("asdfg,qweqe") = "asdfgqweqe"
     * </pre>
     *
     * @param str 입력받는 기준 문자열
     * @return " , "가 제거된 입력문자열
     *  입력문자열이 null인 경우 출력문자열은 null
     */
    public static String removeCommaChar(String str) {
        return remove(str, ',');
    }

    /**
     * <p>문자열 내부의 마이너스 character(-)를 모두 제거한다.</p>
     *
     * <pre>
     * StringUtil.removeMinusChar(null)       = null
     * StringUtil.removeMinusChar("")         = ""
     * StringUtil.removeMinusChar("a-sdfg-qweqe") = "asdfgqweqe"
     * </pre>
     *
     * @param str  입력받는 기준 문자열
     * @return " - "가 제거된 입력문자열
     *  입력문자열이 null인 경우 출력문자열은 null
     */
    public static String removeMinusChar(String str) {
        return remove(str, '-');
    }


    /**
     * 원본 문자열의 포함된 특정 문자열을 새로운 문자열로 변환하는 메서드
     * @param source 원본 문자열
     * @param subject 원본 문자열에 포함된 특정 문자열
     * @param object 변환할 문자열
     * @return sb.toString() 새로운 문자열로 변환된 문자열
     */
    public static String replace(String source, String subject, String object) {
        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;
        String srcStr  = source;

        while (srcStr.indexOf(subject) >= 0) {
            preStr = srcStr.substring(0, srcStr.indexOf(subject));
            nextStr = srcStr.substring(srcStr.indexOf(subject) + subject.length(), srcStr.length());
            srcStr = nextStr;
            rtnStr.append(preStr).append(object);
        }
        rtnStr.append(nextStr);
        return rtnStr.toString();
    }

    /**
     * 원본 문자열의 포함된 특정 문자열 첫번째 한개만 새로운 문자열로 변환하는 메서드
     * @param source 원본 문자열
     * @param subject 원본 문자열에 포함된 특정 문자열
     * @param object 변환할 문자열
     * @return sb.toString() 새로운 문자열로 변환된 문자열 / source 특정문자열이 없는 경우 원본 문자열
     */
    public static String replaceOnce(String source, String subject, String object) {
        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;
        if (source.indexOf(subject) >= 0) {
            preStr = source.substring(0, source.indexOf(subject));
            nextStr = source.substring(source.indexOf(subject) + subject.length(), source.length());
            rtnStr.append(preStr).append(object).append(nextStr);
            return rtnStr.toString();
        } else {
            return source;
        }
    }

    /**
     * <code>subject</code>에 포함된 각각의 문자를 object로 변환한다.
     *
     * @param source 원본 문자열
     * @param subject 원본 문자열에 포함된 특정 문자열
     * @param object 변환할 문자열
     * @return sb.toString() 새로운 문자열로 변환된 문자열
     */
    public static String replaceChar(String source, String subject, String object) {
        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;
        String srcStr  = source;

        char chA;

        for (int i = 0; i < subject.length(); i++) {
            chA = subject.charAt(i);

            if (srcStr.indexOf(chA) >= 0) {
                preStr = srcStr.substring(0, srcStr.indexOf(chA));
                nextStr = srcStr.substring(srcStr.indexOf(chA) + 1, srcStr.length());
                srcStr = rtnStr.append(preStr).append(object).append(nextStr).toString();
            }
        }

        return srcStr;
    }

    /**
     * <p>오라클의 decode 함수와 동일한 기능을 가진 메서드이다.
     * <code>sourStr</code>과 <code>compareStr</code>의 값이 같으면
     * <code>returStr</code>을 반환하며, 다르면  <code>defaultStr</code>을 반환한다.
     * </p>
     *
     * <pre>
     * StringUtil.decode(null, null, "foo", "bar")= "foo"
     * StringUtil.decode("", null, "foo", "bar") = "bar"
     * StringUtil.decode(null, "", "foo", "bar") = "bar"
     * StringUtil.decode("하이", "하이", null, "bar") = null
     * StringUtil.decode("하이", "하이  ", "foo", null) = null
     * StringUtil.decode("하이", "하이", "foo", "bar") = "foo"
     * StringUtil.decode("하이", "하이  ", "foo", "bar") = "bar"
     * </pre>
     *
     * @param sourceStr 비교할 문자열
     * @param compareStr 비교 대상 문자열
     * @param returnStr sourceStr와 compareStr의 값이 같을 때 반환할 문자열
     * @param defaultStr sourceStr와 compareStr의 값이 다를 때 반환할 문자열
     * @return sourceStr과 compareStr의 값이 동일(equal)할 때 returnStr을 반환하며,
     *         <br/>다르면 defaultStr을 반환한다.
     */
    public static String decode(String sourceStr, String compareStr, String returnStr, String defaultStr) {
        if (sourceStr == null && compareStr == null) {
            return returnStr;
        }

        if (sourceStr == null && compareStr != null) {
            return defaultStr;
        }

        if (sourceStr.trim().equals(compareStr)) {
            return returnStr;
        }

        return defaultStr;
    }

    /**
     * <p>오라클의 decode 함수와 동일한 기능을 가진 메서드이다.
     * <code>sourStr</code>과 <code>compareStr</code>의 값이 같으면
     * <code>returStr</code>을 반환하며, 다르면  <code>sourceStr</code>을 반환한다.
     * </p>
     *
     * <pre>
     * StringUtil.decode(null, null, "foo") = "foo"
     * StringUtil.decode("", null, "foo") = ""
     * StringUtil.decode(null, "", "foo") = null
     * StringUtil.decode("하이", "하이", "foo") = "foo"
     * StringUtil.decode("하이", "하이 ", "foo") = "하이"
     * StringUtil.decode("하이", "바이", "foo") = "하이"
     * </pre>
     *
     * @param sourceStr 비교할 문자열
     * @param compareStr 비교 대상 문자열
     * @param returnStr sourceStr와 compareStr의 값이 같을 때 반환할 문자열
     * @return sourceStr과 compareStr의 값이 동일(equal)할 때 returnStr을 반환하며,
     *         <br/>다르면 sourceStr을 반환한다.
     */
    public static String decode(String sourceStr, String compareStr, String returnStr) {
        return decode(sourceStr, compareStr, returnStr, sourceStr);
    }

    /**
     * 객체가 null인지 확인하고 null인 경우 "" 로 바꾸는 메서드
     * @param object 원본 객체
     * @return resultVal 문자열
     */
    public static String isNullToString(Object object) {
        String string = "";

        if (object != null) {
            string = object.toString().trim();
        }

        return string;
    }

    /**
     *<pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     *</pre>
     */
    public static String nullConvert(Object src) {
        //if (src != null && src.getClass().getName().equals("java.math.BigDecimal")) {
        if (src != null && src instanceof java.math.BigDecimal) {
            return ((BigDecimal)src).toString();
        }

        if (src == null || src.equals("null")) {
            return "";
        } else {
            return ((String)src).trim();
        }
    }

    /**
     *<pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     *</pre>
     */
    public static String nullConvert(String src) {

        if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
            return "";
        } else {
            return src.trim();
        }
    }

    /**
     *<pre>
     * 인자로 받은 String이 null일 경우 &quot;0&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;0&quot;로 바꾼 String 값.
     *</pre>
     */
    public static int zeroConvert(Object src) {

        if (src == null || src.equals("null")) {
            return 0;
        } else {
            return Integer.parseInt(((String)src).trim());
        }
    }

    /**
     *<pre>
     * 인자로 받은 String이 null일 경우 &quot;&quot;로 리턴한다.
     * &#064;param src null값일 가능성이 있는 String 값.
     * &#064;return 만약 String이 null 값일 경우 &quot;&quot;로 바꾼 String 값.
     *</pre>
     */
    public static int zeroConvert(String src) {

        if (src == null || src.equals("null") || "".equals(src) || " ".equals(src)) {
            return 0;
        } else {
            return Integer.parseInt(src.trim());
        }
    }

    /**
     * <p>문자열에서 {@link Character#isWhitespace(char)}에 정의된
     * 모든 공백문자를 제거한다.</p>
     *
     * <pre>
     * StringUtil.removeWhitespace(null)         = null
     * StringUtil.removeWhitespace("")           = ""
     * StringUtil.removeWhitespace("abc")        = "abc"
     * StringUtil.removeWhitespace("   ab  c  ") = "abc"
     * </pre>
     *
     * @param str  공백문자가 제거도어야 할 문자열
     * @return the 공백문자가 제거된 문자열, null이 입력되면 <code>null</code>이 리턴
     */
    public static String removeWhitespace(String str) {
        if (isEmpty(str)) {
            return str;
        }
        int sz = str.length();
        char[] chs = new char[sz];
        int count = 0;
        for (int i = 0; i < sz; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                chs[count++] = str.charAt(i);
            }
        }
        if (count == sz) {
            return str;
        }

        return new String(chs, 0, count);
    }

    /**
     * Html 코드가 들어간 문서를 표시할때 태그에 손상없이 보이기 위한 메서드
     *
     * @param strString
     * @return HTML 태그를 치환한 문자열
     */
    public static String checkHtmlView(String strString) {
        String strNew = "";

        try {
            StringBuffer strTxt = new StringBuffer("");

            char chrBuff;
            int len = strString.length();

            for (int i = 0; i < len; i++) {
                chrBuff = (char)strString.charAt(i);

                switch (chrBuff) {
                    case '<':
                        strTxt.append("&lt;");
                        break;
                    case '>':
                        strTxt.append("&gt;");
                        break;
                    case '"':
                        strTxt.append("&quot;");
                        break;
                    case 10:
                        strTxt.append("<br>");
                        break;
                    case ' ':
                        strTxt.append("&nbsp;");
                        break;
                    case '&' :
                        strTxt.append("&amp;");
                        break;
                    default:
                        strTxt.append(chrBuff);
                }
            }

            strNew = strTxt.toString();

        } catch (Exception ex) {
            return null;
        }

        return strNew;
    }

    /**
     * <p>입력된 String의 앞쪽에서 두번째 인자로 전달된 문자(stripChars)를 모두 제거한다.</p>
     *
     * <pre>
     * StringUtil.stripStart(null, *)          = null
     * StringUtil.stripStart("", *)            = ""
     * StringUtil.stripStart("abc", "")        = "abc"
     * StringUtil.stripStart("abc", null)      = "abc"
     * StringUtil.stripStart("  abc", null)    = "abc"
     * StringUtil.stripStart("abc  ", null)    = "abc  "
     * StringUtil.stripStart(" abc ", null)    = "abc "
     * StringUtil.stripStart("yxabc  ", "xyz") = "abc  "
     * </pre>
     *
     * @param str 지정된 문자가 제거되어야 할 문자열
     * @param stripChars 제거대상 문자열
     * @return 지정된 문자가 제거된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String stripStart(String str, String stripChars) {
        int strLen;
        if (str == null || (strLen = str.length()) == 0) {
            return str;
        }
        int start = 0;
        if (stripChars == null) {
            while ((start != strLen) && Character.isWhitespace(str.charAt(start))) {
                start++;
            }
        } else if (stripChars.length() == 0) {
            return str;
        } else {
            while ((start != strLen) && (stripChars.indexOf(str.charAt(start)) != -1)) {
                start++;
            }
        }

        return str.substring(start);
    }


    /**
     * <p>입력된 String의 뒤쪽에서 두번째 인자로 전달된 문자(stripChars)를 모두 제거한다.</p>
     *
     * <pre>
     * StringUtil.stripEnd(null, *)          = null
     * StringUtil.stripEnd("", *)            = ""
     * StringUtil.stripEnd("abc", "")        = "abc"
     * StringUtil.stripEnd("abc", null)      = "abc"
     * StringUtil.stripEnd("  abc", null)    = "  abc"
     * StringUtil.stripEnd("abc  ", null)    = "abc"
     * StringUtil.stripEnd(" abc ", null)    = " abc"
     * StringUtil.stripEnd("  abcyx", "xyz") = "  abc"
     * </pre>
     *
     * @param str 지정된 문자가 제거되어야 할 문자열
     * @param stripChars 제거대상 문자열
     * @return 지정된 문자가 제거된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String stripEnd(String str, String stripChars) {
        int end;
        if (str == null || (end = str.length()) == 0) {
            return str;
        }

        if (stripChars == null) {
            while ((end != 0) && Character.isWhitespace(str.charAt(end - 1))) {
                end--;
            }
        } else if (stripChars.length() == 0) {
            return str;
        } else {
            while ((end != 0) && (stripChars.indexOf(str.charAt(end - 1)) != -1)) {
                end--;
            }
        }

        return str.substring(0, end);
    }

    /**
     * <p>입력된 String의 앞, 뒤에서 두번째 인자로 전달된 문자(stripChars)를 모두 제거한다.</p>
     *
     * <pre>
     * StringUtil.strip(null, *)          = null
     * StringUtil.strip("", *)            = ""
     * StringUtil.strip("abc", null)      = "abc"
     * StringUtil.strip("  abc", null)    = "abc"
     * StringUtil.strip("abc  ", null)    = "abc"
     * StringUtil.strip(" abc ", null)    = "abc"
     * StringUtil.strip("  abcyx", "xyz") = "  abc"
     * </pre>
     *
     * @param str 지정된 문자가 제거되어야 할 문자열
     * @param stripChars 제거대상 문자열
     * @return 지정된 문자가 제거된 문자열, null이 입력되면 <code>null</code> 리턴
     */
    public static String strip(String str, String stripChars) {
        if (isEmpty(str)) {
            return str;
        }

        String srcStr = str;
        srcStr = stripStart(srcStr, stripChars);

        return stripEnd(srcStr, stripChars);
    }

    /**
     * 문자열 A에서 Z사이의 랜덤 문자열을 구하는 기능을 제공 시작문자열과 종료문자열 사이의 랜덤 문자열을 구하는 기능
     *
     * @param startChr
     *            - 첫 문자
     * @param endChr
     *            - 마지막문자
     * @return 랜덤문자
     * @exception
     * @see
     */
    public static String getRandomStr(char startChr, char endChr) {

        int randomInt;
        String randomStr = null;

        //시작문자 및 종료문자를 아스키숫자로 변환한다.
        int startInt = Integer.valueOf(startChr);
        int endInt = Integer.valueOf(endChr);

        //시작문자열이 종료문자열보가 클경우
        if (startInt>endInt) {
            throw new IllegalArgumentException("Start String: " + startChr + " End String: " + endChr);
        }

        try {
            //랜덤 객체 생성
            SecureRandom rnd = new SecureRandom();

            do {
                //시작문자 및 종료문자 중에서 랜덤 숫자를 발생시킨다.
                randomInt = rnd.nextInt(endInt + 1);
            } while (randomInt < startInt); //입력받은 문자 'A'(65)보다 작으면 다시 랜덤 숫자 발생.

            //랜덤 숫자를 문자로 변환 후 스트링으로 다시 변환
            randomStr = (char)randomInt + "";
        } catch (Exception e) {
            e.printStackTrace();
        }

        //랜덤문자열를 리턴
        return randomStr;
    }

    /**
     * 문자열을 다양한 문자셋(EUC-KR[KSC5601],UTF-8..)을 사용하여 인코딩하는 기능 역으로 디코딩하여 원래의 문자열을
     * 복원하는 기능을 제공함 String temp = new String(문자열.getBytes("바꾸기전 인코딩"),"바꿀 인코딩");
     * String temp = new String(문자열.getBytes("8859_1"),"KSC5601"); => UTF-8 에서
     * EUC-KR
     *
     * @param srcString
     *            - 문자열
     * @param srcCharsetNm
     *            - 원래 CharsetNm
     * @param charsetNm
     *            - CharsetNm
     * @return 인(디)코딩 문자열
     * @exception MyException
     * @see
     */
    public static String getEncdDcd(String srcString, String srcCharsetNm, String cnvrCharsetNm) {

        String rtnStr = null;

        if (srcString == null)
            return null;

        try {
            rtnStr = new String(srcString.getBytes(srcCharsetNm), cnvrCharsetNm);
        } catch (UnsupportedEncodingException e) {
            rtnStr = null;
        }

        return rtnStr;
    }

    /**
     * 특수문자를 웹 브라우저에서 정상적으로 보이기 위해 특수문자를 처리('<' -> & lT)하는 기능이다
     * @param 	srcString 		- '<'
     * @return 	변환문자열('<' -> "&lt"
//     * @exception MyException
     * @see
     */
    public static String getSpclStrCnvr(String srcString) {

        String rtnStr = null;

        try {
            StringBuffer strTxt = new StringBuffer("");

            char chrBuff;
            int len = srcString.length();

            for (int i = 0; i < len; i++) {
                chrBuff = (char)srcString.charAt(i);

                switch (chrBuff) {
                    case '<':
                        strTxt.append("&lt;");
                        break;
                    case '>':
                        strTxt.append("&gt;");
                        break;
                    case '&':
                        strTxt.append("&amp;");
                        break;
                    default:
                        strTxt.append(chrBuff);
                }
            }

            rtnStr = strTxt.toString();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return rtnStr;
    }

    /**
     * 응용어플리케이션에서 고유값을 사용하기 위해 시스템에서17자리의TIMESTAMP값을 구하는 기능
     *
     * @param
     * @return Timestamp 값
//     * @exception MyException
     * @see
     */
    public static String getTimeStamp() {

        String rtnStr = null;

        //문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
        String pattern = "yyyyMMddhhmmssSSS";

        try {
            SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
            Timestamp ts = new Timestamp(System.currentTimeMillis());

            rtnStr = sdfCurrent.format(ts.getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return rtnStr;
    }

    /**
     * isNull
     *
     * @param str
     * @return
     */
    public static boolean isNull(String str) {
        if (str != null) {
            str = str.trim();
        }

        return (str == null || "".equals(str));
    }

    /**
     * isApha
     *
     * @param str
     * @return
     */
    public static boolean isAlpha(String str) {

        if (str == null) {
            return false;
        }

        int size = str.length();

        if (size == 0) {
            return false;
        }

        for (int i = 0; i < size; i++) {
            if (!Character.isLetter(str.charAt(i))) {
                return false;
            }
        }

        return true;
    }

    /**
     * isAlphaNumeric
     *
     * @param str
     * @return
     */
    public static boolean isAlphaNumeric(String str) {

        if (str == null) {
            return false;
        }

        int size = str.length();

        if (size == 0) {
            return false;
        }

        for (int i = 0; i < size; i++) {
            if (!Character.isLetterOrDigit(str.charAt(i))) {
                return false;
            }
        }

        return true;
    }

    /**
     * integer2string
     *
     * @param integer
     * @return
     */
    public static String integer2string(int integer) {
        return ("" + integer);
    }

    /**
     * long2string
     *
//     * @param data
     * @return
     */
    public static String long2string(long longdata) {
        return String.valueOf(longdata);
    }

    /**
     * float2string
     *
     * @param floatdata
     * @return
     */
    public static String float2string(float floatdata) {
        return String.valueOf(floatdata);
    }

    /**
     * double2string
     *
     * @param doubledata
     * @return
     */
    public static String double2string(double doubledata) {
        return String.valueOf(doubledata);
    }

    /**
     * null2void
     *
     * @param str
     * @return
     */
    public static String null2void(String str) {

        if (isNull(str)) {
            str = "";
        }

        return str;
    }

    /**
     * string2integer
     *
     * @param str
     * @return
     */
    public static int string2integer(String str) {

        if (isNull(str)) {
            return 0;
        }

        return Integer.parseInt(str);
    }

    /**
     * string2float
     *
     * @param str
     * @return
     */
    public static float string2float(String str) {

        if (isNull(str)) {
            return 0.0F;
        }

        return Float.parseFloat(str);
    }

    /**
     * string2float
     *
     * @param str
     * @return
     */
    public static double string2double(String str) {

        if (isNull(str)) {
            return 0.0D;
        }

        return Double.parseDouble(str);
    }

    /**
     * string2long
     *
     * @param str
     * @return
     */
    public static long string2long(String str) {

        if (isNull(str)) {
            return 0L;
        }

        return Long.parseLong(str);
    }

    /**
     * null2string
     *
     * @param str
     * @param defaultValue
     * @return
     */
    public static String null2string(String str, String defaultValue) {

        if (isNull(str)) {
            return defaultValue;
        }

        return str;
    }

    /**
     * string2integer
     *
     * @param str
     * @param defaultValue
     * @return
     */
    public static int string2integer(String str, int defaultValue) {

        if (isNull(str)) {
            return defaultValue;
        }

        return Integer.parseInt(str);
    }

    /**
     * string2float
     *
     * @param str
     * @param defaultValue
     * @return
     */
    public static float string2float(String str, float defaultValue) {

        if (isNull(str)) {
            return defaultValue;
        }

        return Float.parseFloat(str);
    }

    /**
     * string2double
     *
     * @param str
     * @param defaultValue
     * @return
     */
    public static double string2double(String str, double defaultValue) {

        if (isNull(str)) {
            return defaultValue;
        }

        return Double.parseDouble(str);
    }

    /**
     * string2long
     *
     * @param str
     * @param defaultValue
     * @return
     */
    public static long string2long(String str, long defaultValue) {

        if (isNull(str)) {
            return defaultValue;
        }

        return Long.parseLong(str);
    }

    /**
     * equals
     *
     * @param source
     * @param target
     * @return
     */
    public static boolean equals(String source, String target) {

        return null2void(source).equals(null2void(target));

    }

    /**
     * toSubString
     *
     * @param str
     * @param beginIndex
     * @param endIndex
     * @return
     */
    public static String toSubString(String str, int beginIndex, int endIndex) {

        if (equals(str, "")) {
            return str;
        } else if (str.length() < beginIndex) {
            return "";
        } else if (str.length() < endIndex) {
            return str.substring(beginIndex);
        } else {
            return str.substring(beginIndex, endIndex);
        }

    }

    /**
     * toSubString
     *
     * @param source
     * @param beginIndex
     * @return
     */
    public static String toSubString(String source, int beginIndex) {

        if (equals(source, "")) {
            return source;
        } else if (source.length() < beginIndex) {
            return "";
        } else {
            return source.substring(beginIndex);
        }

    }

    /**
     * search
     *
     * @param source
     * @param target
     * @return
     */
    public static int search(String source, String target) {
        int result = 0;
        String strCheck = new String(source);
        for (int i = 0; i < source.length();) {
            int loc = strCheck.indexOf(target);
            if (loc == -1) {
                break;
            } else {
                result++;
                i = loc + target.length();
                strCheck = strCheck.substring(i);
            }
        }
        return result;
    }

    /**
     * trim
     *
     * @param str
     * @return
     */
    public static String trim(String str) {
        return str.trim();
    }

    /**
     * Left trim
     *
     * @param str
     * @return
     */
    public static String ltrim(String str) {

        int index = 0;

        //CHECKSTYLE:OFF
        while (' ' == str.charAt(index++)) {
            //no-op
        }
        //CHECKSTYLE:ON

        if (index>0) {
            str = str.substring(index - 1);
        }

        return str;
    }

    /**
     * Right trim
     *
     * @param str
     * @return
     */
    public static String rtrim(String str) {

        int index = str.length();

        //CHECKSTYLE:OFF
        while (' ' == str.charAt(--index)) {
            //no-op
        }
        //CHECKSTYLE:ON

        if (index < str.length()) {
            str = str.substring(0, index + 1);
        }

        return str;
    }

    /**
     * concat
     *
     * @param str1
     * @param str2
     * @return
     */
    public static String concat(String str1, String str2) {

        StringBuffer sb = new StringBuffer(str1);
        sb.append(str2);

        return sb.toString();
    }

    /**
     * Left pad
     *
     * @param str
     * @param len
     * @param pad
     * @return
     */
    public static String lPad(String str, int len, char pad) {
        return lPad(str, len, pad, false);
    }

    /**
     * Left pad
     *
     * @param str
     * @param len
     * @param pad
     * @param isTrim
     * @return
     */
    public static String lPad(String str, int len, char pad, boolean isTrim) {

        if (isNull(str)) {
            return null;
        }

        if (isTrim) {
            str = str.trim();
        }

        for (int i = str.length(); i < len; i++) {
            str = pad + str;
        }

        return str;
    }

    /**
     * Right pad
     *
     * @param str
     * @param len
     * @param pad
     * @return
     */
    public static String rPad(String str, int len, char pad) {
        return rPad(str, len, pad, false);
    }

    /**
     * Right pad
     *
     * @param str
     * @param len
     * @param pad
     * @param isTrim
     * @return
     */
    public static String rPad(String str, int len, char pad, boolean isTrim) {

        if (isNull(str)) {
            return null;
        }

        if (isTrim) {
            str = str.trim();
        }

        for (int i = str.length(); i < len; i++) {
            str = str + pad;
        }

        return str;
    }

    /**
     * alignLeft
     *
     * @param str
     * @param length
     * @return
     */
    public static String alignLeft(String str, int length) {
        return alignLeft(str, length, false);
    }

    /**
     * <p>
     * 문자열의 뒷쪽에 지정한 길이만큼 공백으로 채움
     * </p>
     * @param str
     * @param length
     * @param isEllipsis
     * @return
     */
    public static String alignLeft(String str, int length, boolean isEllipsis) {

        if (str.length() <= length) {

            StringBuffer temp = new StringBuffer(str);
            for (int i = 0; i < (length - str.length()); i++) {
                temp.append(WHITE_SPACE);
            }
            return temp.toString();
        } else {
            if (isEllipsis) {

                StringBuffer temp = new StringBuffer(length);
                //CHECKSTYLE:OFF
                temp.append(str.substring(0, length - 3));
                //CHECKSTYLE:ON
                temp.append("...");

                return temp.toString();
            } else {
                return str.substring(0, length);
            }
        }
    }

    /**
     * alignRight
     *
     * @param str
     * @param length
     * @return
     */
    public static String alignRight(String str, int length) {

        return alignRight(str, length, false);
    }

    /**
     * alignRight
     *
     * @param str
     * @param length
     * @param isEllipsis
     * @return
     */
    public static String alignRight(String str, int length, boolean isEllipsis) {

        if (str.length() <= length) {

            StringBuffer temp = new StringBuffer(length);
            for (int i = 0; i < (length - str.length()); i++) {
                temp.append(WHITE_SPACE);
            }
            temp.append(str);
            return temp.toString();
        } else {
            if (isEllipsis) {

                StringBuffer temp = new StringBuffer(length);
                //CHECKSTYLE:OFF
                temp.append(str.substring(0, length - 3));
                //CHECKSTYLE:ON
                temp.append("...");

                return temp.toString();
            } else {
                return str.substring(0, length);
            }
        }
    }

    /**
     * alignCenter
     *
     * @param str
     * @param length
     * @return
     */
    public static String alignCenter(String str, int length) {
        return alignCenter(str, length, false);
    }

    /**
     * alignCenter
     *
     * @param str
     * @param length
     * @param isEllipsis
     * @return
     */
    public static String alignCenter(String str, int length, boolean isEllipsis) {
        if (str.length() <= length) {

            StringBuffer temp = new StringBuffer(length);
            int leftMargin = (int) (length - str.length()) / 2;

            int rightMargin;
            if ((leftMargin * 2) == (length - str.length())) {
                rightMargin = leftMargin;
            } else {
                rightMargin = leftMargin + 1;
            }

            for (int i = 0; i < leftMargin; i++) {
                temp.append(WHITE_SPACE);
            }

            temp.append(str);

            for (int i = 0; i < rightMargin; i++) {
                temp.append(WHITE_SPACE);
            }

            return temp.toString();
        } else {
            if (isEllipsis) {

                StringBuffer temp = new StringBuffer(length);
                //CHECKSTYLE:OFF
                temp.append(str.substring(0, length - 3));
                //CHECKSTYLE:ON
                temp.append("...");

                return temp.toString();
            } else {
                return str.substring(0, length);
            }
        }

    }

    /**
     * capitalize
     *
     * @param str
     * @return
     */
    public static String capitalize(String str) {
        return !isNull(str) ? str.substring(0, 1).toUpperCase()
                + str.substring(1).toLowerCase() : str;
    }

    /**
     * toEng
     *
     * @param kor
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String toEng(String kor) throws UnsupportedEncodingException {

        if (isNull(kor)) {
            return null;
        }

        return new String(kor.getBytes("KSC5601"), "8859_1");
    }

    /**
     * toKor
     *
     * @param en
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String toKor(String en) throws UnsupportedEncodingException {

        if (isNull(en)) {
            return null;
        }

        return new String(en.getBytes("8859_1"), "euc-kr");
    }

    /**
     * countOf
     *
     * @param str
     * @param charToFind
     * @return
     */
    public static int countOf(String str, String charToFind) {
        int findLength = charToFind.length();
        int count = 0;

        for (int idx = str.indexOf(charToFind); idx >= 0; idx = str.indexOf(charToFind, idx + findLength)) {
            count++;
        }

        return count;
    }

    /*
     * StringUtil in Anyframe
     */

    /**
     * Encode a string using algorithm specified in web.xml and return the resulting encrypted password.
     * If exception, the plain credentials string is returned
     *
     * @param password Password or other credentials to use in authenticating this username
     * @param algorithm Algorithm used to do the digest
     * @return encypted password based on the algorithm.
     */
    public static String encodePassword(String password, String algorithm) {
        byte[] unencodedPassword = password.getBytes();

        MessageDigest md = null;

        try {
            //first create an instance, given the provider
            md = MessageDigest.getInstance(algorithm);
        } catch (Exception e) {

            return password;
        }

        md.reset();

        //call the update method one or more times (useful when you don't know the size of your data, eg. stream)
        md.update(unencodedPassword);

        //now calculate the hash
        byte[] encodedPassword = md.digest();

        StringBuffer buf = new StringBuffer();

        for (int i = 0; i < encodedPassword.length; i++) {
            //CHECKSTYLE:OFF
            if (((int) encodedPassword[i] & 0xff) < 0x10) {
                buf.append("0");
            }

            buf.append(Long.toString((int) encodedPassword[i] & 0xff, 16));
            //CHECKSTYLE:ON
        }

        return buf.toString();
    }

    /**
     * convert first letter to a big letter or a small letter.<br>
     *
     * <pre>
     * StringUtil.trim('Password') = 'password'
     * StringUtil.trim('password') = 'Password'
     * </pre>
     * @param str String to be swapped
     * @return String converting result
     */
    public static String swapFirstLetterCase(String str) {
        StringBuffer sbuf = new StringBuffer(str);
        sbuf.deleteCharAt(0);
        if (Character.isLowerCase(str.substring(0, 1).toCharArray()[0])) {
            sbuf.insert(0, str.substring(0, 1).toUpperCase());
        } else {
            sbuf.insert(0, str.substring(0, 1).toLowerCase());
        }
        return sbuf.toString();
    }

    /**
     * If original String has a specific String, remove specific Strings from original String.
     *
     * <pre>
     * StringUtil.trim('pass*word', '*') = 'password'
     * </pre>
     * @param origString original String
     * @param trimString String to be trimmed
     * @return converting result
     */
    public static String trim(String origString, String trimString) {
        int startPosit = origString.indexOf(trimString);
        if (startPosit != -1) {
            int endPosit = trimString.length() + startPosit;
            return origString.substring(0, startPosit) + origString.substring(endPosit);
        }
        return origString;
    }

    /**
     * Break a string into specific tokens and return a String of last location.
     *
     * <pre>
     * StringUtil.getLastString('password*password*a*b*c', '*') = 'c'
     * </pre>
     * @param origStr original String
     * @param strToken specific tokens
     * @return String of last location
     */
    public static String getLastString(String origStr, String strToken) {
        StringTokenizer str = new StringTokenizer(origStr, strToken);
        String lastStr = "";
        while (str.hasMoreTokens()) {
            lastStr = str.nextToken();
        }
        return lastStr;
    }

    /**
     * If original String has token, Break a string into specific tokens and change String Array.
     * If not, return a String Array which has original String as it is.
     *
     * <pre>
     * StringUtil.getStringArray('passwordabcpassword', 'abc') = String[]{'password','password'}
     * StringUtil.getStringArray('pasword*password', 'abc') = String[]{'pasword*password'}
     * </pre>
     * @param str original String
     * @param strToken specific String token
     * @return String[]
     */
    public static String[] getStringArray(String str, String strToken) {
        if (str.indexOf(strToken) != -1) {
            StringTokenizer st = new StringTokenizer(str, strToken);
            String[] stringArray = new String[st.countTokens()];
            for (int i = 0; st.hasMoreTokens(); i++) {
                stringArray[i] = st.nextToken();
            }
            return stringArray;
        }
        return new String[] { str };
    }

    /**
     * If string is null or empty string, return false. <br>
     * If not, return true.
     *
     * <pre>
     * StringUtil.isNotEmpty('') = false
     * StringUtil.isNotEmpty(null) = false
     * StringUtil.isNotEmpty('abc') = true
     * </pre>
     * @param str original String
     * @return which empty string or not.
     */
    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

    /**
     *  It returns true if str matches the pattern string. It performs regular expression pattern matching.
     *
     * <pre>
     * StringUtil.isPatternMatching('abc-def', '*-*') 	= true
     * StringUtil.isPatternMatching('abc', '*-*') 	= false
     * </pre>
     * @param str original String
     * @param pattern pattern String
     * @return boolean which matches the pattern string or not.
     * @throws Exception fail to check pattern matched
     */
    public static boolean isPatternMatching(String str, String pattern) throws Exception {
        //if url has wild key, i.e. "*", convert it to ".*" so that we can perform regex matching
        if (pattern.indexOf('*') >= 0) {
            pattern = pattern.replaceAll("\\*", ".*");
        }

        pattern = "^" + pattern + "$";

        return Pattern.matches(pattern, str);
    }

    /**
     * It returns true if string contains a sequence of the same character.
     *
     * <pre>
     * StringUtil.containsMaxSequence('password', '2') 	= true
     * StringUtil.containsMaxSequence('my000', '3') 	= true
     * StringUtil.containsMaxSequence('abbbbc', '5')	= false
     * </pre>
     * @param str original String
     * @param maxSeqNumber a sequence of the same character
     * @return which contains a sequence of the same character
     */
    public static boolean containsMaxSequence(String str, String maxSeqNumber) {
        int occurence = 1;
        int max = string2integer(maxSeqNumber);
        if (str == null) {
            return false;
        }

        int sz = str.length();
        for (int i = 0; i < (sz - 1); i++) {
            if (str.charAt(i) == str.charAt(i + 1)) {
                occurence++;

                if (occurence == max) {
                    return true;
                }
            } else {
                occurence = 1;
            }
        }
        return false;
    }

    /**
     * <p>
     * Checks that the String contains certain  characters.
     * </p>
     * <p>
     * A <code>null</code> String will return <code>false</code>. A <code>null</code> invalid character array will return <code>false</code>.
     * An empty String ("") always returns false.
     * </p>
     *
     * <pre>
     * StringUtil.containsInvalidChars(null, *) = false
     * StringUtil.containsInvalidChars(*, null) = false
     * StringUtil.containsInvalidChars(&quot;&quot;, *) = false
     * StringUtil.containsInvalidChars(&quot;ab&quot;, '') = false
     * StringUtil.containsInvalidChars(&quot;abab&quot;, 'xyz') = false
     * StringUtil.containsInvalidChars(&quot;ab1&quot;, 'xyz') = false
     * StringUtil.containsInvalidChars(&quot;xbz&quot;, 'xyz') = true
     * </pre>
     * @param str the String to check, may be null
     * @param invalidChars an array of invalid chars, may be null
     * @return false if it contains none of the invalid chars, or is null
     */
    public static boolean containsInvalidChars(String str, char[] invalidChars) {
        if (str == null || invalidChars == null) {
            return false;
        }
        int strSize = str.length();
        int validSize = invalidChars.length;
        for (int i = 0; i < strSize; i++) {
            char ch = str.charAt(i);
            for (int j = 0; j < validSize; j++) {
                if (invalidChars[j] == ch) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * <p>
     * Checks that the String contains certain characters.
     * </p>
     * <p>
     * A <code>null</code> String will return <code>false</code>. A <code>null</code> invalid character array will return <code>false</code>.
     * An empty String ("") always returns false.
     * </p>
     *
     * <pre>
     * StringUtil.containsInvalidChars(null, *) = false
     * StringUtil.containsInvalidChars(*, null) = false
     * StringUtil.containsInvalidChars(&quot;&quot;, *) = false
     * StringUtil.containsInvalidChars(&quot;ab&quot;, '')  = false
     * StringUtil.containsInvalidChars(&quot;abab&quot;, 'xyz') = false
     * StringUtil.containsInvalidChars(&quot;ab1&quot;, 'xyz') = false
     * StringUtil.containsInvalidChars(&quot;xbz&quot;, 'xyz') = true
     * </pre>
     * @param str the String to check, may be null
     * @param invalidChars a String of invalid chars, may be null
     * @return false if it contains none of the invalid chars, or is null
     */
    public static boolean containsInvalidChars(String str, String invalidChars) {
        if (str == null || invalidChars == null) {
            return true;
        }
        return containsInvalidChars(str, invalidChars.toCharArray());
    }

    /**
     * <p>
     * Checks if the String contains only unicode digits. A decimal point is not a unicode digit and returns false.
     * </p>
     * <p>
     *  <code>null</code> will return <code>false</code>. An empty String ("") will return <code>false</code>.
     * </p>
     *
     * <pre>
     * StringUtil.isNumeric(null) = false
     * StringUtil.isNumeric(&quot;&quot;) = false
     * StringUtil.isNumeric(&quot;  &quot;) = false
     * StringUtil.isNumeric(&quot;123&quot;)  = true
     * StringUtil.isNumeric(&quot;12 3&quot;) = false
     * StringUtil.isNumeric(&quot;ab2c&quot;) = false
     * StringUtil.isNumeric(&quot;12-3&quot;) = false
     * StringUtil.isNumeric(&quot;12.3&quot;) = false
     * </pre>
     * @param str the String to check, may be null
     * @return <code>true</code> if only contains digits, and is non-null
     */
    public static boolean isNumeric(String str) {
        if (str == null) {
            return false;
        }
        int sz = str.length();
        if (sz == 0) {
            return false;
        }
        for (int i = 0; i < sz; i++) {
            if (!Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    /**
     * <p>
     * Reverses a String as per
     * {@link StringBuffer#reverse()}.
     * </p>
     * <p>
     * <code>null</code> String returns <code>null</code>.
     * </p>
     *
     * <pre>
     * StringUtil.reverse(null) = null
     * StringUtil.reverse(&quot;&quot;) = &quot;&quot;
     * StringUtil.reverse(&quot;bat&quot;) = &quot;tab&quot;
     * </pre>
     * @param str the String to reverse, may be null
     * @return the reversed String, <code>null</code> if null String input
     */

    public static String reverse(String str) {
        if (str == null) {
            return null;
        }
        return new StringBuffer(str).reverse().toString();
    }

    /**
     * Make a new String that filled original to a special char as cipers
     *
     * @param originalStr original String
     * @param ch a special char
     * @param cipers cipers
     * @return filled String
     */
    public static String fillString(String originalStr, char ch, int cipers) {
        int originalStrLength = originalStr.length();

        if (cipers < originalStrLength) {
            return null;
        }

        int difference = cipers - originalStrLength;

        StringBuffer strBuf = new StringBuffer();
        for (int i = 0; i < difference; i++) {
            strBuf.append(ch);
        }

        strBuf.append(originalStr);
        return strBuf.toString();
    }

    /**
     * Determine whether a (trimmed) string is empty
     *
     * @param foo The text to check.
     * @return Whether empty.
     */
    public static final boolean isEmptyTrimmed(String foo) {
        return (foo == null || foo.trim().length() == 0);
    }

    /**
     * Return token list
     *
     * @param lst
     * @param separator
     * @return
     */
    public static List<String> getTokens(String lst, String separator) {
        List<String> tokens = new ArrayList<String>();

        if (lst != null) {
            StringTokenizer st = new StringTokenizer(lst, separator);
            while (st.hasMoreTokens()) {
                try {
                    String en = st.nextToken().trim();
                    tokens.add(en);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        return tokens;
    }

    /**
     * Return token list which is separated by ","
     *
     * @param lst
     * @return
     */
    public static List<?> getTokens(String lst) {
        return getTokens(lst, ",");
    }

    /**
     * This method convert "string_util" to "stringUtil"
     *
     * @param String targetString
     * @param char posChar
     * @return String result
     */
    public static String convertToCamelCase(String targetString, char posChar) {
        StringBuffer result = new StringBuffer();
        boolean nextUpper = false;
        String allLower = targetString.toLowerCase();

        for (int i = 0; i < allLower.length(); i++) {
            char currentChar = allLower.charAt(i);
            if (currentChar == posChar) {
                nextUpper = true;
            } else {
                if (nextUpper) {
                    currentChar = Character.toUpperCase(currentChar);
                    nextUpper = false;
                }
                result.append(currentChar);
            }
        }
        return result.toString();
    }

    /**
     * Convert a string that may contain underscores to camel case.
     *
     * @param underScore Underscore name.
     * @return Camel case representation of the underscore string.
     */
    public static String convertToCamelCase(String underScore) {
        return convertToCamelCase(underScore, '_');
    }

    /**
     * Convert a camel case string to underscore representation.
     *
     * @param camelCase Camel case name.
     * @return Underscore representation of the camel case string.
     */
    public static String convertToUnderScore(String camelCase) {
        String result = "";
        for (int i = 0; i < camelCase.length(); i++) {
            char currentChar = camelCase.charAt(i);
            //This is starting at 1 so the result does not end up with an underscore at the begin of the value
            if (i>0 && Character.isUpperCase(currentChar)) {
                result = result.concat("_");
            }
            result = result.concat(Character.toString(currentChar).toLowerCase());
        }
        return result;
    }




    public static String defaultString(Object obj) {
        return defaultString(obj, "");
    }

    public static String defaultString(Object obj, String defaultStr) {
        return ((obj != null) ? obj.toString() : defaultStr);
    }


    public static String leftPad(String str, int size) {
        return leftPad(str, size, ' ');
    }

    public static String leftPad(String str, int size, char padChar) {
        if (str == null) {
            return null;
        } else {
            int pads = size - str.length();
            if (pads <= 0) {
                return str;
            } else {
                return pads > 8192 ? leftPad(str, size, String.valueOf(padChar)) : padding(pads, padChar).concat(str);
            }
        }
    }

    public static String leftPad(String str, int size, String padStr) {
        if (str == null) {
            return null;
        } else {
            if (isEmpty(padStr)) {
                padStr = " ";
            }

            int padLen = padStr.length();
            int strLen = str.length();
            int pads = size - strLen;
            if (pads <= 0) {
                return str;
            } else if (padLen == 1 && pads <= 8192) {
                return leftPad(str, size, padStr.charAt(0));
            } else if (pads == padLen) {
                return padStr.concat(str);
            } else if (pads < padLen) {
                return padStr.substring(0, pads).concat(str);
            } else {
                char[] padding = new char[pads];
                char[] padChars = padStr.toCharArray();

                for(int i = 0; i < pads; ++i) {
                    padding[i] = padChars[i % padLen];
                }

                return (new String(padding)).concat(str);
            }
        }
    }
    private static String padding(int repeat, char padChar) throws IndexOutOfBoundsException {
        if (repeat < 0) {
            throw new IndexOutOfBoundsException("Cannot pad a negative amount: " + repeat);
        } else {
            char[] buf = new char[repeat];

            for(int i = 0; i < buf.length; ++i) {
                buf[i] = padChar;
            }

            return new String(buf);
        }
    }
}