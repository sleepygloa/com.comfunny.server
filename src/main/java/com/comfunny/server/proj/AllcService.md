package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.ArrayList;
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

@Service("allcService")
public class AllcService {

	@Resource(name = "allcDao")
	private AllcDao allcDao;

	@Resource(name = "oderDao")
	private OderDao oderDao;

	@Resource(name = "stokService")
	private StokService stokService;
	
	/*************************************************************************************************
	 * 할당완료
	 * 권장재고를 산출하여 재고단위로 할당량증가
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procAllcCompt(Map<String, Object> map) {
		
		String resultMsg = "MSG001"; //정상적으로 처리되었습니다.
		
		// 할당완료 대상조회
		List<EgovMap> oderDtMapList = allcDao.selectOderDtForAllcComptList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){
			
			oderDtMapList.get(i).put("grad", Const.DEFAULT_GRAD);
			
			List<EgovMap> rcmdStokMapList = getRcmdStok(oderDtMapList.get(i), Const.RCMD_STOK_TYPE);
			
			// 권장재고가 존재할 경우만 할당가능
			if(ObjectUtil.isNotNull(rcmdStokMapList)) {
				
				BigDecimal adjsQty = (BigDecimal) oderDtMapList.get(i).get("adjsqty");		// (DT)조정량
				BigDecimal totalCanStokQty = (BigDecimal) rcmdStokMapList.get(0).get("totalcanstokqty");	// (STOK)가용재고량총량
				BigDecimal allcGoalQty = adjsQty;												// 할당목표량
				BigDecimal allcQty = BigDecimal.ZERO;
				
				// 가용재고량이 충분하거나, 충분하지 않다면 부분할당여부가 TRUE 여야 실행
				if(adjsQty.compareTo(totalCanStokQty) <= 0 || Const.PART_ALLC) {
					
					for(int j=0 ; j<rcmdStokMapList.size() && adjsQty.compareTo(BigDecimal.ZERO)>0 ; j++){

						BigDecimal canStokQty = (BigDecimal) rcmdStokMapList.get(j).get("canstokqty");		// (STOK)가용재고량
						
						// 출고배정(OD_ODERASGN) 생성
						if(canStokQty.compareTo(adjsQty) > 0){	
							rcmdStokMapList.get(j).put("qty", adjsQty);
							allcQty = allcQty.add(adjsQty);
							adjsQty = adjsQty.subtract(adjsQty);
							
						} else {
							rcmdStokMapList.get(j).put("qty", canStokQty);
							allcQty = allcQty.add(canStokQty);
							adjsQty = adjsQty.subtract(canStokQty);
						}
						
						rcmdStokMapList.get(j).put("asgnallcqtysgn", 1);	// (ASGN)할당량증가
						rcmdStokMapList.get(j).put("toasgnstat", "10");		// 할당완료
						rcmdStokMapList.get(j).put("oderno", oderDtMapList.get(i).get("oderno"));	// 출고전표정보
						rcmdStokMapList.get(j).put("odersn", oderDtMapList.get(i).get("odersn"));
						
						oderDao.insertOderAsgnxStg(rcmdStokMapList.get(j));
						
						//재고처리
						rcmdStokMapList.get(j).put("stokallcqtysgn", 1);	// (STOK)할당량증가
						stokService.saveStok(rcmdStokMapList.get(j));
					}
					
					// 입고품목정보수정
					oderDtMapList.get(i).put("qty", allcQty);
					oderDtMapList.get(i).put("allcqtysgn", 1);	// (DT)할당량증가
					
					if(allcGoalQty.compareTo(allcQty) > 0) {
						oderDtMapList.get(i).put("tostat", "15");	// 할당중
					} else {
						oderDtMapList.get(i).put("tostat", "10");	// 할당완료
					}

					oderDao.updateOderDtxStg(oderDtMapList.get(i));
					
				} else {
					resultMsg = "MSG601";	// 가용재고량이 없거나 부족합니다.
				}
				
			} else {
				resultMsg = "MSG602";	// 권장재고를 찾지못하였습니다.
			}
		}
		
		oderDao.updateOderHdStat(oderDtMapList.get(0));
		
		return resultMsg;
	}

	/*************************************************************************************************
	 * 할당(품목단위)완료
	 * 
	 * 권장재고를 산출하여 품목단위로 할당량증가
	 * 품목단위로 재고를 관리하는 곳에서 사용 가능하며 가용재고만을 관리하기 위한 곳에서 사용
	 * 
	 * @param map

	@SuppressWarnings("unchecked")
	public String procAllcComptBySku(Map<String, Object> map) {

		String resultMsg = "MSG001"; //정상적으로 처리되었습니다.
		
		// 할당완료 대상조회
		List<EgovMap> oderDtMapList = allcDao.selectOderDtForAllcComptList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){

			oderDtMapList.get(i).put("grad", Const.DEFAULT_GRAD);
			
			EgovMap rcmdStokGroupMap = allcDao.selectRcmdStokGroup(oderDtMapList.get(i));

			// 권장재고가 존재할 경우만 할당가능
			if(ObjectUtil.isNotNull(rcmdStokGroupMap)) {
				
				BigDecimal adjsQty = (BigDecimal) oderDtMapList.get(i).get("adjsqty");		// (DT)조정량
				BigDecimal canStokQty = (BigDecimal) rcmdStokGroupMap.get("canstokqty");	// (STOK)가용재고량
				BigDecimal allcQty = BigDecimal.ZERO;
				
				// 가용재고량이 충분하거나, 충분하지 않다면 부분할당여부가 TRUE 여야 실행
				if(adjsQty.compareTo(canStokQty) < 0 || Const.PART_ALLC) {

					// 출고배정(OD_ODERASGN) 생성
					if(canStokQty.compareTo(adjsQty) > 0){	
						rcmdStokGroupMap.put("qty", adjsQty);
						allcQty = allcQty.add(adjsQty);
						
					} else {
						rcmdStokGroupMap.put("qty", canStokQty);
						allcQty = allcQty.add(canStokQty);
					}
					
					rcmdStokGroupMap.put("asgnallcqtysgn", 1);	// (ASGN)할당량증가
					rcmdStokGroupMap.put("toasgnstat", "10");	// 할당완료
					rcmdStokGroupMap.put("oderno", oderDtMapList.get(i).get("oderno"));	// 출고전표정보
					rcmdStokGroupMap.put("odersn", oderDtMapList.get(i).get("odersn"));
					oderDao.insertOderAsgnxStg(rcmdStokGroupMap);
					
					//재고처리
					rcmdStokGroupMap.put("stokallcqtysgn", 1);	// (STOK)할당량증가
					stokService.saveStok(rcmdStokGroupMap);
					
					// 입고품목정보수정
					oderDtMapList.get(i).put("qty", allcQty);
					oderDtMapList.get(i).put("allcqtysgn", 1);	// (DT)할당량증가

					if(adjsQty.compareTo(allcQty) > 0) {
						oderDtMapList.get(i).put("tostat", "15");	// 할당중
					} else {
						oderDtMapList.get(i).put("tostat", "10");	// 할당완료
					}
					
					oderDao.updateOderDtxStg(oderDtMapList.get(i));
					
				} else {
					resultMsg = "MSG601";	// 가용재고량이 없거나 부족합니다.
				}
				
			}else {
				resultMsg = "MSG602";	// 권장재고를 찾지못하였습니다.
			}
		}
		
		oderDao.updateOderHdStat(oderDtMapList.get(0));
		
		return resultMsg;
	}
	 */
	
