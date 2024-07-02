package com.comfunny.server.proj.ib.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import nlms.com.sd.service.LocDao;
import nlms.com.sy.service.EtcService;
import nlms.framework.Const;
import nlms.framework.exception.BizException;
import nlms.framework.util.DateUtil;
import nlms.framework.util.ObjectUtil;
import nlms.wms.od.service.OderService;
import nlms.wms.st.service.IbService;
import nlms.wms.st.service.MvDao;
import nlms.wms.st.service.MvService;
import nlms.wms.st.service.StokDao;
import nlms.wms.st.service.StokService;

/* ----------------------------------------------------------------------------
* Copyright ⓒ 2019 Nongshim Logistics Management System, All Rights Reserved.
* ---------------------------------------------------------------------------- */

@Service("rcptService")
public class RcptService {

	@Resource(name = "rcptDao")
	private RcptDao rcptDao;

	@Resource(name = "stokService")
	private StokService stokService;
	
	@Resource(name = "etcService")
	private EtcService etcService;

	@Resource(name = "ibService")
	private IbService ibService;
	
	@Resource(name = "oderService")
	private OderService oderService;
	
	@Resource(name = "locDao")
	private LocDao locDao;
	
	@Resource(name = "stokDao")
	private StokDao stokDao;
	
	@Resource(name = "mvService")
	private MvService mvService;
	
	@Resource(name = "putwService")
	private PutwService putwService;
	
	@Resource(name = "mvDao")
	private MvDao mvDao;
	
	/*************************************************************************************************
	 * 입고정보 입력
	 * 
	 * @param map
	 */
	public void saveRcpt(List<Map<String, Object>> rcptHdSave, List<Map<String, Object>> rcptDtSave) {
		
		String rcptNo = "";
		
		// 입고정보(전표) 저장
		if(ObjectUtil.isNotNull(rcptHdSave)){
			for(int i=0; i<rcptHdSave.size(); i++){
				
				Map<String, Object> rcptHdMap = rcptHdSave.get(i);
	            
				if("i".equals(rcptHdMap.get("rowState"))) {
					Map<String, Object> idMap = new HashMap<String, Object>();
	            	
	            	idMap.put("biz", 	rcptHdMap.get("biz"));
	        		idMap.put("dc", 	rcptHdMap.get("dc"));
	        		idMap.put("client", rcptHdMap.get("client"));
	        		idMap.put("cntde",  rcptHdMap.get("dealde"));
	            	idMap.put("cnttp1", "RC_RCPTHD");
					idMap.put("cnttp2", "RCPTNO");
					idMap.put("cnttp3", "*");
					rcptNo = etcService.saveCnt(idMap);	//채번
					
					rcptHdMap.put("rcptno", rcptNo);
	        		
	            	rcptDao.insertRcptHd(rcptHdMap);
	            	
	            	
	            } if("u".equals(rcptHdMap.get("rowState"))) {

	            	rcptDao.updateRcptHd(rcptHdMap);
	            }
	        }
		}
		
        // 입고품목 저장
        if(ObjectUtil.isNotNull(rcptDtSave)){
        	for(int y=0; y<rcptDtSave.size(); y++){
        		
                Map<String, Object> rcptDtMap = rcptDtSave.get(y);
                // dt 저장시 rcptno null catch 개발... isNull?
                if("i".equals(rcptDtMap.get("rowState"))) {
                	
                	if(ObjectUtil.isNull(rcptDtMap.get("rcptno"))){
                		rcptDtMap.put("rcptno", rcptNo);
                	} 
                	
                	// 기본등급 = 정상
                	// rcptDtMap.put("grad", "N0");
                	
                	rcptDao.insertRcptDt(rcptDtMap);
                	
                } else if("u".equals(rcptDtMap.get("rowState"))) {
                	
                	rcptDao.updateRcptDt(rcptDtMap);
                } else if("d".equals(rcptDtMap.get("rowState"))) {
                	
                	// 입고품목 행삭제시
                	rcptDao.deleteRcptDt(rcptDtMap);
                }
            }
        }
	}
	
