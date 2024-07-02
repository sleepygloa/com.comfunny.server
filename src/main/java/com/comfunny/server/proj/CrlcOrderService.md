package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.com.sy.service.EtcService;
import nlms.framework.Const;
import nlms.framework.exception.BizException;
import nlms.framework.util.DateUtil;
import nlms.framework.util.ObjectUtil;
import nlms.wms.rc.service.RcptService;
import nlms.wms.st.service.IbService;
import nlms.wms.st.service.StokService;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("crlcOderService")
public class CrlcOderService {

	@Resource(name = "crlcOderDao")
	private CrlcOderDao crlcOderDao;
	
	@Resource(name = "oderDao")
	private OderDao oderDao;

	@Resource(name = "oderService")
	private OderService oderService;
	
	@Resource(name = "allcService")
	private AllcService allcService;

	@Resource(name = "pickService")
	private PickService pickService;
	
	
	@Resource(name = "stokService")
	private StokService stokService;

	@Resource(name = "ibService")
	private IbService ibService;
	
	@Resource(name = "etcService")
	private EtcService etcService;

	@Resource(name = "rcptService")
	private RcptService rcptService;
	

	/*************************************************************************************************
	 * 피킹지시 - 전표단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * PC 에서 전표단위로 처리할 때 사용
	 * 
	 * @param map
	 */
	//피킹 처리 대상 전표 조회
	public List<EgovMap> selectPickInst(Map<String, Object> map){
			// 배차 내 피킹지시 대상 조회 대상조회
			List<EgovMap> oderHdMapList = crlcOderDao.selectOderHdForPickInstList(map);	
			if(!ObjectUtil.isNotNull(oderHdMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		return oderHdMapList;
	}
	//피킹 처리 대상 LOOP
	public String  procPickInst(List<EgovMap> list) {
		
		int totalCnt = 0;
		int successCnt = 0;
		int failCnt = 0;
			
		for(int i=0 ; i<list.size() ; i++){
			try {
				
				Map<String, Object> oderHdMap = list.get(i);
				procPickInstX(oderHdMap);
			
				successCnt++;
			} catch (RuntimeException e) { 
				failCnt++;
//				throw e;
}
}

		totalCnt = successCnt + failCnt;
		
		String resultMsg = "[총 건수 : "+totalCnt+"]\n[성공 : "+successCnt+"\n[실패 : "+failCnt+"]";
		return resultMsg;
	}
	//피킹처리 
	@Transactional
	private void procPickInstX(Map<String, Object> oderHdMap) throws RuntimeException {
		
		// 출고예정항목 할당 처리
		allcService.procAllcCompt(oderHdMap);
		
		//피킹지시
		//procPickInst(oderHdMap);
	}
	
	@SuppressWarnings("unchecked")
	public String procPickInst(Map<String, Object> map) {

		// 배차 내 피킹지시 대상 조회 대상조회
		List<EgovMap> oderHdMapList = crlcOderDao.selectOderHdForPickInstList(map);	
		if(!ObjectUtil.isNotNull(oderHdMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderHdMapList.size() ; i++){
			
			Map<String, Object> oderHdMap = oderHdMapList.get(i);
			

			// 피킹지시 대상 전표 조회
			List<EgovMap> oderDtMapList = crlcOderDao.selectOderDtForPickInstList(oderHdMap);
			if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
			
			for(int j=0 ; j<oderDtMapList.size() ; j++){
				
				BigDecimal allcQty = (BigDecimal) oderDtMapList.get(j).get("allcqty");	// (DT)할당량

				oderDtMapList.get(j).put("frasgnstat", "10");	// 할당완료
				List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(j));

				if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
				
				for(int k=0 ; k<oderAsgnMapList.size() ; k++){
					
					//출고배정(OD_ODERASGN) 수정
					BigDecimal asgnAllcQty = (BigDecimal) oderAsgnMapList.get(k).get("allcqty");	// (ASGN)할당량
					
					oderAsgnMapList.get(k).put("qty", asgnAllcQty);
					oderAsgnMapList.get(k).put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
					oderAsgnMapList.get(k).put("toasgnstat", "21");		// 피킹완료
					oderDao.updateOderAsgnxStg(oderAsgnMapList.get(k));
					
					//재고처리
					oderAsgnMapList.get(k).put("stokallcqtysgn", -1);	// (STOK)할당량감소
					oderAsgnMapList.get(k).put("stokpickqtysgn", 1);	// (STOK)피킹량증가
					stokService.saveStok(oderAsgnMapList.get(k));
				}
				
				// 입고품목정보수정
				oderDtMapList.get(j).put("qty", allcQty);
				oderDtMapList.get(j).put("pickqtysgn", 1);	// (DT)피킹량증가
				oderDtMapList.get(j).put("tostat", "21");	// 피킹완료
				oderDao.updateOderDtxStg(oderDtMapList.get(j));
			}
			oderDao.updateOderHdStat(oderDtMapList.get(0));
		}
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	
	/*************************************************************************************************
	 * 피킹지시취소 - 전표단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * PC 에서 전표단위로 처리할 때 사용
	 * 
	 * @param map
	 */
	//피킹 처리 대상 전표 조회
	public List<EgovMap> selectPickInstCncl(Map<String, Object> map){
			// 배차 내 피킹지시 대상 조회 대상조회
			List<EgovMap> oderHdMapList = crlcOderDao.selectOderHdForPickCnclList(map);	
			if(!ObjectUtil.isNotNull(oderHdMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		return oderHdMapList;
	}
	//피킹 처리 대상 LOOP
	public String  procPickInstCncl(List<EgovMap> list) {
		
		int totalCnt = 0;
		int successCnt = 0;
		int failCnt = 0;
			
		for(int i=0 ; i<list.size() ; i++){
			try {
				
				Map<String, Object> oderHdMap = list.get(i);
				procPickInstCnclX(oderHdMap);
			
				successCnt++;
			} catch (RuntimeException e) { 
				failCnt++;
//				throw e;
}
}

		totalCnt = successCnt + failCnt;
		
		//String resultMsg = "[총 건수 : "+totalCnt+"]\n[성공 : "+successCnt+"\n[실패 : "+failCnt+"]";
		String resultMsg = "MSG628";

		return resultMsg;
	}
	//피킹처리 
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	private void procPickInstCnclX(Map<String, Object> oderHdMap)  {

		//피킹지시
		//procPickInstCncl(oderHdMap);
		
		// 출고예정항목 할당취소 처리
		allcService.procAllcCncl(oderHdMap);
	}
	
	@SuppressWarnings("unchecked")
	public String procPickInstCncl(Map<String, Object> map) {

		// 피킹취소 대상조회
		List<EgovMap> oderDtMapList = crlcOderDao.selectOderDtForPickCnclList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){
			
			BigDecimal allcQty = (BigDecimal) oderDtMapList.get(i).get("allcqty");	// (DT)피킹량
			BigDecimal pickQty = (BigDecimal) oderDtMapList.get(i).get("pickqty");	// (DT)피킹량
			
			oderDtMapList.get(i).put("frasgnstat", "21");	// 피킹완료
			List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(i));

			if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
			
			for(int j=0 ; j<oderAsgnMapList.size() ; j++){

				BigDecimal asgnPickQty = (BigDecimal) oderAsgnMapList.get(j).get("pickqty");	// (DT)피킹량
				
				//출고배정(OD_ODERASGN) 수정
				oderAsgnMapList.get(j).put("qty", asgnPickQty);
				oderAsgnMapList.get(j).put("toasgnstat", "10");		// 출고예정
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
				oderDtMapList.get(i).put("tostat", "10");	// 출고예정
			}

			oderDao.updateOderDtxStg(oderDtMapList.get(i));
		}

		oderDao.updateOderHdStat(oderDtMapList.get(0));
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	/*************************************************************************************************
	 * 피킹완료 - 전표단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * PC 에서 전표단위로 처리할 때 사용
	 * 
	 * @param map
	 */
	//피킹 처리 대상 전표 조회
	public List<EgovMap> selectPickComp(Map<String, Object> map){
			// 배차 내 피킹지시 대상 조회 대상조회
			List<EgovMap> oderHdMapList = crlcOderDao.selectOderHdForPickCompList(map);	
			if(!ObjectUtil.isNotNull(oderHdMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		return oderHdMapList;
	}	
	//피킹 처리 대상 LOOP
	public String  procPickComp(List<EgovMap> list) {
		
		int totalCnt = 0;
		int successCnt = 0;
		int failCnt = 0;
			
		for(int i=0 ; i<list.size() ; i++){
			try {
				
				Map<String, Object> oderHdMap = list.get(i);
				procPickCompX(oderHdMap);
			
				successCnt++;
			} catch (RuntimeException e) { 
				failCnt++;
//				throw e;
}
}

		totalCnt = successCnt + failCnt;
		
		String resultMsg = "[총 건수 : "+totalCnt+"]\n[성공 : "+successCnt+"\n[실패 : "+failCnt+"]";
		return resultMsg;
	}
	//피킹완료
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	private void procPickCompX(Map<String, Object> oderHdMap)  {

		//피킹완료
		//procPickComp(oderHdMap);
		
		pickService.procPickCompt(oderHdMap);
		
	}
	@SuppressWarnings("unchecked")
	public String procPickComp(Map<String, Object> map) {

		// 피킹지시 대상 전표 조회
		List<EgovMap> oderDtMapList = crlcOderDao.selectOderDtForPickCompList(map);
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int j=0 ; j<oderDtMapList.size() ; j++){
			
			BigDecimal allcQty = (BigDecimal) oderDtMapList.get(j).get("allcqty");	// (DT)할당량

			oderDtMapList.get(j).put("frasgnstat", "21");	// 할당완료
			List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(j));

			if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
			
			for(int k=0 ; k<oderAsgnMapList.size() ; k++){
				
				//출고배정(OD_ODERASGN) 수정
				BigDecimal asgnAllcQty = (BigDecimal) oderAsgnMapList.get(k).get("allcqty");	// (ASGN)할당량
				
				oderAsgnMapList.get(k).put("qty", asgnAllcQty);
//				oderAsgnMapList.get(k).put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
oderAsgnMapList.get(k).put("toasgnstat", "20");		// 피킹완료
oderDao.updateOderAsgnxStg(oderAsgnMapList.get(k));

				//재고처리
//				oderAsgnMapList.get(k).put("stokallcqtysgn", -1);	// (STOK)할당량감소
//				oderAsgnMapList.get(k).put("stokpickqtysgn", 1);	// (STOK)피킹량증가
//				stokService.saveStok(oderAsgnMapList.get(k));
}

			// 입고품목정보수정
			oderDtMapList.get(j).put("qty", allcQty);
//			oderDtMapList.get(j).put("pickqtysgn", 1);	// (DT)피킹량증가
oderDtMapList.get(j).put("tostat", "20");	// 피킹완료
oderDao.updateOderDtxStg(oderDtMapList.get(j));
}
oderDao.updateOderHdStat(oderDtMapList.get(0));


		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	
	/*************************************************************************************************
	 * 피킹완료취소 - 전표단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * PC 에서 전표단위로 처리할 때 사용
	 * 
	 * @param map
	 */
	//피킹 처리 대상 전표 조회
	public List<EgovMap> selectPickCompCncl(Map<String, Object> map){
			// 배차 내 피킹지시 대상 조회 대상조회
			List<EgovMap> oderHdMapList = crlcOderDao.selectOderHdForPickCompCnclList(map);	
			if(!ObjectUtil.isNotNull(oderHdMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		return oderHdMapList;
	}	
	//피킹 처리 대상 LOOP
	public String  procPickCompCncl(List<EgovMap> list) {
		
		int totalCnt = 0;
		int successCnt = 0;
		int failCnt = 0;
			
		for(int i=0 ; i<list.size() ; i++){
			try {
				
				Map<String, Object> oderHdMap = list.get(i);
				procPickCompCnclX(oderHdMap);
			
				successCnt++;
			} catch (RuntimeException e) { 
				failCnt++;
//				throw e;
}
}

		totalCnt = successCnt + failCnt;
		
		String resultMsg = "[총 건수 : "+totalCnt+"]\n[성공 : "+successCnt+"\n[실패 : "+failCnt+"]";
		return resultMsg;
	}
	//피킹완료취소
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	private void procPickCompCnclX(Map<String, Object> oderHdMap)  {

		//피킹완료취소
		//procPickCompCncl(oderHdMap);
		
		pickService.procPickCncl(oderHdMap);
		
	}
	@SuppressWarnings("unchecked")
	public String procPickCompCncl(Map<String, Object> map) {

		// 피킹지시 대상 전표 조회
		List<EgovMap> oderDtMapList = crlcOderDao.selectOderDtForPickCompCnclList(map);
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int j=0 ; j<oderDtMapList.size() ; j++){
			
			BigDecimal allcQty = (BigDecimal) oderDtMapList.get(j).get("allcqty");	// (DT)할당량

			oderDtMapList.get(j).put("frasgnstat", "20");	// 할당완료
			List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(j));

			if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
			
			for(int k=0 ; k<oderAsgnMapList.size() ; k++){
				
				//출고배정(OD_ODERASGN) 수정
				BigDecimal asgnAllcQty = (BigDecimal) oderAsgnMapList.get(k).get("allcqty");	// (ASGN)할당량
				
				oderAsgnMapList.get(k).put("qty", asgnAllcQty);
//				oderAsgnMapList.get(k).put("asgnpickqtysgn", 1);	// (ASGN)피킹량증가
oderAsgnMapList.get(k).put("toasgnstat", "21");		// 피킹완료
oderDao.updateOderAsgnxStg(oderAsgnMapList.get(k));

				//재고처리
//				oderAsgnMapList.get(k).put("stokallcqtysgn", -1);	// (STOK)할당량감소
//				oderAsgnMapList.get(k).put("stokpickqtysgn", 1);	// (STOK)피킹량증가
//				stokService.saveStok(oderAsgnMapList.get(k));
}

			// 입고품목정보수정
			oderDtMapList.get(j).put("qty", allcQty);
//			oderDtMapList.get(j).put("pickqtysgn", 1);	// (DT)피킹량증가
oderDtMapList.get(j).put("tostat", "21");	// 피킹완료
oderDao.updateOderDtxStg(oderDtMapList.get(j));
}
oderDao.updateOderHdStat(oderDtMapList.get(0));


		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/*************************************************************************************************
	 * 출고완료 - 전표단위처리
	 * 
	 * 할당과정(권장재고산출)을 통해 생성된 배정정보를 기반으로 피킹완료처리
	 * PC 에서 전표단위로 처리할 때 사용
	 * 
	 * @param map
	 */
	//피킹 처리 대상 전표 조회
	public List<EgovMap> selectOderCompt(Map<String, Object> map){
			// 배차 내 피킹지시 대상 조회 대상조회
			List<EgovMap> oderHdMapList = crlcOderDao.selectOderHdForOderComptList(map);	
			if(!ObjectUtil.isNotNull(oderHdMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		return oderHdMapList;
	}	
	//피킹 처리 대상 LOOP
	public String  procOderCompt(List<EgovMap> list) {
		
		int totalCnt = 0;
		int successCnt = 0;
		int failCnt = 0;
			
		for(int i=0 ; i<list.size() ; i++){
			try {
				
				Map<String, Object> oderHdMap = list.get(i);
				procOderComptX(oderHdMap);
			
				successCnt++;
			} catch (RuntimeException e) { 
				failCnt++;
//				throw e;
}
}

		totalCnt = successCnt + failCnt;
		
		String resultMsg = "[총 건수 : "+totalCnt+"]\n[성공 : "+successCnt+"\n[실패 : "+failCnt+"]";
		return resultMsg;
	}
	//출고완료
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	private void procOderComptX(Map<String, Object> oderHdMap)  {

		//출고완료
//		procOderCompt(oderHdMap);
oderService.procOderCompt(oderHdMap);

	}
	@SuppressWarnings("unchecked")
	public String procOderCompt(Map<String, Object> map) {
		
		// 출고완료 대상조회
		List<EgovMap> oderDtMapList = oderDao.selectOderDtForOderComptList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){

			BigDecimal adjsQty = (BigDecimal) oderDtMapList.get(i).get("adjsqty");	// (DT)조정량
			BigDecimal pickQty = (BigDecimal) oderDtMapList.get(i).get("pickqty");	// (DT)피킹량
			String stat = (String) oderDtMapList.get(i).get("stat");							// (DT)상태
			
			// 품목이 예정상태(01)이면서 조정량이 남아있는 상태는 작업중이라고 판단
			if("01".equals(stat) && adjsQty.compareTo(BigDecimal.ZERO) > 0) {
				throw new BizException("MSG621"); //BizException 출고예정인 품목이 존재합니다. 출고를 원치 않을경우 조정량을 0으로 수정하세요.
			} 
			// 품목이 할당완료(10)이나 할당중(15)인 상태는 작업중이라고 판단
			else if("10".equals(stat) && "15".equals(stat)) {
				throw new BizException("MSG622"); //BizException 할당작업중인 품목이 존재합니다. 출고를 원하지 않을경우 할당취소를 실행하세요.
			} 
			// 정상출고완료처리 - 피킹완료(20), 피킹중(25), 상차완료(30)
			else {
				// 피킹량이 0보다 커야함
				if(pickQty.compareTo(BigDecimal.ZERO) > 0) {
					
					String oderTp = oderDtMapList.get(i).get("odertp").toString();
					if(oderTp.equals("O71") || oderTp.equals("O72") || oderTp.equals("O73")) {
						oderDtMapList.get(i).put("frasgnstat", "20");	// 소분,세트조립&해체 출고시 피킹완료 상태만
					}else {
						oderDtMapList.get(i).put("frasgnstat", "20");	// 소분,세트조립&해체 출고시 피킹완료 상태만
//						oderDtMapList.get(i).put("frasgnstat", Const.ODER_FRASGNSTAT);	// 피킹완료 또는 상차완료
}

					List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(i));
					
					if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
					
					for(int j=0 ; j<oderAsgnMapList.size() ; j++){
	
						//출고배정(OD_ODERASGN) 수정
						BigDecimal asgnPickQty = (BigDecimal) oderAsgnMapList.get(j).get("pickqty");	// (ASGN)피킹량
						
						oderAsgnMapList.get(j).put("qty", asgnPickQty);
						oderAsgnMapList.get(j).put("asgnoderqtysgn", 1);	// (ASGN)출고량증가
						oderAsgnMapList.get(j).put("toasgnstat", "50");		// 출고완료
						oderDao.updateOderAsgnxStg(oderAsgnMapList.get(j));
						
						//재고처리
						oderAsgnMapList.get(j).put("stokstokqtysgn", -1);	// (STOK)재고량감소
						oderAsgnMapList.get(j).put("stokpickqtysgn", -1);	// (STOK)피킹량감소
						oderAsgnMapList.get(j).put("stokoderqtysgn", 1);	// (STOK)출고량증가
						stokService.saveStok(oderAsgnMapList.get(j));
					}
				}
			}

			// 출고품목(OD_ODERDT) 수정
			oderDtMapList.get(i).put("qty", pickQty);
			oderDtMapList.get(i).put("oderqtysgn", 1);	// (DT)출고량증가
			oderDtMapList.get(i).put("tostat", "50");	// 출고완료
			oderDao.updateOderDtxStg(oderDtMapList.get(i));
				
			// 피킹량이 0보다 커야함
			if(pickQty.compareTo(BigDecimal.ZERO) > 0) {
				// 출고수불
				oderDtMapList.get(i).put("ibde", 	DateUtil.getNowDate());
				oderDtMapList.get(i).put("cust", 	oderDtMapList.get(i).get("socust"));
				oderDtMapList.get(i).put("custtp", 	oderDtMapList.get(i).get("socusttp"));
				oderDtMapList.get(i).put("dutyty", 	"ODER");
				oderDtMapList.get(i).put("dutycd", 	oderDtMapList.get(i).get("odertp"));
				oderDtMapList.get(i).put("reftp",   "OD_ODERHD");		
				oderDtMapList.get(i).put("refval1", oderDtMapList.get(i).get("oderno"));	// 참조1(전표번호)
				oderDtMapList.get(i).put("refval2", oderDtMapList.get(i).get("odersn"));	// 참조2(전표순번)
				oderDtMapList.get(i).put("rcptqty", BigDecimal.ZERO);
				oderDtMapList.get(i).put("oderqty", oderDtMapList.get(i).get("qty"));
				oderDtMapList.get(i).put("adjsqty", BigDecimal.ZERO);
				ibService.saveIbDe(oderDtMapList.get(i));
			}
		}

		oderDtMapList.get(0).put("oderde", DateUtil.getNowDate());
		oderDao.updateOderHdStat(oderDtMapList.get(0));

		// 이고출고 시 입고전표(재고) 생성
		if("O41".equals(oderDtMapList.get(0).get("odertp"))){
			rcptService.insertInspComptO41(oderDtMapList.get(0));
		}
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}

//
//	/*************************************************************************************************
//	 * 출고정보 입력
//	 *
//	 * @param map
//	 */
//	public void saveOder(List<Map<String, Object>> oderHdSave, List<Map<String, Object>> oderDtSave) {
//		
//		String oderNo = "";
//		
//		// 출고정보(전표) 저장
//		if(ObjectUtil.isNotNull(oderHdSave)){
//			for(int i=0; i<oderHdSave.size(); i++){
//				
//				Map<String, Object> oderHdMap = oderHdSave.get(i);
//	            
//				if("i".equals(oderHdMap.get("rowState"))) {
//					Map<String, Object> idMap = new HashMap<String, Object>();
//	            	
//	            	idMap.put("biz", 	oderHdMap.get("biz"));
//	        		idMap.put("dc", 	oderHdMap.get("dc"));
//	        		idMap.put("client", oderHdMap.get("client"));
//	        		idMap.put("cntde",  oderHdMap.get("dealde"));
//	            	idMap.put("cnttp1", "OD_ODERHD");
//					idMap.put("cnttp2", "ODERNO");
//					idMap.put("cnttp3", "*");
//					oderNo = etcService.saveCnt(idMap);	//채번
//					
//					oderHdMap.put("oderno", oderNo);
//	        		
//	            	oderDao.insertOderHd(oderHdMap);
//	            	
//	            	
//	            } if("u".equals(oderHdMap.get("rowState"))) {
//	            	
//	            	// 거래명세서 채번 및 업데이트
//	            	/*
//	            	HData reHdata = insertOderEtcNo01(oderHdMap, "H");
//	            	
//	            	if(!StringUtil.isEmpty(reHdata.getString("ETCNO01")) || "M".equals(reHdata.getString("TRSTAT"))){
//	            		oderDao.updateOderDtEtcno01(reHdata);
//	            	}
//	            	*/
//	            	oderDao.updateOderHd(oderHdMap);
//	            	
//	            }
//	        }
//		}
//		
//
//        // 출고품목 저장
//        if(ObjectUtil.isNotNull(oderDtSave)){
//        	for(int y=0; y<oderDtSave.size(); y++){
//        		
//                Map<String, Object> oderDtMap = oderDtSave.get(y);
//                // dt 저장시 oderno null catch 개발... isNull?
//                if("i".equals(oderDtMap.get("rowState"))) {
//                	
//                	if(ObjectUtil.isNull(oderDtMap.get("oderno"))){
//                		oderDtMap.put("oderno", oderNo);
//                	}
//                	
//                	// 기본등급 = 정상
//                	oderDtMap.put("grad", "N0");
//                	
//                	// 거래명세서 채번 및 업데이트
//	            	//HData reHdata = insertOderEtcNo01(hOderDtData, "D");
//                	
//                	oderDao.insertOderDt(oderDtMap);
//                	
//                } else if("u".equals(oderDtMap.get("rowState"))) {
//                	
//                	oderDao.updateOderDt(oderDtMap);
//                } else if("d".equals(oderDtMap.get("rowState"))) {
//                	
//                	// 출고품목 행삭제시
//                	oderDao.deleteOderDt(oderDtMap);
//                }
//            }
//        }
//	}
//
//	/**
//	 * 출고정보 삭제
//	 *
//	 * @param map
//	 */
//	public void deleteOder(List<Map<String, Object>> deleteList) {
//		
//		Map<String, Object> deleteMap = deleteList.get(0);
//		
//		oderDao.deleteOderHd(deleteMap);
//		oderDao.deleteOderDt(deleteMap);
//	}
//
//	/*************************************************************************************************
//	 * 출고완료
//	 *
//	 * @param map
//	 */
//	@SuppressWarnings("unchecked")
//	public String procOderCompt(Map<String, Object> map) {
//
//		// 출고완료 대상조회
//		List<EgovMap> oderDtMapList = oderDao.selectOderDtForOderComptList(map);
//		
//		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
//		
//		for(int i=0 ; i<oderDtMapList.size() ; i++){
//
//			BigDecimal adjsQty = (BigDecimal) oderDtMapList.get(i).get("adjsqty");	// (DT)조정량
//			BigDecimal pickQty = (BigDecimal) oderDtMapList.get(i).get("pickqty");	// (DT)피킹량
//			String stat = (String) oderDtMapList.get(i).get("stat");							// (DT)상태
//			
//			// 품목이 예정상태(01)이면서 조정량이 남아있는 상태는 작업중이라고 판단
//			if("01".equals(stat) && adjsQty.compareTo(BigDecimal.ZERO) > 0) {
//				throw new BizException("MSG621"); //BizException 출고예정인 품목이 존재합니다. 출고를 원치 않을경우 조정량을 0으로 수정하세요.
//			}
//			// 품목이 할당완료(10)이나 할당중(15)인 상태는 작업중이라고 판단
//			else if("10".equals(stat) && "15".equals(stat)) {
//				throw new BizException("MSG622"); //BizException 할당작업중인 품목이 존재합니다. 출고를 원하지 않을경우 할당취소를 실행하세요.
//			}
//			// 정상출고완료처리 - 피킹완료(20), 피킹중(25), 상차완료(30)
//			else {
//				// 피킹량이 0보다 커야함
//				if(pickQty.compareTo(BigDecimal.ZERO) > 0) {
//					
//					String oderTp = oderDtMapList.get(i).get("odertp").toString();
//					if(oderTp.equals("O71") || oderTp.equals("O72") || oderTp.equals("O73")) {
//						oderDtMapList.get(i).put("frasgnstat", "20");	// 소분,세트조립&해체 출고시 피킹완료 상태만
//					}else {
//						oderDtMapList.get(i).put("frasgnstat", Const.ODER_FRASGNSTAT);	// 피킹완료 또는 상차완료
//					}
//					
//					List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(i));
//					
//					if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
//					
//					for(int j=0 ; j<oderAsgnMapList.size() ; j++){
//
//						//출고배정(OD_ODERASGN) 수정
//						BigDecimal asgnPickQty = (BigDecimal) oderAsgnMapList.get(j).get("pickqty");	// (ASGN)피킹량
//						
//						oderAsgnMapList.get(j).put("qty", asgnPickQty);
//						oderAsgnMapList.get(j).put("asgnoderqtysgn", 1);	// (ASGN)출고량증가
//						oderAsgnMapList.get(j).put("toasgnstat", "50");		// 출고완료
//						oderDao.updateOderAsgnxStg(oderAsgnMapList.get(j));
//						
//						//재고처리
//						oderAsgnMapList.get(j).put("stokstokqtysgn", -1);	// (STOK)재고량감소
//						oderAsgnMapList.get(j).put("stokpickqtysgn", -1);	// (STOK)피킹량감소
//						oderAsgnMapList.get(j).put("stokoderqtysgn", 1);	// (STOK)출고량증가
//						stokService.saveStok(oderAsgnMapList.get(j));
//					}
//				}
//			}
//
//			// 출고품목(OD_ODERDT) 수정
//			oderDtMapList.get(i).put("qty", pickQty);
//			oderDtMapList.get(i).put("oderqtysgn", 1);	// (DT)출고량증가
//			oderDtMapList.get(i).put("tostat", "50");	// 출고완료
//			oderDao.updateOderDtxStg(oderDtMapList.get(i));
//				
//			// 피킹량이 0보다 커야함
//			if(pickQty.compareTo(BigDecimal.ZERO) > 0) {
//				// 출고수불
//				oderDtMapList.get(i).put("ibde", 	DateUtil.getNowDate());
//				oderDtMapList.get(i).put("cust", 	oderDtMapList.get(i).get("socust"));
//				oderDtMapList.get(i).put("custtp", 	oderDtMapList.get(i).get("socusttp"));
//				oderDtMapList.get(i).put("dutyty", 	"ODER");
//				oderDtMapList.get(i).put("dutycd", 	oderDtMapList.get(i).get("odertp"));
//				oderDtMapList.get(i).put("reftp",   "OD_ODERHD");		
//				oderDtMapList.get(i).put("refval1", oderDtMapList.get(i).get("oderno"));	// 참조1(전표번호)
//				oderDtMapList.get(i).put("refval2", oderDtMapList.get(i).get("odersn"));	// 참조2(전표순번)
//				oderDtMapList.get(i).put("rcptqty", BigDecimal.ZERO);
//				oderDtMapList.get(i).put("oderqty", oderDtMapList.get(i).get("qty"));
//				oderDtMapList.get(i).put("adjsqty", BigDecimal.ZERO);
//				ibService.saveIbDe(oderDtMapList.get(i));
//			}
//		}
//
//		oderDtMapList.get(0).put("oderde", DateUtil.getNowDate());
//		oderDao.updateOderHdStat(oderDtMapList.get(0));
//
//		// 이고출고 시 입고전표(재고) 생성
//		if("O41".equals(oderDtMapList.get(0).get("odertp"))){
//			rcptService.insertInspComptO41(oderDtMapList.get(0));
//		}
//		
//		return "MSG001";	//정상적으로 처리되었습니다.
//	}
}