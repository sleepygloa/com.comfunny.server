package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.framework.util.ObjectUtil;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("stokService")
public class StokService {

	@Resource(name = "stokDao")
	private StokDao stokDao;

	/*********************************************************************************************
	 * 깨끗한나라 - 재고생성
	 * 
	 * @param map
	 */
	public void saveStok( Map<String, Object> map) {

		BigDecimal rcptQty = (BigDecimal) map.get("rcptqty");
		
		if(rcptQty.compareTo(BigDecimal.ZERO) > 0) {
			
			EgovMap stokMap = stokDao.selectStok(map);
			
			if(!ObjectUtil.isNotNull(stokMap)) {
				stokDao.insertStok(map);			
			}else {
				stokDao.updateStok(map);
			}
		}
	}
	
	/*********************************************************************************************
	 * 깨끗한나라 - LOT 생성
	 * 
	 * @param map
	 */
	public void saveLot(Map<String, Object> map) {

		EgovMap lotMap = stokDao.selectLot(map);
		
		if(!ObjectUtil.isNotNull(lotMap)) {
			stokDao.insertLot(map);
		}else {
			stokDao.updateLot(map);
		}
	}
	/*********************************************************************************************
	 * 깨끗한나라 - EA 생성
	 * 
	 * @param map
	 */
	public void saveEa(Map<String, Object> map) {

		EgovMap eaMap = stokDao.selectEa(map);
		if(!ObjectUtil.isNotNull(eaMap)) {
			stokDao.insertEa(map);			
		}else {
			stokDao.updateEa(map);
		}
	}
	
	
	/*********************************************************************************************
	 * 깨끗한나라 - 재고 생성(재고이동에의한)
	 * 
	 * @param map
	 */
	public void saveMvStok( Map<String, Object> map) {

			
		EgovMap stokMap = stokDao.selectStok(map);
		
		if(!ObjectUtil.isNotNull(stokMap)) {
			stokDao.insertStokxStg(map);			
		}else {
			stokDao.updateStokxStg(map);
		}
	}
}