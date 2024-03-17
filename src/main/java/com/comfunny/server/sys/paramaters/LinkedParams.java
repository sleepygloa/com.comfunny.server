package com.comfunny.server.sys.paramaters;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import com.comfunny.server.sys.config.Contraints;
import com.comfunny.server.sys.paramaters.datatable.CommDataTable;
import com.comfunny.server.sys.paramaters.datatable.DataTable;
import com.comfunny.server.sys.paramaters.datatable.datarow.DataRow;
import com.comfunny.server.sys.util.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
public class LinkedParams extends BaseParams implements Params, Comparator<DataRow> {
	private static final long serialVersionUID = 1L;
	
	private static final Log LOG = LogFactory.getLog(LinkedParams.class);
	static private final String _LEVEL_ = "LEVEL";
	static private final String _DEFAULT_ORDER_ = "ROW_ORDER";
	
	static private final String _ISLEAF_ = "ISLEAF";
	static private final String _CHILE_COUNT_ = "CHILE_CNT";
	private String _CUSTOM_KEY_ = "ROW_KEY";
	private String _CUSTOM_PARENT_KEY_ = "ROW_PARENT_KEY";
	private String _CUSTOM_ORDER_ = "ROW_ORDER";
	private String _CUSTOM_ORDER_KEY_ = "LINKED_ORDER";
	
	private String _TARGET_DATATABLE_ = null;
	private Boolean _SORT_ASC_DESC_ = true;
	private String _SORT_COLUNM_ = null;

	public LinkedParams() {
		super();
	}

	public LinkedParams(Params p) {
		super.putAll(p);
		createLevel();
	}
	public LinkedParams(Params p,String customParentKey, String customKey, String customOrder) {
		super.putAll(p);
		this._CUSTOM_PARENT_KEY_ = customParentKey;
		this._CUSTOM_KEY_ = customKey;
		this._CUSTOM_ORDER_ = customOrder;
		createLevel();
	}

