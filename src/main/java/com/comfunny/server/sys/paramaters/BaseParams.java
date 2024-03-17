package com.comfunny.server.sys.paramaters;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.paramaters.datatable.DataTable;
import com.comfunny.server.sys.paramaters.datatable.datarow.CommDataRow;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import com.comfunny.server.sys.util.MessageLoadUtil;

public abstract class BaseParams extends HashMap<String,Object> implements Params {
	private static final long serialVersionUID = 1L;

	private Locale locale;
	private boolean pageable;
	private boolean oracleDb;
	private boolean fileable;
	private boolean countable;
	public void init(){
		this.setParam(Contraints.STS_CD, 100);
		this.setParam(Contraints.ERR_CD, "");
		this.setParam(Contraints.MSG_CD, 0);
		this.setParam(Contraints.MSG_TXT, "");
		this.setParam(Contraints.RTN_URI, "");
		this.setParam(Contraints.DB_INFO, true);
	}
	public void setTotalCount(int totalRowCnt){
		int pageSize = getIntParam("pageSize");
		int endPage = 1;
		if(pageSize > 0 ){
			endPage = ((totalRowCnt + pageSize - 1) / pageSize);
		}
		this.setParam(Contraints.END_PAGE,endPage);
		this.setParam(Contraints.TOTAL_ROW_CNT, totalRowCnt);
	}
	public int getTotalCount(){
		return getIntParam(Contraints.TOTAL_ROW_CNT);
	}
	@Override
	public boolean isPageable() {
		if(getBoolean("pageable")){
			return true;
		}else{
			return this.pageable;
		}
	}
	@Override
	public boolean isOracle() {
		if(getBoolean("oracleDb")){
			return true;
		}else{
			return this.oracleDb;
		}
	}
	@Override
	public boolean isCountable() {
		if(getBoolean("countable")){
			return true;
		}else{
			return this.countable;
		}
	}
	@Override
	public void setPageable(boolean pageable) {
		this.pageable = pageable;
		this.fileable = false;

	}
	@Override
	public void setOracle(boolean oracleDb) {
		this.oracleDb = oracleDb;
	}
	@Override
	public boolean isFileable() {
		if(getBoolean("fileable")){
			return true;
		}else{
			return this.fileable;
		}
	}
	@Override
	public void setFileable(boolean fileable) {
		this.pageable = false;
		this.fileable = fileable;
	}
	@Override
	public void setParam(String key, Object value) {
		this.put(key, value);
	}
	@Override
	public Object getParam(String key) {
		return this.get(key);
	}
	@Override
	public int getIntParam(String key) {
		try {
			if(this.get(key)!= null && !this.get(key).equals("")){
				return Integer.parseInt(this.get(key).toString());
			}
		} catch (Exception e) {
			return 0;
		}
		return 0;
	}
	@Override
	public String getStrParam(String key) {
		try {
			if(this.get(key)!= null){
				return String.valueOf(this.get(key));
			}
		} catch (Exception e) {
			return null;
		}
		return null;
	}
	@Override
	public int getInteger(String key) {
		try {
			if(this.get(key)!= null && !this.get(key).equals("")){
				return Integer.parseInt(this.get(key).toString());
			}
		} catch (Exception e) {
			return 0;
		}
		return 0;
	}
	@Override
	public String getString(String key) {
		try {
			if(this.get(key)!= null){
				return String.valueOf(this.get(key));
			}
		} catch (Exception e) {
			return null;
		}
		return null;
	}
	@Override
	public boolean getBoolean(String key) {
		try {
			if(this.get(key)!= null && !this.get(key).equals("")){
				return Boolean.parseBoolean(this.get(key).toString());
			}
		} catch (Exception e) {
			return false;
		}
		return false;
	}

	@Override
	public Long getLong(String key) {
		try {
			if(this.get(key)!= null && !this.get(key).equals("")){
				return Long.parseLong(this.get(key).toString());
			}
		} catch (Exception e) {
			return 0l;
		}
		return 0l;
	}
	@Override
	public float getFloat(String key) {
		try {
			if(this.get(key)!= null && !this.get(key).equals("")){
				return Float.parseFloat(this.get(key).toString());
			}
		} catch (Exception e) {
			return 0f;
		}
		return 0f;
	}

	@Override
	public void setDataTable(String key, DataTable value) {
		this.setParam(key, value);
	}
	@Override
	public void setDataTable(DataTable value) {
		this.setParam(Contraints.DATA_TABLE, value);
	}
	@Override
	public DataTable getDataTable(String key) {
		return (DataTable) getParam(key);
	}
	@Override
	public DataTable getDataTable() {
		return (DataTable) getParam(Contraints.DATA_TABLE);
	}
	@Override
	public void setStsCd(int value) {
		this.setParam(Contraints.STS_CD, value);
	}
	@Override
	public String getStsCd() {
		return String.valueOf(getParam(Contraints.STS_CD));
	}
	@Override
	public void setErrCd(int value) {
		this.setParam("errCd", value);
	}
	@Override
	public String getErrCd() {
		return String.valueOf(getParam("errCd"));
	}
	@Override
	public void setMsgCd(String errCd) {
		this.setParam(Contraints.MSG_CD, errCd);
//		this.setParam(Contraints.MSG_TXT, NoticeMessageUtil.getMessage(errCd));
	}
	@Override
	public void setMsgCd(String errCd, Object[] msgValues) {
		this.setParam(Contraints.ERR_CD, 0);
		this.setParam(Contraints.MSG_CD, errCd);
//		this.setParam(Contraints.MSG_TXT, NoticeMessageUtil.getMessage(errCd,msgValues, this.locale));
	}