	/*************************************************************************************************
	 * 할당취소
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procAllcCncl(Map<String, Object> map) {

		// 할당취소 대상조회
		List<EgovMap> oderDtMapList = allcDao.selectOderDtForAllcCnclList(map);
		
		if(!ObjectUtil.isNotNull(oderDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<oderDtMapList.size() ; i++){
			
			BigDecimal allcQty = (BigDecimal) oderDtMapList.get(i).get("allcqty");	// (DT)할당량
			String stat = (String) oderDtMapList.get(i).get("stat");	// (DT)전표상태
			
			oderDtMapList.get(i).put("frasgnstat", "10");	// 할당완료
			List<EgovMap> oderAsgnMapList = oderDao.selectOderAsgnForProcList(oderDtMapList.get(i));

			if(!ObjectUtil.isNotNull(oderAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
			
			for(int j=0 ; j<oderAsgnMapList.size() ; j++){

				BigDecimal asgnAllcQty = (BigDecimal) oderAsgnMapList.get(j).get("allcqty");	// (DT)할당량
				
				//출고배정(OD_ODERASGN) 수정
				oderAsgnMapList.get(j).put("qty", asgnAllcQty);
				oderAsgnMapList.get(j).put("toasgnstat", "99");		// 출고예정
				oderDao.updateOderAsgnxStg(oderAsgnMapList.get(j));
				
				//재고처리
				oderAsgnMapList.get(j).put("stokallcqtysgn", -1);	// (STOK)할당량감소
				stokService.saveStok(oderAsgnMapList.get(j));
			}
			
			// 출고품목(OD_ODERDT) 수정
			oderDtMapList.get(i).put("qty", allcQty);
			oderDtMapList.get(i).put("allcqtysgn", -1);	// (DT)할당량감소
			
			if("25".equals(stat)) {							// 피킹중
				oderDtMapList.get(i).put("tostat", "20");	// 피킹완료
			} else {
				oderDtMapList.get(i).put("tostat", "01");	// 출고예정
			}

			oderDao.updateOderDtxStg(oderDtMapList.get(i));
		}

		oderDao.updateOderHdStat(oderDtMapList.get(0));
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	/************************************************************************************
	 * 출고권장재고산출
	 * 
	 * @param map
	 */
	public List<EgovMap> getRcmdStok(Map<String, Object> map, String rcmdStokTy) {

		List<EgovMap> rcmdStokMapList = new ArrayList<EgovMap>();
		
		if("STOK".equals(rcmdStokTy)) {
			rcmdStokMapList = allcDao.selectRcmdStokList(map);
			
		}

		return rcmdStokMapList;
	}
}