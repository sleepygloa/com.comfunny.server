package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.framework.Const;
import nlms.framework.exception.BizException;
import nlms.framework.util.ObjectUtil;
import nlms.wms.st.service.StokService;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("pickService")
public class PickService {

	@Resource(name = "allcDao")
	private AllcDao allcDao;
	
	@Resource(name = "pickDao")
	private PickDao pickDao;

	@Resource(name = "oderDao")
	private OderDao oderDao;

	@Resource(name = "stokService")
	private StokService stokService;
	
	/************************************************************************************
	 * 깨끗한나라 - 피킹완료 S13-13
	 * 
	 * @param map 
	 */
	public void excPickCompt(Map<String, Object> map) {
		System.out.println("@@@ PickService - excPickCompt - 피킹완료 @@@@@@@@@@@@@@@@@");


//		map.put("putwloc", map.get("toloc"));
//		map.put("putwstat", "50");	//작업완료

		//적치위치 수정
//		rcptDao.updateRcptAsgnPutwLoc(map);
//		//적치상태 수정
//		rcptDao.updateRcptAsgnPutwStat(map);		
}



	/*************************************************************************************************
	 * 피킹(PC, 일괄)완료 - 전표단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * PC 에서 전표단위로 처리할 때 사용
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procPickCompt(Map<String, Object> map) {

		// 피킹완료 대상조회
		List<EgovMap> oderDtMapList = pickDao.selectOderDtForPickComptList(map);

		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){
			
			BigDecimal allcQty = (BigDecimal) oderDtMapList.get(i).get("allcqty");	// (DT)할당량

			oderDtMapList.get(i).put("frasgnstat", "10");	// 할당완료
			List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(i));

			if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
			
			for(int j=0 ; j<oderAsgnMapList.size() ; j++){
				
				//출고배정(OD_ODERASGN) 수정
				BigDecimal asgnAllcQty = (BigDecimal) oderAsgnMapList.get(j).get("allcqty");	// (ASGN)할당량
				
				oderAsgnMapList.get(j).put("qty", asgnAllcQty);
				oderAsgnMapList.get(j).put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
				oderAsgnMapList.get(j).put("toasgnstat", "20");		// 피킹완료
				oderDao.updateOderAsgnxStg(oderAsgnMapList.get(j));
				
				//재고처리
				oderAsgnMapList.get(j).put("stokallcqtysgn", -1);	// (STOK)할당량감소
				oderAsgnMapList.get(j).put("stokpickqtysgn", 1);	// (STOK)피킹량증가
				stokService.saveStok(oderAsgnMapList.get(j));
			}
			
			// 입고품목정보수정
			oderDtMapList.get(i).put("qty", allcQty);
			oderDtMapList.get(i).put("pickqtysgn", 1);	// (DT)피킹량증가
			oderDtMapList.get(i).put("tostat", "20");	// 피킹완료
			oderDao.updateOderDtxStg(oderDtMapList.get(i));
		}

		oderDao.updateOderHdStat(oderDtMapList.get(0));
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}

	/*************************************************************************************************
	 * 피킹(직접)완료 - 품목단위처리
	 * 
	 * 할당과정(권장재고산출) 없이 재고를 직접선택하여 재고정보를 기반으로 배정 생성
	 * 피킹지시서에는 재고정보(LOT, PLTID, CASEID, EAID, LOC 등)가 나오지 않도 품목과 수량만 표시
	 * 품목의 재고ID 관리를 별도로 하지 않고 작업자의 판단으로 피킹가능한 곳에서 사용
	 * 또는 PC 에서 현물피킹 후 후처리 용도로 사용
	 * 기본적으로 초과피킹가능
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procPickComptForDirc(List<Map<String, Object>> mapList) {

		// 피킹완료 대상조회
		mapList.get(0).put("dirc", "Y");
		List<EgovMap> oderDtMapList = pickDao.selectOderDtForPickComptList(mapList.get(0));
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		EgovMap oderDtMap = oderDtMapList.get(0);
		
		BigDecimal allcQty = (BigDecimal) oderDtMap.get("allcqty");		// (DT)할당량
		BigDecimal pickingQty = BigDecimal.ZERO;
		
		// 재고정보를 기반으로 배정생성
		for(int i=0 ; i<mapList.size() ; i++){
			
			BigDecimal scanStokQty = new BigDecimal((String) mapList.get(i).get("pickqty"));		// 스캔재고량
			pickingQty = pickingQty.add(scanStokQty);
			
			// 출고배정(OD_ODERASGN) 생성
			mapList.get(i).put("qty", scanStokQty);
			mapList.get(i).put("asgnallcqtysgn", 1);	// (ASGN)할당량증가
			mapList.get(i).put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
			mapList.get(i).put("toasgnstat", "20");		// 피킹완료
			oderDao.insertOderAsgnxStg(mapList.get(i));
			
			//재고처리
			mapList.get(i).put("stokpickqtysgn", 1);	// (STOK)피킹량증가
			stokService.saveStok(mapList.get(i));
		}

		// 입고품목정보수정
		oderDtMap.put("qty", pickingQty);
		oderDtMap.put("allcqtysgn", 1);	// (DT)할당량증가
		oderDtMap.put("pickqtysgn", 1);	// (DT)피킹량증가

		// 스캔한 피킹량이 할당량보다 작을경우 피킹중
		if(allcQty.subtract(pickingQty).compareTo(BigDecimal.ZERO) > 0) {
			oderDtMap.put("tostat", "25");	// 피킹중
		} else {
			oderDtMap.put("tostat", "20");	// 피킹완료
		}
		
		oderDao.updateOderDtxStg(oderDtMap);

		oderDao.updateOderHdStat(oderDtMap);

		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/*************************************************************************************************
	 * (PDA) 피킹(할당)완료 - 품목단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * 권장재고 대로만 피킹해야하는 곳에서 사용
	 * PDA 에서 재고 스캔 시 할당한 재고가 맞는지 검증필요
	 * 기본적으로 초과피킹불가
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procPickComptForAllc(Map<String, Object> map) {

		// 피킹완료 대상조회
		List<EgovMap> oderDtMapList = pickDao.selectOderDtForPickComptList(map);

		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		EgovMap oderDtMap = oderDtMapList.get(0);
		BigDecimal allcQty = (BigDecimal) oderDtMap.get("allcqty");					// (DT)할당량
		BigDecimal scanStokQty = new BigDecimal((String) map.get("pickqty"));		// 스캔재고량

		map.put("frasgnstat", "10");	// 할당완료
		List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(map);

		if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
		
		EgovMap oderAsgnMap = oderAsgnMapList.get(0);
		
		//출고배정(OD_ODERASGN) 수정
		oderAsgnMap.put("qty", scanStokQty);
		oderAsgnMap.put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
		oderAsgnMap.put("toasgnstat", "20");		// 피킹완료
		oderDao.updateOderAsgnxStg(oderAsgnMap);
		
		//재고처리
		oderAsgnMap.put("stokallcqtysgn", -1);	// (STOK)할당량감소
		oderAsgnMap.put("stokpickqtysgn", 1);	// (STOK)피킹량증가
		stokService.saveStok(oderAsgnMap);
		
		// 입고품목정보수정
		oderDtMap.put("qty", scanStokQty);
		oderDtMap.put("pickqtysgn", 1);	// (DT)피킹량증가

		// 스캔한 피킹량이 할당량보다 작을경우 피킹중
		if(allcQty.subtract(scanStokQty).compareTo(BigDecimal.ZERO) > 0) {
			oderDtMap.put("tostat", "25");	// 피킹중
		} else {
			oderDtMap.put("tostat", "20");	// 피킹완료
		}
		
		oderDao.updateOderDtxStg(oderDtMap);

		oderDao.updateOderHdStat(oderDtMap);

		return "MSG001";	//정상적으로 처리되었습니다.
	}

	/*************************************************************************************************
	 * (PDA) 피킹(대체)완료 - 품목단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 배정을 생성하되 피킹 시 다른 재고를 피킬 할 수 있는 경우 사용
	 * 품목의 재고ID 관리를 하긴 하되 현장에서 유연하게 피킹하는 곳에서 사용
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procPickComptForReplc(Map<String, Object> map) {

		// 피킹완료 대상조회
		List<EgovMap> oderDtMapList = pickDao.selectOderDtForPickComptList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		EgovMap oderDtMap = oderDtMapList.get(0);
		BigDecimal allcQty = (BigDecimal) oderDtMap.get("allcqty");					// (DT)할당량
		BigDecimal scanStokQty = new BigDecimal((String) map.get("pickqty"));		// 스캔재고량
		BigDecimal pickingQty = scanStokQty;
		
		map.put("frasgnstat", "10");	// 할당완료
		List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(map);

		if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
		
		for(int j=0 ; j<oderAsgnMapList.size() && pickingQty.compareTo(BigDecimal.ZERO)>0 ; j++){
			
			BigDecimal asgnAllcQty = (BigDecimal) oderAsgnMapList.get(j).get("allcqty");	// (ASGN)할당량
			
			//출고배정(OD_ODERASGN) 수정
			if(pickingQty.compareTo(asgnAllcQty) > 0){	
				oderAsgnMapList.get(j).put("qty", asgnAllcQty);
				map.put("qty", asgnAllcQty);
				pickingQty = pickingQty.subtract(asgnAllcQty);
				
			} else {
				oderAsgnMapList.get(j).put("qty", pickingQty);
				map.put("qty", pickingQty);
				pickingQty = BigDecimal.ZERO;
			}
			
			// 피킹대체시 기존배정할당취소
			pickDao.updateOderAsgnForAllcCncl(oderAsgnMapList.get(j));
			
			//재고처리
			oderAsgnMapList.get(j).put("stokallcqtysgn", -1);	// (STOK)할당량감소
			stokService.saveStok(oderAsgnMapList.get(j));
			
			// 출고배정(OD_ODERASGN) 생성
			map.put("asgnallcqtysgn", 1);	// (ASGN)할당량증가
			map.put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
			map.put("toasgnstat", "20");		// 피킹완료
			oderDao.insertOderAsgnxStg(map);
			
			//재고처리
			map.put("stokpickqtysgn", 1);	// (STOK)피킹량증가
			stokService.saveStok(map);
		}
		
		// 스캔한 재고의 총 수량이 할당량을 초과 (1차적으로 화면에서 제약필요)
		if(pickingQty.compareTo(BigDecimal.ZERO) > 0) {
			// 초과피킹을 허용한다면 남은 재고량만큼 배정생성
			if(Const.EXCESS_PICK) {
				// 출고배정(OD_ODERASGN) 생성
				map.put("qty", pickingQty);
				map.put("asgnallcqtysgn", 1);	// (ASGN)할당량증가
				map.put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
				map.put("toasgnstat", "20");		// 피킹완료
				oderDao.insertOderAsgnxStg(map);
				
				//재고처리
				map.put("stokpickqtysgn", 1);	// (STOK)피킹량증가
				stokService.saveStok(map);
			} else {
				throw new BizException("MSG620"); // 기준수량을 초과하여 피킹하였습니다.
			}
		}
		
		// 입고품목정보수정
		oderDtMap.put("qty", scanStokQty);
		oderDtMap.put("pickqtysgn", 1);	// (DT)피킹량증가

		// 스캔한 피킹량이 할당량보다 작을경우 피킹중
		if(allcQty.subtract(scanStokQty).compareTo(BigDecimal.ZERO) > 0) {
			oderDtMap.put("tostat", "25");	// 피킹중
		} else {
			oderDtMap.put("tostat", "20");	// 피킹완료
		}
		
		oderDao.updateOderDtxStg(oderDtMap);

		oderDao.updateOderHdStat(oderDtMap);

		return "MSG001";	//정상적으로 처리되었습니다.
	}

	/**
	 * (PDA) 피킹(대체)완료 - 품목단위처리 - 다건재고 동시처리
	 * 
	 * @param map
	 */
	public String procMultiPickComptForReplc(List<Map<String, Object>> mapList) {

		String resultMsg = "";
		
		for(int i=0 ; i<mapList.size() ; i++){
			// 피킹(대체)완료
			resultMsg = procPickComptForReplc(mapList.get(i));
		}
		
		return resultMsg;
	}
	
