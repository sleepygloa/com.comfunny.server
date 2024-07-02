package com.comfunny.server.proj.ib.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.framework.util.ObjectUtil;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("ibService")
public class IbService {

	@Resource(name = "ibDao")
	private IbDao ibDao;

	/*******************************************************************************
	 * 깨끗한나라 - 수불 생성
	 * @param map
	 * @exception Exception
	 */
	public void saveIbDe(Map<String, Object> map) {
		
		EgovMap ibDeMap = ibDao.selectIb(map);
		
		if (!ObjectUtil.isNotNull(ibDeMap)){
			// 기초재고량(BSESTOKQTY), 기초재고중량, 기초재고량(EXTCOL01) 조회
			EgovMap bsestokData = ibDao.selectBsestokqty(map);
			if(ObjectUtil.isNotNull(bsestokData)){
				map.put("bsestokqty", bsestokData.get("bsestokqty"));
				map.put("bsestokwt", bsestokData.get("bsestokwt"));
				map.put("extcol01", bsestokData.get("extcol01"));				
			}
			ibDao.insertIbDe(map);
			} else {
			//ibDao.updateIbDe(map);
		}		
		//ibDao.updateIbDeAfterDateAll(map);
	}
}