	@Override
	public void setMsgCd(String value, String[] args) {
		this.setParam(Contraints.ERR_CD, 0);
//		WMS 수정
		String lang = "KO";
		if(lang == null || lang == "null" || lang == "") {
			lang = "en";
		}

		setMsgLangCd(lang, value, args);
//		WMS 수정 끝
	}

	@Override
	public void setMsgLangCd(String lang, String errCd) {
		this.setParam(Contraints.MSG_CD, errCd);

			DataTable dt = MessageLoadUtil.getMessageLoadUtil();

			DataRow dr = new CommDataRow();
			for(int i = 0; i < dt.size(); i++){
				String listMsgCd = dt.get(i).getString("MSG_CD");
				if(errCd.equals(listMsgCd)){
					dr = dt.get(i);
					break;
				}
			}

	       String MSG_TXT = dr.getString(lang.toUpperCase());
	       if(MSG_TXT == null || MSG_TXT == "null" || MSG_TXT == "") {
	    	   MSG_TXT = dr.getString("KO");
	       }
	       if(MSG_TXT == null || MSG_TXT == "null" || MSG_TXT == "") {
	    	   MSG_TXT = dr.getString("EN");
	       }
	       this.setParam(Contraints.MSG_TXT, MSG_TXT);
	}


//	불필요
	@Override
	public void setMsgLangCd(String lang, String errCd, Object[] args) {
		this.setParam(Contraints.MSG_CD, errCd);
//		this.setParam(Contraints.MSG_TXT, NoticeMessageUtil.getMessage(errCd, args));
	}

	@Override
	public void setMsgLangCd(String lang, String errCd, String[] args) {
		this.setParam(Contraints.MSG_CD, errCd);
//	[TODO]XML 읽는 소스. 주석. 다른 곳 활용예정
//        WebApplicationContext context = ContextLoader.getCurrentWebApplicationContext();
//        MessageLoadUtil mlu = (MessageLoadUtil)context.getBean("MessageUtil");


        	DataTable dt = MessageLoadUtil.getMessageLoadUtil();
        	DataRow dr = new CommDataRow();
        	for(int i = 0; i < dt.size(); i++){
        		String listMsgCd = dt.get(i).getString("MSG_CD");
        		if(errCd.equals(listMsgCd)){
        			dr = dt.get(i);
        			break;
        		}
        	}

        	int strCnt = 0;
        	String MSG_TXT = dr.getString(lang.toUpperCase());
        	if(MSG_TXT == null || MSG_TXT == "null" || MSG_TXT == "") {
    	   		MSG_TXT = dr.getString("KO");
       		}
        	if(MSG_TXT == null || MSG_TXT == "null" || MSG_TXT == "") {
    	   		MSG_TXT = dr.getString("EN");
       		}

        	for(String str : args){
        		String arr = "{" + strCnt + "}";
        		MSG_TXT = MSG_TXT.replace(arr, str.toString());

        	}

       		this.setParam(Contraints.MSG_TXT, MSG_TXT);
		}

	@Override
	public String getMsgCd() {
		return String.valueOf(getParam(Contraints.MSG_CD));
	}
	@Override
	public void setMsgTxt(String value) {
		this.setParam(Contraints.MSG_TXT, value);
	}
	@Override
	public String getMsgTxt() {
		return String.valueOf(getParam(Contraints.MSG_TXT));
	}
	@Override
	public void setRtnUri(String value) {
		this.setParam(Contraints.RTN_URI, value);
	}
	@Override
	public String getRtnUri() {
		return String.valueOf(getParam(Contraints.RTN_URI));
	}
	public void setLocale(Locale locale) {
		this.locale = locale;
	}
	public Locale getLocale() {
		return this.locale ;
	}
	@Override
	public void setLanguage(String value) {
		this.setParam("language", value);
	}
	@Override
	public String getLanguage() {
		return String.valueOf(getParam("language"));
	}
	@Override
	@SuppressWarnings("unchecked")
	public List<String> getStrListParam(String key){
		Object obj = getParam(key);
		if (obj instanceof List){
			return (ArrayList<String>) get(key);
		}else{
			return null;
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<String> getStringList(String key){
		Object obj = getParam(key);
		if (obj instanceof List){
			return (ArrayList<String>) get(key);
		}else{
			return null;
		}
	}
}
