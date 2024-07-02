package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.com.sy.service.EtcService;
import nlms.framework.util.ObjectUtil;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("nongshimService")
public class NongshimService {

	@Resource(name = "nongshimDao")
	private NongshimDao nongshimDao;

	@Resource(name = "stokService")
	private StokService stokService;

	@Resource(name = "etcService")
	private EtcService etcService;

	/**
	 * 3D 창고현황, Viewer LOC 조회
	 * 초기 로케이션 및 재고 조회
	 * 
	 * @param map
	 */
	public List<EgovMap> selectLocxStokFor3DList(Map<String, Object> map) {
		
		// 최초로딩 시 작업중이던 재고 정리
		nongshimDao.cleanInspQty(map);
		nongshimDao.cleanAllcQty(map);
		nongshimDao.cleanY1011(map);
		
		return nongshimDao.selectLocxStokFor3DList(map);
	}

	/**
	 * 입고완료
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> procRcptComptForSimulated(Map<String, Object> map) {
		
		// 입고완료 대상조회
		List<EgovMap> rcptDtMapList = nongshimDao.selectMinStokForSimulatedRcpt(map);
		
		// LOT 부여
		rcptDtMapList.get(0).put("mfrde", "99991231");
		rcptDtMapList.get(0).put("vldde", "99991231");
		rcptDtMapList.get(0).put("mtrde", "99991231");
		
		//rcptDtMapList.get(0).put("lot", stokService.saveLot(rcptDtMapList.get(0), "DE"));

		/** 시퀀스사용으로 대체
		//채번 및 ID 부여 Map
		Map<String, Object> cntMap = new HashMap<String, Object>();
		cntMap.put("client", (String) rcptDtMapList.get(0).get("client"));
		cntMap.put("dc", (String) rcptDtMapList.get(0).get("dc"));
		cntMap.put("biz", (String) rcptDtMapList.get(0).get("biz"));
		cntMap.put("cntde", (String) rcptDtMapList.get(0).get("rcptde"));
		cntMap.put("cnttp3", "*");
		cntMap.put("cnttp1", "ST_PLT");
		cntMap.put("cnttp2", "PLTID");
		
		// PLTID 부여
		rcptDtMapList.get(0).put("pltid", etcService.saveCnt(cntMap));
		*/
		
		rcptDtMapList.get(0).put("qty", new BigDecimal(640));
		rcptDtMapList.get(0).put("stokinspqtysgn", 1);		// (STOK)검수량증가
		rcptDtMapList.get(0).put("stokstokqtysgn", 1);		// (STOK)재고량증가

		// 권장위치 조회
		List<EgovMap> locMapList = null;
		
		if( "flow_rack".equals(map.get("type")) ){
			locMapList = nongshimDao.selectRcmdLocListForFlowRack(rcptDtMapList.get(0));
			
		} else {
			locMapList = nongshimDao.selectRcmdLocListForHighRack(rcptDtMapList.get(0));
		}

		// 권장위치가 없으면 생산안됨
		if(ObjectUtil.isNotNull(locMapList)) {
			// 재고는 검수량과 함깨 권장로케이션으로 생성
			// 재고가 Rack 진입 시 검수량 감소
			rcptDtMapList.get(0).put("loc", locMapList.get(0).get("loc"));
			
			stokService.saveStok(rcptDtMapList.get(0));
			
			rcptDtMapList.get(0).put("rcmdzone", locMapList.get(0).get("zone"));
			rcptDtMapList.get(0).put("rcmdloc", locMapList.get(0).get("loc"));
			// 화면에는 입고대로 반환
			rcptDtMapList.get(0).put("loc", "X1011");	// 입고대
		}

		return rcptDtMapList;
	}

	/**
	 * 출고지시
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> procOderComptForSimulated(Map<String, Object> map) {
		
		// 출고완료 대상조회
		List<EgovMap> oderDtMapList = nongshimDao.selectMaxStokForSimulatedOder(map);

		// 잔여재고가 있을 경우 실행
		if(ObjectUtil.isNotNull(oderDtMapList)) {
			
			List<EgovMap> stokMapList = null;
			
			// 권장재고 조회
			if( "flow_rack".equals(map.get("type")) ){
				stokMapList = nongshimDao.selectRcmdStokListForFlowRack(oderDtMapList.get(0));

				// 권장재고가 없으면 출고안됨, Flow Rack 는 할당안함
				if(ObjectUtil.isNotNull(stokMapList)) {
					
					for(int i=0 ; i<stokMapList.size() ; i++) {
						stokMapList.get(i).put("skunm", oderDtMapList.get(0).get("skunm"));
						
						// 임의할당
						nongshimDao.updateStokAllc(stokMapList.get(i));
					}
					
					return stokMapList;
				}
				
			} else {
				stokMapList = nongshimDao.selectRcmdStokListForHighRack(oderDtMapList.get(0));
				
				// 권장재고가 없으면 출고안됨
				if(ObjectUtil.isNotNull(stokMapList)) {
					
					stokMapList.get(0).put("skunm", oderDtMapList.get(0).get("skunm"));
					// 임의할당
					nongshimDao.updateStokAllc(stokMapList.get(0));
					
					return stokMapList;
				}
			}
		}
		
		return oderDtMapList;
	}
}