	/*************************************************************************************************
	 * 피킹취소
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procPickCncl(Map<String, Object> map) {

		// 피킹취소 대상조회
		List<EgovMap> oderDtMapList = pickDao.selectOderDtForPickCnclList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){
			
			BigDecimal allcQty = (BigDecimal) oderDtMapList.get(i).get("allcqty");	// (DT)피킹량
			BigDecimal pickQty = (BigDecimal) oderDtMapList.get(i).get("pickqty");	// (DT)피킹량
			
			oderDtMapList.get(i).put("frasgnstat", "20");	// 피킹완료
			List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(i));

			if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
			
			for(int j=0 ; j<oderAsgnMapList.size() ; j++){

				BigDecimal asgnPickQty = (BigDecimal) oderAsgnMapList.get(j).get("pickqty");	// (DT)피킹량
				
				//출고배정(OD_ODERASGN) 수정
				oderAsgnMapList.get(j).put("qty", asgnPickQty);
				oderAsgnMapList.get(j).put("toasgnstat", "99");		// 출고예정
				oderDao.updateOderAsgnxStg(oderAsgnMapList.get(j));
				
				//재고처리
				oderAsgnMapList.get(j).put("stokpickqtysgn", -1);	// (STOK)피킹량감소
				stokService.saveStok(oderAsgnMapList.get(j));
			}
			
			// 출고품목(OD_ODERDT) 수정
			oderDtMapList.get(i).put("qty", pickQty);
			oderDtMapList.get(i).put("allcqtysgn", -1);	// (DT)할당량감소
			oderDtMapList.get(i).put("pickqtysgn", -1);	// (DT)피킹량감소
			
			if(allcQty.compareTo(pickQty) > 0) {
				oderDtMapList.get(i).put("tostat", "15");	// 할당중
			} else {
				oderDtMapList.get(i).put("tostat", "01");	// 출고예정
			}

			oderDao.updateOderDtxStg(oderDtMapList.get(i));
		}

		oderDao.updateOderHdStat(oderDtMapList.get(0));
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}
}