	/**
	 * 입고정보 삭제 
	 * 
	 * @param map
	 */
	public void deleteRcpt(List<Map<String, Object>> deleteList) {
		
		Map<String, Object> deleteMap = deleteList.get(0);
		
		rcptDao.deleteRcptHd(deleteMap);
		rcptDao.deleteRcptDt(deleteMap);
	}

	/**
	 * (이고출고) 입고전표생성(검수완료)
	 * 
	 * @param map
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public void insertInspComptO41(Map<String, Object> map) {

		// 입고번호 생성
		Map<String, Object> idMap = new HashMap<String, Object>();
    	idMap.put("biz", 	map.get("biz"));
		idMap.put("dc", 	map.get("dc"));
		idMap.put("client", map.get("client"));
		idMap.put("cntde",  map.get("oderde"));
    	idMap.put("cnttp1", "RC_RCPTHD");
		idMap.put("cnttp2", "RCPTNO");
		idMap.put("cnttp3", "*");
		
		// 입고전표 생성
		map.put("rcptdc", map.get("socust"));	// 출고전표의 매출처는 입고전표의 DC
		map.put("rcptno", etcService.saveCnt(idMap));
		map.put("rcptde", map.get("oderde"));
		map.put("rcpttp", "R41");	// 이고입고
		map.put("pocust", map.get("dc"));
		map.put("pocusttp", "DC");
		map.put("spcust", map.get("dc"));
		map.put("spcusttp", "DC");
		map.put("trstat", "0");		// 대상(전송준비)
		map.put("stat", "10");		// 검수완료

        rcptDao.insertRcptHdxOder(map);
        
        rcptDao.insertRcptDtxOder(map);
        
        map.put("loc", Const.DEFAULT_INSPLOC);
        rcptDao.insertRcptAsgnxOder(map);
        
        map.put("dc", map.get("rcptdc"));
        map.put("frasgnstat", map.get("stat"));
        List<EgovMap> rcptAsgnMapList = rcptDao.selectRcptAsgnForProcList(map);
        
        for(int i=0 ; i < rcptAsgnMapList.size() ; i++){

			// 재고입고완료
        	rcptAsgnMapList.get(i).put("qty", rcptAsgnMapList.get(i).get("inspqty"));
        	rcptAsgnMapList.get(i).put("stokinspqtysgn", 1);	// (STOK)검수량증가
        	stokService.saveStok(rcptAsgnMapList.get(i));
        }
	}

	/**
	 * (이고출고) 입고전표생성(입고완료)
	 * 
	 * @param map
	 * @exception Exception
	 */
	@SuppressWarnings("unchecked")
	public void insertRcptComptO41(Map<String, Object> map) {

		// 입고번호 생성
		Map<String, Object> idMap = new HashMap<String, Object>();
    	idMap.put("biz", 	map.get("biz"));
		idMap.put("dc", 	map.get("dc"));
		idMap.put("client", map.get("client"));
		idMap.put("cntde",  map.get("oderde"));
    	idMap.put("cnttp1", "RC_RCPTHD");
		idMap.put("cnttp2", "RCPTNO");
		idMap.put("cnttp3", "*");
		
		// 입고전표 생성
		map.put("rcptdc", map.get("socust"));	// 출고전표의 매출처는 입고전표의 DC
		map.put("rcptno", etcService.saveCnt(idMap));
		map.put("rcptde", map.get("oderde"));
		map.put("rcpttp", "R41");	// 이고입고
		map.put("pocust", map.get("dc"));
		map.put("pocusttp", "DC");
		map.put("spcust", map.get("dc"));
		map.put("spcusttp", "DC");
		map.put("trstat", "0");		// 대상(전송준비)
		map.put("stat", "50");		// 입고완료

        rcptDao.insertRcptHdxOder(map);
        
        rcptDao.insertRcptDtxOder(map);
        
        map.put("loc", Const.DEFAULT_INSPLOC);
        rcptDao.insertRcptAsgnxOder(map);
        
        map.put("dc", map.get("rcptdc"));
        map.put("frasgnstat", map.get("stat"));
        List<EgovMap> rcptAsgnMapList = rcptDao.selectRcptAsgnForProcList(map);
        
        for(int i=0 ; i < rcptAsgnMapList.size() ; i++){

			// 재고입고완료
        	rcptAsgnMapList.get(i).put("qty", rcptAsgnMapList.get(i).get("inspqty"));
        	rcptAsgnMapList.get(i).put("stokstokqtysgn", 1);	// (STOK)재고량증가
        	stokService.saveStok(rcptAsgnMapList.get(i));

			// 입고수불
        	rcptAsgnMapList.get(i).put("ibde", 		DateUtil.getNowDate());
        	rcptAsgnMapList.get(i).put("cust", 		map.get("pocust"));
        	rcptAsgnMapList.get(i).put("custtp", 	map.get("pocusttp"));
			rcptAsgnMapList.get(i).put("dutyty", 	"RCPT");
			rcptAsgnMapList.get(i).put("dutycd", 	map.get("rcpttp"));
			rcptAsgnMapList.get(i).put("reftp", 	"RC_RCPTHD");		
			rcptAsgnMapList.get(i).put("refval1", 	map.get("rcptno"));	// 참조1(전표번호)
			rcptAsgnMapList.get(i).put("refval2", 	rcptAsgnMapList.get(i).get("rcptsn"));	// 참조2(전표순번)
			rcptAsgnMapList.get(i).put("rcptqty", rcptAsgnMapList.get(i).get("qty"));
			rcptAsgnMapList.get(i).put("oderqty", BigDecimal.ZERO);
			rcptAsgnMapList.get(i).put("adjsqty", BigDecimal.ZERO);
			ibService.saveIbDe(rcptAsgnMapList.get(i));
        }
	}
	
