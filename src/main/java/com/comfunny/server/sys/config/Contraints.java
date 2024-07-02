package com.comfunny.server.sys.config;

public class Contraints {

    //클라이언트 URL
    public static final String CLIENT_URL = "http://localhost:3000";

    //Security
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";

    //Login Type
    public static final String SIGNUP_DEFAULT = "DEFAULT";


    //JWT 관련 변수
    public static final String ACCESS_TOKEN = "access_token";
    public static final String REFRESH_TOKEN = "refresh_token";
    public static final String TOKEN_TYPE = "Bearer ";

    public static String BIZ_CD = "COMFUNNY_DEVELOPERS";
    public static String GUEST = "guest";
    public static String ADMIN_ID = "COMFUNNY_DEVELOPERS";


    //Pagingable
    public static int PAGE_MIN_VALUE = 0;
    public static int PAGE_MAX_VALUE = 10000;





    public static String INIT_SESSION_VALUE_LANG_CD = "ko";
    public static String INIT_SESSION_VALUE_COUNTRY_CD = "KR";
    public static String INIT_SESSION_VALUE_LOGIN_OS = "web";




    public static final String PARAMETERS = "params";
    public static final String INSERT = "insert";
    public static final String UPDATE = "update";
    public static final String DELETE = "delete";
    public static final String NORMAL = "normal";

    public static final String PAGE = "page";
    public static final String COUNTABLE = "true";
    public static final String START_ROW = "startRow";
    public static final String END_PAGE = "endPage";
    public static final String END_ROW = "endRow";
    public static final String TOTAL_ROW_CNT = "totalRowCnt";
    public static final String DATA_TABLE = "dt_grid";

    public static final int ERR_CD_SUCCESS = 0;
    public static final int ERR_CD_SYSEXCEP = 1000;
    public static final int ERR_CD_NOAUTH = 999;
    public static final int ERR_CD_INVALID= 998;
    public static final int ERR_CD_USEREXCEP = 997;



    public static final int STS_SUC = 100;
    public static final int STS_SUC_MSG = 101;
    public static final int STS_SUC_URI = 102;
    public static final int STS_SUC_MSG_URI = 103;

    public static final String STS_CD = "stsCd";
    public static final String STS_MGS = "stsMsg";

    public static final String MSG_CD = "msgCd";
    public static final String MSG_TXT = "msgTxt";

    public static final String ERR_CD = "errCd";
    public static final String ERR_MSG = "errMsg";

    public static final String RTN_URI = "rtnUri";
    public static final String DB_INFO = "oracleDb";

    public static final String DISPLAY_CD = "displayCd";
    public static final String DISPLAY_MSG = "displayMsg";

    public static final String CLIENT_IP = "s_ip";
    public static final String LOCAL_IP = "127.0.0.1";

    public static final String REQ_URI = "REQ_URI";
    public static final String REQ_URL = "REQ_URL";

    public static final String PRO_CD = "PRO_CD";

    public static final String XOBJECT_MIME_TYPE = "application/x-java-serialized-object";
    public static final String JSON_MIME_TYPE = "application/json";
    public static final String PROVIDER_USE = "1";
    public static final String WEBSERVICE_USE = "1";
    public static final String OPERATION_USE = "1";
    //	public static final String PROG_HIERARCHY_LIST = "11";
    public static final String PARAGON_LOCALE = "s_language";

    //CODES
    public static final String ITEM_CD = "itemCd";
    public static final String SUPPLIER_CD = "supplierCd";
    public static final String STORE_CD = "storeCd";
    public static final String DC_CD = "dcCd";
    public static final String CLIENT_CD = "clientCd";
    public static final String IB_NO = "ibNo";
    public static final String IB_DETAIL_SEQ = "ibDetailSeq";
    public static final String STOCK_NO = "stockNo";
    public static final String INOUT_HIST_NO = "inoutHistNo";
    public static final String LOT_ID = "lotId";
}
