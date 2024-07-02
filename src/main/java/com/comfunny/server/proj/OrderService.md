package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.com.sy.service.EtcService;
import nlms.framework.Const;
import nlms.framework.exception.BizException;
import nlms.framework.util.DateUtil;
import nlms.framework.util.ObjectUtil;
import nlms.wms.rc.service.RcptDao;
import nlms.wms.rc.service.RcptService;
import nlms.wms.st.service.IbService;
import nlms.wms.st.service.StokService;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("oderService")
public class OderService {

	@Resource(name = "oderDao")
	private OderDao oderDao;
	
	@Resource(name = "rcptDao")
	private RcptDao rcptDao;

	@Resource(name = "stokService")
	private StokService stokService;

	@Resource(name = "ibService")
	private IbService ibService;
	
	@Resource(name = "etcService")
	private EtcService etcService;

	@Resource(name = "rcptService")
	private RcptService rcptService;
	
	@Resource(name = "oderService")
	private OderService oderService;
	
	

	/*************************************************************************************************
	 * 깨끗한나라 - 출고완료 - 원지
	 * 
	 * @param map
	 * 1.입고배정 필수정보만 입력 받음.
	 *   biz, dc, client, ibno, ibsn, asgnno, rcptde
	 * 
	 * 2.모든 량은 입고량만 사용, 모든 수량 컬럼에 입고량을 넣음.
	 */
	@SuppressWarnings("unchecked")
	public String procOderCompt(Map<String, Object> map) {

		//DT조회
		List<EgovMap> rcptDtMapList = rcptDao.selectRcptDtForOderCompList(map);
		if(!ObjectUtil.isNotNull(rcptDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		Map<String, Object> rctpDtMap = rcptDtMapList.get(0);
		
		//ASGN조회
		List<EgovMap> rcptAsgnMapList = rcptDao.selectRcptAsgnForOderCompList(map);
		if(!ObjectUtil.isNotNull(rcptAsgnMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		Map<String, Object> rctpAsgnMap = rcptAsgnMapList.get(0);
		
		//HD 생성유무 조회
		List<EgovMap> oderHdMapList = oderDao.selectOderHdForOderCompList(map);
		
		String oderNo = "";
		//size = 0:출고전표 생성, 1:미생성
		if(oderHdMapList.size() == 0) {
			Map<String, Object> idMap = new HashMap<String, Object>();
			
        	idMap.put("biz", 	map.get("biz"));
    		idMap.put("dc", 	map.get("dc"));
    		idMap.put("client", map.get("client"));
    		idMap.put("cntde",  map.get("rcptde"));
	    	idMap.put("cnttp1", "OD_ODERHD");
			idMap.put("cnttp2", "ODERNO");
			idMap.put("cnttp3", "*");
			oderNo = etcService.saveCnt(idMap);	//채번
			
			rctpDtMap.put("oderno", oderNo);
			rctpAsgnMap.put("oderno", oderNo);
			
			Map<String, Object> oderHdMap = new HashMap<String, Object>(); 
			oderHdMap.putAll(map);
			oderHdMap.put("oderno", oderNo);
			oderHdMap.put("stat", "50");
			oderHdMap.put("odertp", "O21");
			oderHdMap.put("custtp", 	"Delivery");
			oderHdMap.put("lotatrb08", rctpDtMap.get("lotatrb08"));
			oderHdMap.put("updusr", rctpDtMap.get("updusr"));
			oderHdMap.put("socust", map.get("socust"));
			oderHdMap.put("dvcust", map.get("dvcust"));
			
	    	oderDao.insertOderHdForOderComp(oderHdMap);
		}else {
			oderNo = (String)oderHdMapList.get(0).get("oderno");
			rctpDtMap.put("oderno", oderNo);
			rctpAsgnMap.put("oderno", oderNo);
		}
		
		
		//DT
		rctpDtMap.put("stat", "50");
		oderDao.insertOderDtForOderComp(rctpDtMap);
		
		//ASGN
		rctpAsgnMap.put("stat", "50");
    	oderDao.insertOderAsgnForOderComp(rctpAsgnMap);
		
    	//IBYN
		Map<String, Object> ibynMap = new HashMap<String, Object>(); 
		ibynMap.putAll(map);
		
		ibynMap.put("ibde", 		DateUtil.getNowDate());
		ibynMap.put("cust", 		rctpDtMap.get("lotatrb08"));
		ibynMap.put("custtp", 		"Delivery");
		ibynMap.put("dutyty", 		"ODER");
		ibynMap.put("dutycd",   	"O21");
		ibynMap.put("reftp",    	"OD_ODERHD");		
		ibynMap.put("refval1",  	rctpDtMap.get("oderno"));	// 참조1(전표번호)
		ibynMap.put("refval2",  	rctpDtMap.get("rcptsn"));	// 참조2(전표순번)
		ibynMap.put("rcptqty",  	BigDecimal.ZERO);
		ibynMap.put("oderqty",  	rctpDtMap.get("rcptqty"));
		ibynMap.put("oderwt",   	rctpDtMap.get("wt"));
		
		ibynMap.put("extcol02",   	0);
		ibynMap.put("extcol03",   	1);
		ibynMap.put("extcol04",   	0);
		
		ibynMap.put("rgsusr",   	rctpDtMap.get("rgsusr"));
		
		//Null 에러가 자꾸나서 추가함.
		ibynMap.put("bsestokqty",  	BigDecimal.ZERO);
		ibynMap.put("bsestokwt",  	BigDecimal.ZERO);
		ibynMap.put("rcptqty",  	BigDecimal.ZERO);
		ibynMap.put("rcptwt",  		BigDecimal.ZERO);
		ibynMap.put("adjsqty",  	BigDecimal.ZERO);
		ibynMap.put("adjswt",  		BigDecimal.ZERO);
		ibynMap.put("endstokwt",  	BigDecimal.ZERO);
		
		ibService.saveIbDe(ibynMap);
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}


//
//
//
//
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