	/*************************************************************************************************
	 * 입고완료
	 * 
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public String procRcptCompt(Map<String, Object> map) {

		// 입고완료 대상조회
		List<EgovMap> rcptDtMapList = rcptDao.selectRcptDtForRcptComptList(map);
		
		if(!ObjectUtil.isNotNull(rcptDtMapList)) throw new BizException("MSG006"); // 처리할  내역이 존재하지 않습니다.
		
		for(int i=0 ; i<rcptDtMapList.size() ; i++){
			
			BigDecimal inspQty = (BigDecimal) rcptDtMapList.get(i).get("inspqty");	// (DT)검수량
			
			// 검수량이 0보다 커야함
			if(inspQty.compareTo(BigDecimal.ZERO) > 0) {
				rcptDtMapList.get(i).put("frasgnstat", "10");
				List<EgovMap> rcptAsgnMapList = rcptDao.selectRcptAsgnForProcList(rcptDtMapList.get(i));
	
				if(!ObjectUtil.isNotNull(rcptAsgnMapList)) throw new BizException("MSG605"); //BizException 배정정보가 존재하지 않습니다
				
				for(int j=0 ; j<rcptAsgnMapList.size() ; j++){
	
					//입고배정(RC_RCPTASGN) 수정
					BigDecimal asgnInspQty = (BigDecimal) rcptAsgnMapList.get(j).get("inspqty");	// (ASGN)검수량
					
					rcptAsgnMapList.get(j).put("qty", asgnInspQty);
					rcptAsgnMapList.get(j).put("asgnrcptqtysgn", 1);	// (ASGN)입고량증가
					rcptAsgnMapList.get(j).put("toasgnstat", "50");		// 입고완료
					rcptDao.updateRcptAsgnxStg(rcptAsgnMapList.get(j));
					
					//재고처리
					rcptAsgnMapList.get(j).put("stokstokqtysgn", 1);	// (STOK)재고량증가
					rcptAsgnMapList.get(j).put("stokinspqtysgn", -1);	// (STOK)검수량감소
					stokService.saveStok(rcptAsgnMapList.get(j));
				}
			}
			
			// 입고품목(RC_RCPTDT) 수정
			rcptDtMapList.get(i).put("qty", inspQty);
			rcptDtMapList.get(i).put("rcptqtysgn", 1);	// (DT)입고량증가
			rcptDtMapList.get(i).put("tostat", "50");	// 입고완료
			rcptDao.updateRcptDtxStg(rcptDtMapList.get(i));

			// 검수량이 0보다 커야함
			if(inspQty.compareTo(BigDecimal.ZERO) > 0) {
				// 입고수불
				rcptDtMapList.get(i).put("ibde", 	DateUtil.getNowDate());
				rcptDtMapList.get(i).put("cust", 	rcptDtMapList.get(i).get("pocust"));
				rcptDtMapList.get(i).put("custtp", 	rcptDtMapList.get(i).get("pocusttp"));
				rcptDtMapList.get(i).put("dutyty", 	"RCPT");
				rcptDtMapList.get(i).put("dutycd", 	rcptDtMapList.get(i).get("rcpttp"));
				rcptDtMapList.get(i).put("reftp",   "RC_RCPTHD");		
				rcptDtMapList.get(i).put("refval1", rcptDtMapList.get(i).get("rcptno"));	// 참조1(전표번호)
				rcptDtMapList.get(i).put("refval2", rcptDtMapList.get(i).get("rcptsn"));	// 참조2(전표순번)
				rcptDtMapList.get(i).put("rcptqty", rcptDtMapList.get(i).get("qty"));
				rcptDtMapList.get(i).put("oderqty", BigDecimal.ZERO);
				rcptDtMapList.get(i).put("adjsqty", BigDecimal.ZERO);
				ibService.saveIbDe(rcptDtMapList.get(i));
			}
		}
		
		rcptDtMapList.get(0).put("rcptde", DateUtil.getNowDate());
		rcptDao.updateRcptHdStat(rcptDtMapList.get(0));
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}

	/*************************************************************************************************
	 * 깨끗한나라 -  입고취소
	 * @param map
	 * @desc
	 * 밀롤창고 입고오류로 인한 3구간으로 출고처리
 		- 이동결과.To = 3구간(M03)
 		- 재고처리 : 이동결과.From Loc = 할당량(-), 재고량(-), 이동결과.To Loc = 재고량(+), 이동지시.To Loc = 예정량(-)
		입고정보 갱신 : 'S12_입고적치.S12-11_적치지시 취소' 참조
	 */
	@SuppressWarnings("unchecked")
	public String procRcptCncl(Map<String, Object> map) {
		
		//frloc : 현재위치, toloc : 취소후 위치, rcmdloc : 실패전, 원래 가려던 위치
		map.put("toloc", "M03");
		 
		//1-1. 이동지시, 재고
		mvService.excMvOder(map); //S15-12 : 이동출고(수량)
		
		//1-2. 이동지시CRUD(수정)
		map.put("stat", "99");
		mvDao.updateMvOrdrStat(map); //S15-12 : 재고이동 지시취소(전표)
		
		//1-2. 호출 서비스
		putwService.updateRcptAsgnForPutwOrdrCncl(map); //S12-11 : 적치지시 취소
		
		return "MSG001";	//정상적으로 처리되었습니다.
	}
	
	