	public LinkedParams(Map<String, Object> result) {
		this.putAll(result);
	}

	
	public void setLevelKey(String customParentKey, String customKey) {
		this._CUSTOM_PARENT_KEY_ = customParentKey;
		this._CUSTOM_KEY_ = customKey;
	}
	public void setLevelKey(String customParentKey, String customKey, String customOrder) {
		this._CUSTOM_PARENT_KEY_ = customParentKey;
		this._CUSTOM_KEY_ = customKey;
		this._CUSTOM_ORDER_ = customOrder;
//		this._SORT_COLUNM_ = customOrder;
	}
	public void createLevel() {
		createLevel(Contraints.DATA_TABLE);
	}
	public void createLevel(String dataTableName) { 
		LOG.debug("Create a level data table name : "+ dataTableName);
		this._TARGET_DATATABLE_ = dataTableName;
		
		
		if(_CUSTOM_ORDER_ == null){
			_CUSTOM_ORDER_ = _DEFAULT_ORDER_;
		}
		DataTable targetDataTable =  getDataTable(dataTableName);
		//레벨 체크 맵
		Map<String,Map<String,String>> paramLinkedCheckMap = new HashMap<String,Map<String,String>>();
		try {
			for (Map<String,Object> orimap : targetDataTable) { 
				Map<String,String> map = new HashMap<String, String>();
				String levelkey = orimap.get(_CUSTOM_KEY_).toString();
				if(!paramLinkedCheckMap.containsKey(levelkey)){
					map.put(_CUSTOM_KEY_, levelkey);
					map.put(_CUSTOM_PARENT_KEY_, orimap.get(_CUSTOM_PARENT_KEY_).toString());
					map.put(_LEVEL_, "0");
					map.put(_CHILE_COUNT_, "0");
					map.put(_ISLEAF_, "true");
					if(!_CUSTOM_ORDER_.equals(_DEFAULT_ORDER_)||_CUSTOM_ORDER_.equals("ROW_ORDER")){
						String order = orimap.get(_CUSTOM_ORDER_).toString();
						map.put(_CUSTOM_ORDER_, StringUtils.leftPad(order,5,"0"));
					}else{
						map.put(_CUSTOM_ORDER_, StringUtils.leftPad(levelkey,5,"0"));
					}
					paramLinkedCheckMap.put(levelkey, map);
				}
			}
		} catch (Exception e) {
			LOG.error("키가 존재 하지 않습니다.",e);
		}
		
        

		for (DataRow targetDataRow : targetDataTable) { 
			String originalKey = targetDataRow.getString(_CUSTOM_KEY_); 
			String originalParentKey = targetDataRow.getString(_CUSTOM_PARENT_KEY_);
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
					childOrderValue = targetDataRow.getString(_CUSTOM_ORDER_); 
				}
				myLinkedCheckMap.put(_CUSTOM_ORDER_, paramLinkedCheckMap.get(originalParentKey).get(_CUSTOM_ORDER_)+StringUtils.leftPad(childOrderValue,5,"0"));
				paramLinkedCheckMap.put(originalKey, myLinkedCheckMap); 
			}else{
				//00뎁스
				Map<String,String> firstLevelMap = paramLinkedCheckMap.get(originalKey);
				paramLinkedCheckMap.put(originalKey, firstLevelMap); 
			}
		}
		
        DataTable returnDataTalbe =  new CommDataTable();
		int cnt = 0;
        for (DataRow originalDataRow : targetDataTable) {
        	originalDataRow.put(_LEVEL_, paramLinkedCheckMap.get(originalDataRow.getString(_CUSTOM_KEY_)).get(_LEVEL_));
        	originalDataRow.put(_CUSTOM_ORDER_KEY_, paramLinkedCheckMap.get(originalDataRow.getString(_CUSTOM_KEY_)).get(_CUSTOM_ORDER_));
//        	originalDataRow.put(_CUSTOM_ORDER_, StringUtils.rightPad(paramLinkedCheckMap.get(originalDataRow.getVal(_CUSTOM_KEY_).toString()).get(_CUSTOM_ORDER_),30,"0"));
        	originalDataRow.put(_ISLEAF_, paramLinkedCheckMap.get(originalDataRow.getString(_CUSTOM_KEY_)).get(_ISLEAF_));
        	originalDataRow.put(_CHILE_COUNT_, paramLinkedCheckMap.get(originalDataRow.getString(_CUSTOM_KEY_)).get(_CHILE_COUNT_));
        	originalDataRow.put("expanded", "true");
        	returnDataTalbe.addRow(originalDataRow);
        }
        
        Collections.sort(returnDataTalbe, this);
        if(_TARGET_DATATABLE_ == null){
        	_TARGET_DATATABLE_ = Contraints.DATA_TABLE;
        }

		//rowId 추가

		for (DataRow dr : returnDataTalbe) {
			dr.put("ROW_ID", cnt);
			cnt++;
		}
        
        super.setDataTable(_TARGET_DATATABLE_, returnDataTalbe);
        
	}

	public void setOrderColunm(String colunm) {
		this._CUSTOM_ORDER_ = colunm;
	}
	public void setDesc() {
		this._SORT_COLUNM_ = _CUSTOM_ORDER_;
		this._SORT_ASC_DESC_ = false;
		if(_TARGET_DATATABLE_ != null){
			sortingDataTable();
		}
	}
	public void setDesc(String colunm) {
		this._SORT_COLUNM_ = colunm;
		this._SORT_ASC_DESC_ = false;
		if(_TARGET_DATATABLE_ != null){
			sortingDataTable();
		}
	}
	public void setAsc(String colunm) {
		this._SORT_COLUNM_ = colunm;
		this._SORT_ASC_DESC_ = true;
		if(_TARGET_DATATABLE_ != null){
			sortingDataTable();
		}
	}
	public void setAsc() {
		this._SORT_COLUNM_ = _CUSTOM_ORDER_;
		this._SORT_ASC_DESC_ = true;
		if(_TARGET_DATATABLE_ != null){
			sortingDataTable();
		}
	}
	private void sortingDataTable(){
		DataTable targetDataTalbe =  getDataTable(_TARGET_DATATABLE_);
		Collections.sort(targetDataTalbe, this);
		super.setDataTable(_TARGET_DATATABLE_, targetDataTalbe);
	}
//	@Override
//	public int compare(DataRow first, DataRow last) {
//		if(_SORT_COLUNM_ == null){
//			_SORT_COLUNM_ = _CUSTOM_ORDER_;
//		}
//		if(_SORT_ASC_DESC_){
//			return ((String) first.getVal(_SORT_COLUNM_)).compareTo((String)last.getVal(_SORT_COLUNM_));
//		}else{
//			return ((String) last.getVal(_SORT_COLUNM_)).compareTo((String)first.getVal(_SORT_COLUNM_));
//		}
//	}
	@Override
	public int compare(DataRow first, DataRow last) {
		if(_SORT_COLUNM_ == null){
			_SORT_COLUNM_ = _CUSTOM_ORDER_;
		}
		if(_SORT_COLUNM_.equals(_CUSTOM_ORDER_)){
			_SORT_COLUNM_ = _CUSTOM_ORDER_KEY_;
		}
		int firstOrderInt = 0;
		int LastOrderInt = 0;
		boolean integerFlag = false;
		try {
			firstOrderInt = first.getInteger(_SORT_COLUNM_);
			LastOrderInt = last.getInteger(_SORT_COLUNM_);
		} catch (Exception e) {
			integerFlag = false;
		}
		if(_SORT_ASC_DESC_){
			if(integerFlag){
				return firstOrderInt - LastOrderInt;
			}
			return (first.getString(_SORT_COLUNM_)).compareTo(last.getString(_SORT_COLUNM_));
		}else{
			if(integerFlag){
				return LastOrderInt - firstOrderInt;
			}
			return (last.getString(_SORT_COLUNM_)).compareTo(first.getString(_SORT_COLUNM_));
		}
	}

}