	/**
	 * 입고정보 삭제 
	 * 
	 * @param map
	 */
	public void updateMillRollLabelPrint(Map<String, Object> updateMap) {
		rcptDao.updateMillRollLabelPrint(updateMap);
	}
	
	
	/*************************************************************************************************
	 * 깨끗한나라 - 권장위치 조회(밀롤)
	 * 
	 * @param map
			{
			    "biz": "knr",
			    "dc": "11",
			    "client": "knr",
			    "rcptde": "20200316",
			    "lotatrb01": "S11", 
			    "lotatrb02": "400",
			    "extcol06" : 2500,
			    "extcol09" : 1000,
			    "strgyn": "Y",
			    "rpshyn": "N"
			}
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectRecommendLocMillrollList(Map<String, Object> map) {
		return rcptDao.selectRecommendLocMillrollList(map);
	}
	/*************************************************************************************************
	 * 깨끗한나라 - 권장위치 조회(커터)
	 * 
	 * @param map
			{
			    "biz": "knr",
			    "dc": "11",
			    "client": "knr",
			    "rcptde": "20200316",
			    "zone" : "B1",
			    "extcol09" : 1000
			}
	 * 
	 */
	@SuppressWarnings("unchecked")
	public List<EgovMap> selectRecommendLocCutterList(Map<String, Object> map) {
		return rcptDao.selectRecommendLocCutterList(map);
	}
}